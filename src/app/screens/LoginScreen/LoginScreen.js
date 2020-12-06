import React from 'react';
import * as S from './LoginScreen.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Keyboard, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import * as Validation from '../../utils/Validations/validations';
import * as firebase from 'firebase'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorFields: { email: false, password: false, blank: false, wrong: false },
      error: '',
      errorMessage: '',
      loading: false,
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
    let aux = { email: false, password: false, blank: false, wrong: false };
    this.setState({ errorFields: aux });

    switch (result.field) {
      case 'all':
        this.setState({ error: true });
        aux = { email: false, password: false, blank: true, wrong: false };
        this.setState({ errorFields: aux });
        this.emailInput.shake();
        this.passwordInput.shake();
        break;
      case 'email':
        this.setState({ error: true });
        aux = { email: true, password: false, blank: false, wrong: false };
        this.setState({ errorFields: aux });
        this.emailInput.shake();
        break;
      case 'password':
        this.setState({ error: true });
        if (this.state.password.length < 6) {
          aux = { email: false, password: true, blank: false, wrong: false };
          this.setState({ errorFields: aux });
          this.passwordInput.shake();
        }
        break;
      default:
        break;
    }
  }

  handleLogin = async () => {
    const { email, password } = this.state;
    this.setState({ error: false });
    let result = Validation.LoginValidation(email, password);
    // console.log('result :', result);
    if (result.validate !== true) {
      this.setState({ errorMessage: result.validate }, () => this.errorHandler(result));
    }
    else {
      let aux = { email: false, password: false, blank: false, wrong: false };
      this.setState({ errorFields: aux });
      this.setState({ loading: true });
      try {
        await firebase.auth()
          .signInWithEmailAndPassword(email, password);
        this.props.navigation.replace('BottomTab');
      }
      catch (err) {
        let aux = { email: false, password: false, blank: false, wrong: true };
        this.setState({ errorFields: aux });
        console.log('err:', err);
        if (err.code === 'auth/user-not-found') this.setState({ errorMessage: 'Usuário não encontrado!' })
        if (err.code === 'auth/wrong-password') this.setState({ errorMessage: 'Senha incorreta!' })
        if (err.code === 'auth/too-many-requests') this.setState({ errorMessage: 'Você errou sua senha muitas vezes, tente novamente mais tarde!' })
      }
      finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ? (
          <S.FullScrollView>

            <S.Header
              backButton={false}
              icon={true}
              onPress={() => this.props.navigation.goBack()}
            />

            <S.LoginTitleText>
              {`Para continuar,`}
              {`\n`}
              {`faça o login`}
            </S.LoginTitleText>

            <S.LoginView>
              <S.EmailTitleView>
                {
                  Validation.validateEmail(this.state.email) ? <MaterialCommunityIcons name="email-check-outline" size={24} color="rgb(81, 81, 81);" />
                    : <MaterialCommunityIcons name="email-outline" size={24} color="rgb(81, 81, 81);" />
                }
                <S.EmailTitleText>E-mail</S.EmailTitleText>
              </S.EmailTitleView>
              <S.LoginTextInput
                ref={(ref) => { this.emailInput = ref; }}
                containerStyle={{ alignSelf: 'center', width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={this.state.errorFields.email
                  ? { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(252, 3, 3, 0.4)' }
                  : { backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }
                }
                autoCapitalize='none'
                keyboardType='email-address'
                maxLength={30}
                placeholder='Entre com seu e-mail'
                placeholderTextColor={'#919191'}
                value={this.state.email}
                onChangeText={(input) => { this.setState({ email: input }) }}
                clearButtonMode={'while-editing'}
                onSubmitEditing={() => this.passwordInput.focus()}
              />
              {this.state.errorFields.email
                ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                : null
              }
              <S.PasswordTitleView>
                {
                  this.state.password.length >= 6 ? <MaterialCommunityIcons name="lock-outline" size={24} color="rgb(81, 81, 81);" />
                    : <MaterialCommunityIcons name="lock-open-outline" size={24} color="rgb(81, 81, 81);" />
                }
                <S.PasswordTitleText>Senha</S.PasswordTitleText>
              </S.PasswordTitleView>
              <S.LoginTextInput
                ref={(ref) => { this.passwordInput = ref; }}
                containerStyle={{ alignSelf: 'center', width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
                inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                autoCapitalize='none'
                keyboardType='default'
                maxLength={30}
                placeholder='Entre com sua senha'
                placeholderTextColor={'#919191'}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(input) => { this.setState({ password: input }) }}
                clearButtonMode={'while-editing'}
              />
              {this.state.errorFields.password
                ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                : null
              }
              {this.state.errorFields.blank || this.state.errorFields.wrong
                ? (<S.ErrorText>{this.state.errorMessage}</S.ErrorText>)
                : null
              }

            </S.LoginView>

            <S.LoginTouchableOpacity
              disabled={this.state.loading ? true : false}
              activeOpacity={0.5}
              onPress={() => this.handleLogin()}
            >
              {this.state.loading === true
                ? (<ActivityIndicator size='small' color='white' />)
                : <S.LoginTouchableOpacityText>Entrar</S.LoginTouchableOpacityText>
              }
            </S.LoginTouchableOpacity>

            <S.RegisterText>Novo por aqui?</S.RegisterText>
            <S.RegisterTouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Register')}
            >
              <S.RegisterText style={{ marginBottom: '15%', marginTop: '0%', textDecorationLine: 'underline', fontFamily: 'Bellota-Bold' }}>Faça o cadastro agora mesmo!</S.RegisterText>
            </S.RegisterTouchableOpacity>

          </S.FullScrollView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default LoginScreen;
