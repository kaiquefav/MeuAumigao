import React from 'react';
import * as S from './ProfileScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 1,
      name: 'AUjudando os Animais',
      CPF: '111.111.111-11',
      email: 'aujudando@email.com',
      description: 'Uma ONG que proporciona uma ajuda à estes animaizinhos que estão nessa situação de abandono nas ruas. Toda ajuda é bem vinda. Para contato, ligue: (11) 1111-1111.',
      password: '123123',
      passwordConfirm: '123123',
      profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfiFWGJNvim2mcln-E36Qzy3278R8dzlzdIxiy3uEhxaE7YQ9S&usqp=CAU',
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
      this.state.fontLoaded ?
        (<S.FullScrollView>

          <S.Header
            backButton={false}
            icon={true}
            onPress={() => this.props.navigation.goBack()}
          />

          <S.ProfilePicView>
            <S.ProfilePicImage
              source={this.state.profilePic
                ? { uri: this.state.profilePic }
                : require('../../assets/png/profile_picture_placeholder.png')
              }
              resizeMode='contain'
            />
          </S.ProfilePicView>

          <S.Divisor />

          <S.RegisterTextInputView>

            {this.state.userType === 1
              ? (<S.InputTitleText>Nome da ONG</S.InputTitleText>)
              : (<S.InputTitleText>Nome</S.InputTitleText>)
            }
            <S.RegisterTextInput
              ref={(ref) => { this.nameInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              autoCapitalize='words'
              keyboardType='default'
              maxLength={30}
              placeholder={this.state.userType === 1 ? 'Entre com o nome da sua ONG' : 'Entre com seu nome'}
              placeholderTextColor={'#919191'}
              value={this.state.name}
              onChangeText={(input) => { this.setState({ name: input }) }}
            />
            {this.state.userType === 1
              ? (<S.InputTitleText>CPNJ</S.InputTitleText>)
              : (<S.InputTitleText>CPF</S.InputTitleText>)
            }

            <S.RegisterTextInput
              ref={(ref) => { this.docInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              keyboardType='numbers-and-punctuation'
              maxLength={14}
              placeholder={this.state.userType === 1 ? 'Entre com seu CNPJ' : 'Entre com seu CPF'}
              placeholderTextColor={'#919191'}
              value={this.state.CPF}
              onChangeText={(input) => { this.setState({ CPF: input }) }}
            />

            <S.InputTitleText>E-mail</S.InputTitleText>
            <S.RegisterTextInput
              ref={(ref) => { this.emailInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              keyboardType='email-address'
              maxLength={30}
              placeholder={this.state.userType === 1 ? 'Entre com o e-mail da sua ONG' : 'Entre com seu e-mail'}
              placeholderTextColor={'#919191'}
              value={this.state.email}
              onChangeText={(input) => { this.setState({ email: input }) }}
              disabled={true}
            />

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
              value={this.state.description}
              onChangeText={(input) => { this.setState({ description: input }) }}
            />

            <S.InputTitleText>Senha</S.InputTitleText>
            <S.RegisterTextInput
              ref={(ref) => { this.passwordInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              keyboardType='default'
              secureTextEntry
              maxLength={30}
              placeholder='Entre com sua senha'
              placeholderTextColor={'#919191'}
              value={this.state.password}
              onChangeText={(input) => { this.setState({ password: input }) }}
            />

          </S.RegisterTextInputView>


          <S.RegisterTouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('PreferencesProfile')}
          >
            <S.RegisterText>Atualizar Preferências</S.RegisterText>
          </S.RegisterTouchableOpacity>

          <S.RegisterTouchableOpacity style={{ marginBottom: '10%' }}>
            <S.RegisterText>Atualizar Perfil</S.RegisterText>
          </S.RegisterTouchableOpacity>

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default ProfileScreen;
