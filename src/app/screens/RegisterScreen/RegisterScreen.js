import React from 'react';
import * as S from './RegisterScreen.style';
import { CheckBox } from 'react-native-elements'
import { Icon } from 'native-base';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Platform, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import * as Font from 'expo-font'
import * as Validation from '../../utils/Validations/validations';
import { getRandom } from '../../utils/mathFunctions';
import * as Firebase from 'firebase';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text'

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: [false, true],
      name: '',
      doc: '',
      phone: '',
      email: '',
      description: '',
      password: '',
      passwordConfirm: '',
      userTypePos: '',
      namePos: '',
      docPos: '',
      phonePos: '',
      emailPos: '',
      descriptionPos: '',
      passwordPos: '',
      passwordConfirmPos: '',
      picture: '',
      errorMessage: '',
      error: false,
      errorFields: { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false },
      loading: false,
      fontLoaded: false,
      uid: '',
      isModalVisible: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
  }

  addUser(name, doc, email, phone, description, userType, uid, picture) {
    let type = 0;
    if (picture) {
      Firebase.database().ref('users/' + uid).set({
        name: name,
        doc: doc,
        email: email,
        phone: phone,
        description: description,
        userType: type,
        picture: picture,
      });
    } else {
      Firebase.database().ref('users/' + uid).set({
        name: name,
        doc: doc,
        email: email,
        phone: phone,
        description: description,
        userType: type,
      });
    }
    Alert.alert('Cadastro', 'Cadastro com sucesso!');
    this.props.navigation.navigate('Login');
  }

  errorHandler = (result) => {
    let aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false };
    this.setState({ errorFields: aux });

    switch (result.field) {
      case 'all':
        this.nameInput.shake();
        this.emailInput.shake();
        this.descriptionInput.shake();
        this.passwordInput.shake();
        this.passwordConfirmInput.shake();
        aux = { blank: true, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        break;
      case 'userType':
        aux = { blank: false, userType: true, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: Window.winHeight * 0.1, animated: true });
        break;
      case 'name':
        aux = { blank: false, userType: false, name: true, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: this.state.namePos, animated: true });
        this.nameInput.shake();
        break;
      case 'doc':
        aux = { blank: false, userType: false, name: false, doc: true, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: this.state.docPos + Window.winHeight * 0.1, animated: true });
        break;
      case 'email':
        aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: true, description: false, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: this.state.emailPos + Window.winHeight * 0.1, animated: true });
        this.emailInput.shake();
        break;
      case 'phone':
        aux = { blank: false, userType: false, name: false, doc: false, phone: true, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: this.state.phonePos + Window.winHeight * 0.1, animated: true });
        break;
      case 'description':
        aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: true, password: false, passwordConfirm: false, passwordMatch: false }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: this.state.descriptionPos + Window.winHeight * 0.1, animated: true });
        this.descriptionInput.shake();
        break;
      case 'password':
        this.setState({ error: true });
        if (this.state.password.length < 6) {
          aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: true, passwordConfirm: false, passwordMatch: false }
          this.setState({ errorFields: aux });
          this.passwordInput.shake();
        }
        if (this.state.passwordConfirm.length < 6) {
          this.setState({ error: true });
          aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: true, passwordMatch: false }
          this.setState({ errorFields: aux });
          this.passwordConfirmInput.shake();
        }
        this.scrollView.scrollTo({ x: 1, y: this.state.passwordPos + Window.winHeight * 0.1, animated: true });
        break;
      case 'passwords':
        aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: true }
        this.setState({ errorFields: aux });
        this.scrollView.scrollTo({ x: 1, y: this.state.passwordPos + Window.winHeight * 0.1, animated: true });
        this.passwordInput.shake();
        this.passwordConfirmInput.shake();
        break;
      default:
        break;
    }
  }

  handleRegister = () => {
    const { name, doc, email, phone, description, password, passwordConfirm, userType } = this.state;
    this.setState({ error: false });
    let result = Validation.RegisterValidation(name, this.docInput.getRawValue(), email, this.phoneInput.getRawValue(), description, password, passwordConfirm, userType);
    if (result.validate !== true) {
      this.setState({ errorMessage: result.validate }, () => this.errorHandler(result));
    }
    else {
      let aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false };
      this.setState({ errorFields: aux });
      if (this.state.userType[0]) {
        this.setState({ loading: true });
        Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(infoUser => {
            return infoUser.user.updateProfile({ displayName: this.state.name }),
              this.addUser(
                this.state.name,
                this.state.doc,
                this.state.email,
                this.state.phone,
                this.state.description,
                this.state.userType[0],
                infoUser.user.uid,
                this.state.picture,
              )
          }
          )
          .catch((error) => {
            console.log('error :', error);
            this.setState({ errorMessage: error.message });
          })
          .finally(() => {
            this.setState({ loading: false });
          })
      }
      else this.props.navigation.navigate('Preferences',
        {
          name: this.state.name,
          doc: this.state.doc,
          email: this.state.email,
          phone: this.state.phone,
          description: this.state.description,
          password: this.state.password,
          picture: this.state.picture,
        })
    }
  }

  async requestCameraPermissions() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões de câmera para atualizar a sua foto!');
      }
    }
  }

  profilePicModal = () => (
    <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}>
      <S.ModalView>
        <S.PictureModalText>Escolher sua foto de perfil</S.PictureModalText>
        < S.RegisterTouchableOpacity
          style={{ marginTop: '5%', marginBottom: '6%' }}
          onPress={async () => {
            await this.pickImageFromCamera();
            this.setState({ isModalVisible: false });
          }}
        >
          <S.PictureButtonText>Tirar uma foto</S.PictureButtonText>
        </S.RegisterTouchableOpacity>
        < S.RegisterTouchableOpacity
          style={{ marginBottom: '3%' }}
          onPress={async () => {
            await this.pickImageFromGallery();
            this.setState({ isModalVisible: false });
          }}
        >
          <S.PictureButtonText>Escolher da galeria</S.PictureButtonText>
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
      this.setState({ picture: result.base64 });
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
      this.setState({ picture: result.base64 });
    }
  };

  render() {
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ?
          (<KeyboardAvoidingView
            style={{ flex: 1 }} behavior="padding"
            keyboardVerticalOffset={20}
            enabled={Platform.OS === 'ios' ? true : false}
          >
            <S.FullScrollView ref={(ref) => { this.scrollView = ref; }}>

              <S.HeaderView>
                <S.Header
                  backButton={true}
                  icon={true}
                  onPress={() => this.props.navigation.goBack()}
                />
              </S.HeaderView>

              <S.LoginTitleText>
                {`Bem vindo (a).`}
                {`\n`}
                {`Faça o seu cadastro,`}
                {`\n`}
                {`é muito rápido!`}
              </S.LoginTitleText>

              <S.CheckboxView
                onLayout={(event) => this.setState({ userTypePos: event.nativeEvent.layout.y })}
              >
                <CheckBox
                  ref={(ref) => { this.userTypeInput = ref; }}
                  containerStyle={{
                    borderWidth: 0,
                    padding: 0,
                    marginRight: '1%'
                  }}
                  onPress={() => {
                    let user = [!this.state.userType[0], false]
                    this.setState({ userType: user });
                  }}
                  checked={this.state.userType[0]}
                  checkedIcon={(
                    <Icon
                      type="MaterialCommunityIcons"
                      name="circle-slice-8"
                      style={{
                        fontSize: 20,
                        color: 'rgb(0, 104, 191)'
                      }}
                    />
                  )}
                  uncheckedIcon={(<Icon
                    type="MaterialCommunityIcons"
                    name="checkbox-blank-circle-outline"
                    style={this.state.errorFields.userType
                      ? {
                        fontSize: 20,
                        color: 'red'
                      }
                      : {
                        fontSize: 20,
                        color: 'rgb(0, 104, 191)'
                      }}
                  />)}
                />
                <S.CheckboxText checked={this.state.userType[0]}>ONG</S.CheckboxText>
                <CheckBox
                  containerStyle={{
                    borderWidth: 0,
                    padding: 0,
                    marginRight: '1%'
                  }}
                  onPress={() => {
                    let user = [false, !this.state.userType[1]]
                    this.setState({ userType: user });
                  }}
                  checked={this.state.userType[1]}
                  checkedIcon={(
                    <Icon
                      type="MaterialCommunityIcons"
                      name="circle-slice-8"
                      style={{
                        fontSize: 20,
                        color: 'rgb(0, 104, 191)'
                      }}
                    />
                  )}
                  uncheckedIcon={(<Icon
                    type="MaterialCommunityIcons"
                    name="checkbox-blank-circle-outline"
                    style={this.state.errorFields.userType
                      ? {
                        fontSize: 20,
                        color: 'red'
                      }
                      : {
                        fontSize: 20,
                        color: 'rgb(0, 104, 191)'
                      }}
                  />)}
                />
                <S.CheckboxText checked={this.state.userType[1]}>Adotante</S.CheckboxText>
              </S.CheckboxView>

              <S.RegisterTextInputView>

                <S.ProfilePicView onPress={() => this.setState({ isModalVisible: true })}>
                  <S.ProfilePicImage
                    onProgress={() => (
                      <ActivityIndicator style={{ flex: 1 }} size='small' color='rgb(0, 104, 191)' />
                    )}
                    source={this.state.picture
                      ? { uri: `data:image/jpg;base64,${this.state.picture}` }
                      : require('../../assets/png/profile_picture_placeholder.png')
                    }
                    resizeMode='cover'
                  />
                  <Icon type='FontAwesome' name='camera'
                    style={{ fontSize: 18, position: 'absolute', zIndex: 501, bottom: 0, right: 0 }}
                  />
                </S.ProfilePicView>

                <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
                >Nome</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.nameInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={this.state.errorFields.name
                    ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                  }
                  autoCapitalize='words'
                  keyboardType='default'
                  maxLength={30}
                  placeholder={this.state.userType[0] === true ? 'Entre com o nome da sua ONG' : 'Entre com seu nome'}
                  placeholderTextColor={'#919191'}
                  value={this.state.name}
                  onChangeText={(input) => { this.setState({ name: input }) }}
                  onSubmitEditing={() => this.docInput.focus()}
                />

                {this.state.userType[0] === true
                  ? (<>
                    <S.InputTitleText onLayout={(event) => this.setState({ docPos: event.nativeEvent.layout.y })}>CPNJ (Sem pontuação)</S.InputTitleText>
                    <TextInputMask
                      style={this.state.errorFields.doc
                        ? { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                        : { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                      ref={(ref) => { this.docInput = ref; }}
                      type={'cnpj'}
                      placeholder='Entre com seu CPF'
                      placeholderTextColor={'#919191'}
                      value={this.state.doc}
                      onChangeText={(input) => { this.setState({ doc: input }) }}
                      onSubmitEditing={() => this.emailInput.focus()}
                    />
                  </>)
                  : (<>
                    <S.InputTitleText onLayout={(event) => this.setState({ docPos: event.nativeEvent.layout.y })}>CPF (Sem pontuação)</S.InputTitleText>
                    <TextInputMask
                      style={this.state.errorFields.doc
                        ? { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                        : { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                      ref={(ref) => { this.docInput = ref; }}
                      type={'cpf'}
                      placeholder='Entre com seu CPF'
                      placeholderTextColor={'#919191'}
                      value={this.state.doc}
                      onChangeText={(input) => { this.setState({ doc: input }) }}
                      onSubmitEditing={() => this.emailInput.focus()}
                    />
                  </>)
                }
                {this.state.errorFields.doc
                  ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                  : null
                }

                <S.InputTitleText onLayout={(event) => this.setState({ emailPos: event.nativeEvent.layout.y })}
                >E-mail</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.emailInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={this.state.errorFields.email
                    ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                  }
                  keyboardType='email-address'
                  maxLength={30}
                  placeholder={this.state.userType[0] === true ? 'Entre com o e-mail da sua ONG' : 'Entre com seu e-mail'}
                  placeholderTextColor={'#919191'}
                  value={this.state.email}
                  onChangeText={(input) => { this.setState({ email: input }) }}
                  autoCapitalize='none'
                  onSubmitEditing={() => this.phoneInput.focus()}
                />
                {this.state.errorFields.email
                  ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                  : null
                }

                <S.InputTitleText onLayout={(event) => this.setState({ phonePos: event.nativeEvent.layout.y })}
                >Contato</S.InputTitleText>
                <TextInputMask
                  style={this.state.errorFields.doc
                    ? { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { marginBottom: '7%', backgroundColor: 'white', width: Window.winWidth * 0.8, fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16, paddingHorizontal: '2%', paddingVertical: '3%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  ref={(ref) => { this.phoneInput = ref; }}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  placeholder={this.state.userType[0] === true ? 'Entre com o contato da sua ONG' : 'Entre com seu contato'}
                  placeholderTextColor={'#919191'}
                  value={this.state.phone}
                  onChangeText={(input) => { this.setState({ phone: input }) }}
                  onSubmitEditing={() => this.descriptionInput.focus()}
                />
                {this.state.errorFields.phone
                  ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                  : null
                }

                <S.InputTitleText onLayout={(event) => this.setState({ descriptionPos: event.nativeEvent.layout.y })}
                >Descrição</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.descriptionInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, flex: 1 }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={this.state.errorFields.description
                    ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                  }
                  keyboardType='default'
                  maxLength={500}
                  autoCorrect={true}
                  spellCheck={true}
                  autoCapitalize='sentences'
                  multiline
                  placeholder='Entre com sua descrição'
                  placeholderTextColor={'#919191'}
                  value={this.state.description}
                  onChangeText={(input) => { this.setState({ description: input }) }}
                />
                {this.state.errorFields.description
                  ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                  : null
                }

                <S.InputTitleText onLayout={(event) => this.setState({ passwordPos: event.nativeEvent.layout.y })}
                >Senha</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.passwordInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={this.state.errorFields.password || this.state.errorFields.passwordMatch
                    ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                  }
                  keyboardType='default'
                  secureTextEntry
                  maxLength={30}
                  placeholder='Entre com sua senha'
                  placeholderTextColor={'#919191'}
                  value={this.state.password}
                  onChangeText={(input) => { this.setState({ password: input }) }}
                  clearTextOnFocus={false}
                  clearButtonMode='while-editing'
                  onSubmitEditing={() => this.passwordConfirmInput.focus()}
                  autoCapitalize='none'
                />
                {this.state.password.length < 6 && this.state.error
                  ? (
                    this.state.errorFields.password
                      ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                      : null
                  )
                  : (
                    this.state.errorFields.passwordMatch
                      ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                      : null
                  )
                }


                <S.InputTitleText onLayout={(event) => this.setState({ passwordConfirmPos: event.nativeEvent.layout.y })}
                >Confirmar Senha</S.InputTitleText>
                <S.RegisterTextInput
                  ref={(ref) => { this.passwordConfirmInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={this.state.errorFields.passwordConfirm || this.state.errorFields.passwordMatch
                    ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                    : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                  }
                  keyboardType='default'
                  secureTextEntry
                  maxLength={30}
                  placeholder='Confirme a sua senha'
                  placeholderTextColor={'#919191'}
                  value={this.state.passwordConfirm}
                  onChangeText={(input) => { this.setState({ passwordConfirm: input }) }}
                  clearTextOnFocus={false}
                  clearButtonMode='while-editing'
                  autoCapitalize='none'
                />
                {this.state.passwordConfirm.length < 6 && this.state.error
                  ? (
                    this.state.errorFields.passwordConfirm
                      ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                      : null
                  )
                  : (
                    this.state.errorFields.passwordMatch
                      ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                      : null
                  )
                }
                {this.state.errorFields.blank
                  ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                  : null
                }
                {this.state.loading === true
                  ? (<ActivityIndicator size='small' color='rgb(0, 104, 191)' />)
                  : null
                }

              </S.RegisterTextInputView>

              <S.RegisterTouchableOpacity
                disabled={this.state.loading ? true : false}
                activeOpacity={0.5}
                onPress={() => this.handleRegister()}>
                {this.state.userType[0]
                  ? (<S.RegisterText>Cadastrar</S.RegisterText>)
                  : (<S.RegisterText>Próximo</S.RegisterText>)
                }
              </S.RegisterTouchableOpacity>
              {this.profilePicModal()}
            </S.FullScrollView>
          </KeyboardAvoidingView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default RegisterScreen;
