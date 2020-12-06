import React from 'react';
import * as S from './ProfileScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import * as Font from 'expo-font';
import { AirbnbRating } from 'react-native-elements';
import { Icon } from 'native-base';
import * as firebase from 'firebase';
import Modal from 'react-native-modal';
import * as Users from '../../mocky/mockData';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text'

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: '',
      userData: {},
      newData: {},
      errorPhone: false,
      errorName: false,
      fontLoaded: false,
      isModalVisible: false,
    };
  }

  getUserID = () => {
    const uid = firebase.auth().currentUser.uid
    this.setState({ userID: uid });
  }

  getUserData = async () => {
    await this.getUserID();
    await firebase.database().ref(`users/${this.state.userID}`).once('value',
      (snapshot) => {
        this.setState({ userData: snapshot.val() });
        this.setState({ newData: snapshot.val() });
      });
    this.setState({ fontLoaded: true });
  }

  handleUpdate = async () => {
    const { newData, userID } = this.state;
    this.setState({
      errorName: false,
      errorPhone: false,
    })
    if (newData.name.length > 0 && this.phoneInput.getRawValue().length === 11) {
      await firebase.database().ref(`users/${userID}`)
        .update({ name: newData.name, phone: this.phoneInput.getRawValue(), description: newData.description, picture: newData.picture }, (err) => {
          if (err) Alert.alert('Perfil', 'Erro ao atualizar seu perfil!')
          if (!err) Alert.alert('Perfil', 'Perfil atualizado com sucesso!')
        });
    } else if (newData.name.length <= 0) this.setState({ errorName: true });
    else if (this.phoneInput.getRawValue().length < 11) this.setState({ errorPhone: true });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    await this.getUserData();
  }

  async requestCameraPermissions() {
    if (Platform.OS !== 'web') {
      const rollStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (rollStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
        alert('Desculpe, precisamos de permissões de câmera para atualizar a sua foto!');
      }
    }
  }

  profilePicModal = () => (
    <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}>
      <S.ModalView>
        <S.InputTitleText>Escolher sua foto de perfil</S.InputTitleText>
        < S.RegisterTouchableOpacity
          style={{ marginTop: '3%' }}
          onPress={async () => {
            await this.pickImageFromCamera();
            this.setState({ isModalVisible: false });
          }}
        >
          <S.RegisterText>Tirar uma foto</S.RegisterText>
        </S.RegisterTouchableOpacity>
        < S.RegisterTouchableOpacity
          style={{ marginTop: '3%' }}
          onPress={async () => {
            await this.pickImageFromGallery();
            this.setState({ isModalVisible: false });
          }}
        >
          <S.RegisterText>Escolher da galeria</S.RegisterText>
        </S.RegisterTouchableOpacity>
      </S.ModalView>
    </Modal>
  );

  async pickImageFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ profilePic: result.base64 });
      const aux = this.state.newData;
      aux.picture = result.base64;
      this.setState({ newData: aux }, async () => {
        await this.handleUpdate();
      });
    }
  };

  async pickImageFromCamera() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ profilePic: result.base64 });
      const aux = this.state.newData;
      aux.picture = result.base64;
      this.setState({ newData: aux }, async () => {
        await this.handleUpdate();
      });
    }
  };

  render() {
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {(this.state.fontLoaded && this.state.userData) ?
          (<KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding" keyboardVerticalOffset={0}
            enabled={Platform.OS === 'ios' ? true : false}>
            <S.FullScrollView>

              <S.Header
                backButton={false}
                icon={true}
                onPress={() => this.props.navigation.goBack()}
              />

              {/* <S.ProfilePicView onPress={async () => await this.pickImage()}> */}
              <S.ProfilePicView onPress={() => this.setState({ isModalVisible: true }, async () => await this.requestCameraPermissions())}>
                <Icon type='FontAwesome' name='camera'
                  style={{ fontSize: 18, position: 'absolute', zIndex: 501, bottom: 0, right: 0 }}
                />
                <S.ProfilePicImage
                  source={this.state.userData.picture || this.state.newData.picture
                    ? { uri: `data:image/jpg;base64,${this.state.newData.picture}` }
                    : require('../../assets/png/profile_picture_placeholder.png')
                  }
                  resizeMode='cover'
                />
              </S.ProfilePicView>

              <S.Divisor />

              <S.RegisterTextInputView>

                {this.state.userData.userType === 0
                  ? (<S.InputTitleText>Nome da ONG</S.InputTitleText>)
                  : (<S.InputTitleText>Nome</S.InputTitleText>)
                }
                <S.RegisterTextInput
                  ref={(ref) => { this.nameInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={this.state.errorName
                    ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                  }
                  autoCapitalize='words'
                  keyboardType='default'
                  maxLength={30}
                  placeholder={this.state.userData.userType === 0 ? 'Entre com o nome da sua ONG' : 'Entre com seu nome'}
                  placeholderTextColor={'#919191'}
                  value={this.state.newData.name}
                  onChangeText={(input) => {
                    const aux = this.state.newData;
                    aux.name = input;
                    this.setState({ newData: aux });
                  }}
                />
                {this.state.errorName
                  ? (<S.ErrorText>Insira um nome válido</S.ErrorText>)
                  : null
                }
                {this.state.userData.userType === 0
                  ? (<>
                    <S.InputTitleText onLayout={(event) => this.setState({ docPos: event.nativeEvent.layout.y })}>CPNJ (Sem pontuação)</S.InputTitleText>
                    <TextInputMask
                      editable={false}
                      style={{ marginBottom: '7%', color: 'rgb(130, 130, 130)', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                      ref={(ref) => { this.docInput = ref; }}
                      type={'cnpj'}
                      placeholder='Entre com seu CPF'
                      placeholderTextColor={'#919191'}
                      value={this.state.userData.doc}
                      onChangeText={(input) => { this.setState({ doc: input }) }}
                      onSubmitEditing={() => this.emailInput.focus()}
                    />
                  </>)
                  : (<>
                    <S.InputTitleText onLayout={(event) => this.setState({ docPos: event.nativeEvent.layout.y })}>CPF (Sem pontuação)</S.InputTitleText>
                    <TextInputMask
                      editable={false}
                      style={{ marginBottom: '7%', color: 'rgb(130, 130, 130)', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                      ref={(ref) => { this.docInput = ref; }}
                      type={'cpf'}
                      placeholder='Entre com seu CPF'
                      placeholderTextColor={'#919191'}
                      value={this.state.userData.doc}
                      onChangeText={(input) => { this.setState({ doc: input }) }}
                      onSubmitEditing={() => this.emailInput.focus()}
                    />
                  </>)}

                <S.InputTitleText>E-mail</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.emailInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, opacity: 1 }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  keyboardType='email-address'
                  maxLength={30}
                  placeholder={this.state.userData.userType === 1 ? 'Entre com o e-mail da sua ONG' : 'Entre com seu e-mail'}
                  placeholderTextColor={'#919191'}
                  value={this.state.userData.email}
                  onChangeText={(input) => { this.setState({ email: input }) }}
                  disabled={true}
                />

                <S.InputTitleText>Contato</S.InputTitleText>
                <TextInputMask
                  style={this.state.errorPhone
                    ? { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  ref={(ref) => { this.phoneInput = ref; }}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  placeholder={this.state.userData.userType === 1 ? 'Entre com o contato da sua ONG' : 'Entre com seu contato'}
                  placeholderTextColor={'#919191'}
                  value={this.state.newData.phone}
                  onChangeText={(input) => {
                    const aux = this.state.newData;
                    aux.phone = input;
                    this.setState({ newData: aux });
                  }}
                  onSubmitEditing={() => this.descriptionInput.focus()}
                />
                {this.state.errorPhone
                  ? (<S.ErrorText>Insira um número válido</S.ErrorText>)
                  : null
                }
                <S.InputTitleText>Descrição</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.descriptionInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, flex: 1 }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', paddingTop: '0%', paddingBottom: '5%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  keyboardType='default'
                  maxLength={500}
                  autoCorrect={true}
                  spellCheck={true}
                  autoCapitalize='sentences'
                  multiline
                  placeholder='Entre com sua descrição'
                  placeholderTextColor={'#919191'}
                  value={this.state.newData.description}
                  onChangeText={(input) => {
                    const aux = this.state.newData;
                    aux.description = input;
                    this.setState({ newData: aux });
                  }}
                />

                {this.state.userData.userType === 1 && (
                  <>
                    <S.InputTitleText>Sua pontuação</S.InputTitleText>

                    <S.RatingView>
                      <AirbnbRating
                        count={10}
                        defaultRating={this.state.userData.rating}
                        size={16}
                        starStyle={{ backgroundColor: 'transparent', marginRight: '1%' }}
                        showRating={false}
                        isDisabled={true}
                      />
                    </S.RatingView>
                  </>)}

              </S.RegisterTextInputView>

              {this.state.userData.userType === 1 && (
                <S.RegisterTouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.navigate('PreferencesProfile')}
                >
                  <S.RegisterText>Atualizar Preferências</S.RegisterText>
                </S.RegisterTouchableOpacity>
              )}

              < S.RegisterTouchableOpacity
                style={{ marginBottom: '10%' }}
                onPress={() => this.handleUpdate()}
              >
                <S.RegisterText>Atualizar Perfil</S.RegisterText>
              </S.RegisterTouchableOpacity>
              {this.profilePicModal()}
            </S.FullScrollView >
          </KeyboardAvoidingView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
        }
      </>
    );
  }
}

export default ProfileScreen;
