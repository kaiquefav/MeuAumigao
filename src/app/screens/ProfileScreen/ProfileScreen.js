import React from 'react';
import * as S from './ProfileScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { AirbnbRating } from 'react-native-elements';
import { Icon } from 'native-base';

import * as Users from '../../mocky/mockData';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: '',
      name: '',
      doc: '',
      email: '',
      description: '',
      password: '',
      profilePic: '',
      rating: '',
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    this.setUserData();
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });


  }

  setUserData = () => {
    this.setState({ userType: Users.user.userType });
    this.setState({ name: Users.user.name });
    this.setState({ doc: Users.user.doc });
    this.setState({ email: Users.user.email });
    this.setState({ description: Users.user.description });
    this.setState({ password: Users.user.password });
    this.setState({ profilePic: Users.user.profilePic });
    this.setState({ rating: Users.user.rating });
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

            {this.state.userType === 0
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
            {this.state.userType === 0
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
              value={this.state.doc}
              onChangeText={(input) => { this.setState({ doc: input }) }}
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

            {this.state.userType === 1 && (
              <>
                <S.InputTitleText>Sua pontuação</S.InputTitleText>

                <S.RatingView>
                  <AirbnbRating
                    count={10}
                    defaultRating={this.state.rating}
                    size={16}
                    starStyle={{ backgroundColor: 'transparent', marginRight: '1%' }}
                    showRating={false}
                    isDisabled={true}
                  />
                </S.RatingView>
              </>)}

          </S.RegisterTextInputView>

          {this.state.userType === 1 && (
            <S.RegisterTouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('PreferencesProfile')}
            >
              <S.RegisterText>Atualizar Preferências</S.RegisterText>
            </S.RegisterTouchableOpacity>
          )}

          < S.RegisterTouchableOpacity style={{ marginBottom: '10%' }}>
            <S.RegisterText>Atualizar Perfil</S.RegisterText>
          </S.RegisterTouchableOpacity>

        </S.FullScrollView >)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default ProfileScreen;
