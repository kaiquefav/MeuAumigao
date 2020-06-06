import React from 'react';
import * as S from './LoginScreen.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Window from '../../utils/windowDimensions/WindowDimensions';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  render() {
    return (
      this.state.fontLoaded ? (
        <S.FullScrollView>

          <S.Header
            backButton={true}
            icon={true}
            onPress={() => this.props.navigation.goBack()}
          />

          <S.LoginTitleText>
            {`Para continuar`}
            {`\n`}
            {`faça o login`}
          </S.LoginTitleText>

          <S.LoginView>
            <S.EmailTitleView>
              {
                this.state.email.length >= 8 ? <MaterialCommunityIcons name="email-check-outline" size={24} color="rgb(81, 81, 81);" />
                  : <MaterialCommunityIcons name="email-outline" size={24} color="rgb(81, 81, 81);" />
              }
              <S.EmailTitleText>E-mail</S.EmailTitleText>
            </S.EmailTitleView>
            <S.LoginTextInput
              ref={(ref) => { this.emailInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              autoCapitalize='words'
              keyboardType='default'
              maxLength={30}
              placeholder='Entre com seu e-mail'
              placeholderTextColor={'#919191'}
              value={this.state.email}
              onChangeText={(input) => { this.setState({ email: input }) }}
            />

            <S.PasswordTitleView>
              {
                this.state.password.length >= 6 ? <MaterialCommunityIcons name="lock-outline" size={24} color="rgb(81, 81, 81);" />
                  : <MaterialCommunityIcons name="lock-open-outline" size={24} color="rgb(81, 81, 81);" />
              }
              <S.PasswordTitleText>Senha</S.PasswordTitleText>
            </S.PasswordTitleView>
            <S.LoginTextInput
              ref={(ref) => { this.passwordInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              autoCapitalize='words'
              keyboardType='default'
              maxLength={30}
              placeholder='Entre com sua senha'
              placeholderTextColor={'#919191'}
              value={this.state.password}
              onChangeText={(input) => { this.setState({ password: input }) }}
            />
          </S.LoginView>

          <S.LoginTouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('BottomTab')}
          >
            <S.LoginTouchableOpacityText>Entrar</S.LoginTouchableOpacityText>
          </S.LoginTouchableOpacity>

          <S.RegisterText>Novo por aqui?</S.RegisterText>
          <S.RegisterTouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <S.RegisterText style={{ marginBottom: '15%', marginTop: '0%', textDecorationLine: 'underline', fontFamily: 'Bellota-Bold' }}>Faça o cadastro agora mesmo!</S.RegisterText>
          </S.RegisterTouchableOpacity>

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default LoginScreen;
