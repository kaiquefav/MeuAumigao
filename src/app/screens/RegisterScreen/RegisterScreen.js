import React from 'react';
import * as S from './RegisterScreen.style';
import { CheckBox } from 'react-native-elements'
import { Icon } from 'native-base';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Platform, Alert, Keyboard } from 'react-native';
import * as Font from 'expo-font'
import * as Validation from '../../utils/Validations/validations';

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
      errorMessage: '',
      error: false,
      errorFields: { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false },
      fontLoaded: false,
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

  errorHandler = (result) => {
    let aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false };
    this.setState({ errorFields: aux });

    switch (result.field) {
      case 'all':
        this.nameInput.shake();
        this.docInput.shake();
        this.emailInput.shake();
        this.phoneInput.shake();
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
        this.docInput.shake();
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
        this.phoneInput.shake();
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
    let result = Validation.RegisterValidation(name, doc, email, phone, description, password, passwordConfirm, userType);
    if (result.validate !== true) {
      this.setState({ errorMessage: result.validate }, () => this.errorHandler(result));
    }
    else {
      let aux = { blank: false, userType: false, name: false, doc: false, phone: false, email: false, description: false, password: false, passwordConfirm: false, passwordMatch: false };
      this.setState({ errorFields: aux });
      this.state.userType[0]
      if (this.state.userType[0]) {
        Alert.alert('Cadastro', 'Cadastro com sucesso!');
        this.props.navigation.navigate('Login');
      }
      else this.props.navigation.navigate('Preferences')
    }
  }

  render() {
    return (
      this.state.fontLoaded ?
        (<S.FullScrollView ref={(ref) => { this.scrollView = ref; }}>

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
                marginRight: '-4%'
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
                marginRight: '-4%'
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

            <S.InputTitleText onLayout={(event) => this.setState({ namePos: event.nativeEvent.layout.y })}
            >Nome</S.InputTitleText>
            <S.RegisterTextInput
              ref={(ref) => { this.nameInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
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
            />

            {this.state.userType[0] === true
              ? (<S.InputTitleText onLayout={(event) => this.setState({ docPos: event.nativeEvent.layout.y })}>CPNJ</S.InputTitleText>)
              : (<S.InputTitleText onLayout={(event) => this.setState({ docPos: event.nativeEvent.layout.y })}>CPF</S.InputTitleText>)
            }
            <S.RegisterTextInput
              ref={(ref) => { this.docInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={this.state.errorFields.doc
                ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
              }
              keyboardType='numbers-and-punctuation'
              maxLength={14}
              placeholder={this.state.userType[0] === true ? 'Entre com seu CNPJ' : 'Entre com seu CPF'}
              placeholderTextColor={'#919191'}
              value={this.state.doc}
              onChangeText={(input) => { this.setState({ doc: input }) }}
            />
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
            />
            {this.state.errorFields.email
              ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
              : null
            }

            <S.InputTitleText onLayout={(event) => this.setState({ phonePos: event.nativeEvent.layout.y })}
            >Contato</S.InputTitleText>
            <S.RegisterTextInput
              ref={(ref) => { this.phoneInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={this.state.errorFields.phone
                ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
              }
              keyboardType='phone-pad'
              maxLength={11}
              placeholder={this.state.userType[0] === true ? 'Entre com o contato da sua ONG' : 'Entre com seu contato'}
              placeholderTextColor={'#919191'}
              value={this.state.phone}
              onChangeText={(input) => { this.setState({ phone: input }) }}
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

          </S.RegisterTextInputView>

          <S.RegisterTouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.handleRegister()}>
            {this.state.userType[0]
              ? (<S.RegisterText>Cadastrar</S.RegisterText>)
              : (<S.RegisterText>Próximo</S.RegisterText>)
            }
          </S.RegisterTouchableOpacity>

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default RegisterScreen;
