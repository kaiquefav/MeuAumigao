import React from 'react';
import * as S from './RegisterScreen.style';
import { CheckBox } from 'react-native-elements'
import { Icon } from 'native-base';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Platform } from 'react-native';
import * as Font from 'expo-font'

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: [false, true],
      name: '',
      CPF: '',
      email: '',
      description: '',
      password: '',
      passwordConfirm: '',
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

          <S.CheckboxView>
            <CheckBox
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
                style={{
                  fontSize: 20,
                  color: 'rgb(81, 81, 81)'
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
                style={{
                  fontSize: 20,
                  color: 'rgb(81, 81, 81)'
                }}
              />)}
            />
            <S.CheckboxText checked={this.state.userType[1]}>Adotante</S.CheckboxText>
          </S.CheckboxView>

          <S.RegisterTextInputView>

            <S.InputTitleText>Nome</S.InputTitleText>
            <S.RegisterTextInput
              ref={(ref) => { this.nameInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              autoCapitalize='words'
              keyboardType='default'
              maxLength={30}
              placeholder={this.state.userType[0] === true ? 'Entre com o nome da sua ONG' : 'Entre com seu nome'}
              placeholderTextColor={'#919191'}
              value={this.state.name}
              onChangeText={(input) => { this.setState({ name: input }) }}
            />
            {this.state.userType[0] === true
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
              placeholder={this.state.userType[0] === true ? 'Entre com seu CNPJ' : 'Entre com seu CPF'}
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
              placeholder={this.state.userType[0] === true ? 'Entre com o e-mail da sua ONG' : 'Entre com seu e-mail'}
              placeholderTextColor={'#919191'}
              value={this.state.email}
              onChangeText={(input) => { this.setState({ email: input }) }}
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

            <S.InputTitleText>Confirmar Senha</S.InputTitleText>
            <S.RegisterTextInput
              ref={(ref) => { this.passwordConfirmInput = ref; }}
              containerStyle={{ width: Window.winWidth * 0.8, paddingHorizontal: 0 }}
              inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
              inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
              keyboardType='default'
              secureTextEntry
              maxLength={30}
              placeholder='Confirme a sua senha'
              placeholderTextColor={'#919191'}
              value={this.state.passwordConfirm}
              onChangeText={(input) => { this.setState({ passwordConfirm: input }) }}
            />

          </S.RegisterTextInputView>

          <S.RegisterTouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Preferences')}>
            {/* // onPress={() => this.passwordConfirmInput.shake()}> */}
            <S.RegisterText>Próximo</S.RegisterText>
          </S.RegisterTouchableOpacity>

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default RegisterScreen;
