import React from 'react';
import * as S from './NewPetScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import * as Font from 'expo-font';
import * as Validation from '../../utils/Validations/validations';
import { CheckBox } from 'react-native-elements'
import { Icon } from 'native-base';
import * as Firebase from 'firebase';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';

import DogsPicker from './DogsList';
import CatsPicker from './CatsList';

import { getRandom } from '../../utils/mathFunctions';

class NewPetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: [true, false, false],
      name: '',
      description: '',
      picture: '',
      race: 'SRD (Sem raça definida)',
      size: 'Pequeno',
      age: 'Novo',
      behavior: 'Calmo',
      care: 'Pouco',
      nature: 'Sociável',
      sex: 'Masculino',
      errorFields: { name: false, description: false, race: false, size: false, age: false, behavior: false },
      error: '',
      city: '',
      street: '',
      district: '',
      number: '',
      fontLoaded: false,
      isModalVisible: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    await this.requestCameraPermissions();
    this.setState({ fontLoaded: true });
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
        <S.PictureModalText>Adicione uma foto para o seu amigão!</S.PictureModalText>
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


  async addPet(name, description, race, size, age, behavior, care, nature, sex, city, street, district, number, picture) {
    const { userID } = this.props.route.params;
    const { petType } = this.state;
    const petID = getRandom();
    let type;
    if (petType[0] === true) {
      type = 0;
      await Firebase.database().ref('animals/dogs/' + petID).set({
        name: name,
        description: description,
        race: race,
        size: size,
        age: age,
        behavior: behavior,
        care: care,
        nature: nature,
        sex: sex,
        owner: userID,
        petPic: picture,
        petType: 0,
        local: {
          localTitle: this.props.route.params.userName,
          localCity: city,
          localStreet: street,
          localDistrict: district,
          localNumber: number,
        },
      });
      await Firebase.database().ref('users/' + userID + '/animals/dogs/' + petID).set({
        name: name,
        description: description,
        race: race,
        size: size,
        age: age,
        behavior: behavior,
        care: care,
        nature: nature,
        sex: sex,
        type: type,
        petPic: picture,
        petType: 0,
        local: {
          localTitle: this.props.route.params.userName,
          localCity: city,
          localStreet: street,
          localDistrict: district,
          localNumber: number,
        },
      });
    }
    if (petType[1] === true) {
      type = 1;
      await Firebase.database().ref('animals/cats/' + petID).set({
        name: name,
        description: description,
        race: race,
        size: size,
        age: age,
        behavior: behavior,
        care: care,
        nature: nature,
        sex: sex,
        owner: userID,
        petPic: picture,
        petType: 1,
        local: {
          localTitle: this.props.route.params.userName,
          localCity: city,
          localStreet: street,
          localDistrict: district,
          localNumber: number,
        },
      });
      await Firebase.database().ref('users/' + userID + '/animals/cats/' + petID).set({
        name: name,
        description: description,
        race: race,
        size: size,
        age: age,
        behavior: behavior,
        care: care,
        nature: nature,
        sex: sex,
        type: type,
        petPic: picture,
        petType: 1,
        local: {
          localTitle: this.props.route.params.userName,
          localCity: city,
          localStreet: street,
          localDistrict: district,
          localNumber: number,
        },
      });
    }
    if (petType[2] === true) {
      type = 2;
      await Firebase.database().ref('animals/others/' + petID).set({
        name: name,
        description: description,
        race: race,
        size: size,
        age: age,
        behavior: behavior,
        care: care,
        nature: nature,
        sex: sex,
        owner: userID,
        petPic: picture,
        petType: 2,
        local: {
          localTitle: this.props.route.params.userName,
          localCity: city,
          localStreet: street,
          localDistrict: district,
          localNumber: number,
        },
      });
      await Firebase.database().ref('users/' + userID + '/animals/others/' + petID).set({
        name: name,
        description: description,
        race: race,
        size: size,
        age: age,
        behavior: behavior,
        care: care,
        nature: nature,
        sex: sex,
        type: type,
        petPic: picture,
        petType: 2,
        local: {
          localTitle: this.props.route.params.userName,
          localCity: city,
          localStreet: street,
          localDistrict: district,
          localNumber: number,
        },
      });
    }
  }

  handleRegister = async () => {
    const { name, description, race, size, age, behavior, care, nature, sex, petType, city, street, district, number, picture } = this.state;
    this.setState({ error: false });
    let result = Validation.AddPetValidation(name, description, city, street, district, number, picture);
    if (result.validate !== true) {
      this.setState({ error: true });
      this.setState({ errorMessage: result.validate });
    }
    else {
      this.setState({ error: false });
      await this.addPet(name, description, race, size, age, behavior, care, nature, sex, city, street, district, number, picture);
      this.props.navigation.replace('BottomTab');
    }
  }

  render() {
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ?
          (<KeyboardAvoidingView
            style={{ flex: 1 }} behavior="padding"
            keyboardVerticalOffset={0}
            enabled={Platform.OS === 'ios' ? true : false}
          >
            <S.FullScrollView>

              <S.HeaderView>
                <S.Header
                  backButton={true}
                  icon={true}
                  onPress={() => this.props.navigation.navigate('BottomTab')}
                />
              </S.HeaderView>

              <S.LoginTitleText>
                Cadastre um novo Amigão!
          </S.LoginTitleText>

              <S.CheckboxView
                onLayout={(event) => this.setState({ petTypePos: event.nativeEvent.layout.y })}
              >
                <CheckBox
                  ref={(ref) => { this.petTypeInput = ref; }}
                  containerStyle={{
                    borderWidth: 0,
                    padding: 0,
                    marginRight: '1%'
                  }}
                  onPress={() => {
                    let user = [!this.state.petType[0], false, false]
                    this.setState({ petType: user });
                  }}
                  checked={this.state.petType[0]}
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
                    style={{
                      fontSize: 20,
                      color: 'rgb(0, 104, 191)'
                    }}
                  />)}
                />
                <S.CheckboxText checked={this.state.petType[0]}>Cachorro</S.CheckboxText>
                <CheckBox
                  containerStyle={{
                    borderWidth: 0,
                    padding: 0,
                    marginRight: '1%'
                  }}
                  onPress={() => {
                    let user = [false, !this.state.petType[1], false]
                    this.setState({ petType: user });
                  }}
                  checked={this.state.petType[1]}
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
                    style={{
                      fontSize: 20,
                      color: 'rgb(0, 104, 191)'
                    }}
                  />)}
                />
                <S.CheckboxText checked={this.state.petType[1]}>Gato</S.CheckboxText>
                <CheckBox
                  containerStyle={{
                    borderWidth: 0,
                    padding: 0,
                    marginRight: '1%'
                  }}
                  onPress={() => {
                    let user = [false, false, !this.state.petType[2]]
                    this.setState({ petType: user });
                  }}
                  checked={this.state.petType[2]}
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
                    style={{
                      fontSize: 20,
                      color: 'rgb(0, 104, 191)'
                    }}
                  />)}
                />
                <S.CheckboxText checked={this.state.petType[2]}>Outros</S.CheckboxText>
              </S.CheckboxView>

              <S.InputTitleText
                style={{ fontFamily: 'Bellota-Bold', marginBottom: '5%', alignSelf: 'center', fontSize: 17 }}
              >Informações do amigão</S.InputTitleText>

              <S.ProfilePicView
                onPress={() => this.setState({ isModalVisible: true })}
              >
                <S.ProfilePicImage
                  onProgress={() => (
                    <ActivityIndicator style={{ flex: 1 }} size='small' color='rgb(0, 104, 191)' />
                  )}
                  source={this.state.picture
                    ? { uri: `data:image/jpg;base64,${this.state.picture}` }
                    : require('../../assets/png/profile_picture_placeholder.png')
                  }
                  resizeMode='cover'
                  style={this.state.error && !this.state.picture && { borderWidth: 1, borderColor: 'red' }}
                />
                <Icon type='FontAwesome' name='camera'
                  style={{ fontSize: 18, position: 'absolute', zIndex: 501, bottom: 0, right: 0 }}
                />
              </S.ProfilePicView>

              {this.state.error && !this.state.picture
                ? (<S.ErrorText>Adicione uma foto para o seu amigão!</S.ErrorText>)
                : null
              }

              <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
              >Nome</S.InputTitleText>
              <S.RegisterTextInput
                ref={(ref) => { this.nameInput = ref; }}
                containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                autoCapitalize='words'
                keyboardType='default'
                maxLength={30}
                placeholder='Nome do amigão'
                placeholderTextColor={'#919191'}
                value={this.state.name}
                onChangeText={(input) => { this.setState({ name: input }) }}
                onSubmitEditing={() => this.descriptionInput.focus()}
              />

              <S.InputTitleText onLayout={(event) => this.setState({ descriptionPos: event.nativeEvent.layout.y })}
              >Descrição</S.InputTitleText>
              <S.RegisterTextInput
                ref={(ref) => { this.descriptionInput = ref; }}
                containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, paddingBottom: '2%', alignSelf: 'center', flex: 1 }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                keyboardType='default'
                maxLength={500}
                multiline
                autoCorrect={true}
                spellCheck={true}
                autoCapitalize='sentences'
                placeholder='Descrição do amigão'
                placeholderTextColor={'#919191'}
                value={this.state.description}
                onChangeText={(input) => { this.setState({ description: input }) }}
              />

              <S.InputTitleText>Raça</S.InputTitleText>
              {this.state.petType[0] === true && < DogsPicker onValueChange={(race) => this.setState({ race })} />}
              {this.state.petType[1] === true && < CatsPicker onValueChange={(race) => this.setState({ race })} />}
              {this.state.petType[2] === true && (
                <S.RegisterTextInput
                  ref={(ref) => { this.nameInput = ref; }}
                  containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                  inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                  inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  autoCapitalize='words'
                  keyboardType='default'
                  maxLength={30}
                  placeholder='Raça do amigão'
                  placeholderTextColor={'#919191'}
                  value={this.state.race}
                  onChangeText={(input) => { this.setState({ race: input }) }}
                />
              )
              }

              <S.InputTitleText>Porte</S.InputTitleText>
              <S.RegisterPicker
                iosHeader='Porte?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                iosIcon={
                  <S.BackArrowImage
                    source={require('../../assets/png/ic_down_black_arrow_button.png')}
                    resizeMode='contain'
                  />}
                headerBackButtonText="Voltar"
                headerBackButtonTextStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dropdown"
                placeholder="Porte do amigão"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.size}
                onValueChange={(size) => this.setState({ size })}
                headerBackButtonText='Voltar'
              >
                <S.RegisterPicker.Item
                  label="Pequeno"
                  value='Pequeno'
                />
                <S.RegisterPicker.Item
                  label="Médio"
                  value='Médio'
                />
                <S.RegisterPicker.Item
                  label="Grande"
                  value='Grande'
                />

              </S.RegisterPicker>

              <S.InputTitleText>Idade</S.InputTitleText>
              <S.RegisterPicker
                iosHeader='Idade?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                iosIcon={
                  <S.BackArrowImage
                    source={require('../../assets/png/ic_down_black_arrow_button.png')}
                    resizeMode='contain'
                  />}
                headerBackButtonText="Voltar"
                headerBackButtonTextStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dropdown"
                placeholder="Idade do amigão"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.age}
                onValueChange={(age) => this.setState({ age })}
                headerBackButtonText='Voltar'
              >
                <S.RegisterPicker.Item
                  label="Novo"
                  value='Novo'
                />
                <S.RegisterPicker.Item
                  label="Adulto"
                  value='Adulto'
                />
                <S.RegisterPicker.Item
                  label="Idoso"
                  value='Idoso'
                />

              </S.RegisterPicker>

              <S.InputTitleText>Comportamento</S.InputTitleText>
              <S.RegisterPicker
                iosHeader='Comportamento?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                iosIcon={
                  <S.BackArrowImage
                    source={require('../../assets/png/ic_down_black_arrow_button.png')}
                    resizeMode='contain'
                  />}
                headerBackButtonText="Voltar"
                headerBackButtonTextStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dropdown"
                placeholder="Comportamento do amigão"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.behavior}
                onValueChange={(behavior) => this.setState({ behavior })}
                headerBackButtonText='Voltar'
              >
                <S.RegisterTextInput.Item
                  label="Tímido"
                  value='Tímido'
                />
                <S.RegisterTextInput.Item
                  label="Calmo"
                  value='Calmo'
                />
                <S.RegisterTextInput.Item
                  label="Brincalhão"
                  value='Brincalhão'
                />
                <S.RegisterTextInput.Item
                  label="Agitado"
                  value='Agitado'
                />
                <S.RegisterTextInput.Item
                  label="Protetor"
                  value='Protetor'
                />
              </S.RegisterPicker>

              <S.InputTitleText>Carência de cuidados</S.InputTitleText>
              <S.RegisterPicker
                iosHeader='Carência de cuidados?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                iosIcon={
                  <S.BackArrowImage
                    source={require('../../assets/png/ic_down_black_arrow_button.png')}
                    resizeMode='contain'
                  />}
                headerBackButtonText="Voltar"
                headerBackButtonTextStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dropdown"
                placeholder="Carência de cuidados"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.care}
                onValueChange={(care) => this.setState({ care })}
              >
                <S.RegisterPicker.Item
                  label="Pouco"
                  value='Pouco'
                />
                <S.RegisterPicker.Item
                  label="Médio"
                  value='Médio'
                />
                <S.RegisterPicker.Item
                  label="Muito"
                  value='Muito'
                />
              </S.RegisterPicker>

              <S.InputTitleText>Sexo</S.InputTitleText>
              <S.RegisterPicker
                iosHeader='Sexo?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                iosIcon={
                  <S.BackArrowImage
                    source={require('../../assets/png/ic_down_black_arrow_button.png')}
                    resizeMode='contain'
                  />}
                headerBackButtonText="Voltar"
                headerBackButtonTextStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dropdown"
                placeholder="Preferência de sexo?"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.sex}
                onValueChange={(sex) => this.setState({ sex })}
                headerBackButtonText='Voltar'
              >
                <S.RegisterPicker.Item
                  label="Masculino"
                  value='Masculino'
                />
                <S.RegisterPicker.Item
                  label="Feminino"
                  value='Feminino'
                />
              </S.RegisterPicker>

              <S.InputTitleText
                style={{ fontFamily: 'Bellota-Bold', marginBottom: '5%', alignSelf: 'center', fontSize: 17 }}
              >Endereço do amigão</S.InputTitleText>

              <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
              >Cidade</S.InputTitleText>
              <S.RegisterTextInput
                ref={(ref) => { this.cityInput = ref; }}
                containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                autoCapitalize='words'
                keyboardType='default'
                maxLength={30}
                placeholderTextColor={'#919191'}
                value={this.state.city}
                onChangeText={(input) => { this.setState({ city: input }) }}
                onSubmitEditing={() => this.streetInput.focus()}
              />

              <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
              >Rua</S.InputTitleText>
              <S.RegisterTextInput
                ref={(ref) => { this.streetInput = ref; }}
                containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                autoCapitalize='words'
                keyboardType='default'
                maxLength={30}
                placeholderTextColor={'#919191'}
                value={this.state.street}
                onChangeText={(input) => { this.setState({ street: input }) }}
                onSubmitEditing={() => this.numberInput.focus()}
              />

              <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
              >Número</S.InputTitleText>
              <S.RegisterTextInput
                ref={(ref) => { this.numberInput = ref; }}
                containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                autoCapitalize='words'
                keyboardType='numeric'
                maxLength={30}
                placeholderTextColor={'#919191'}
                value={this.state.number}
                onChangeText={(input) => { this.setState({ number: input }) }}
                onSubmitEditing={() => this.districtInput.focus()}
              />

              <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
              >Bairro</S.InputTitleText>
              <S.RegisterTextInput
                ref={(ref) => { this.districtInput = ref; }}
                containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0, alignSelf: 'center' }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingLeft: '7%', paddingRight: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                autoCapitalize='words'
                keyboardType='default'
                maxLength={30}
                placeholderTextColor={'#919191'}
                value={this.state.district}
                onChangeText={(input) => { this.setState({ district: input }) }}
              />

              {this.state.error
                ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                : null
              }

              <S.RegisterTouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.handleRegister()}
              >
                <S.RegisterText>Cadastrar</S.RegisterText>
              </S.RegisterTouchableOpacity >
              {this.profilePicModal()}
            </S.FullScrollView >
          </KeyboardAvoidingView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default NewPetScreen;
