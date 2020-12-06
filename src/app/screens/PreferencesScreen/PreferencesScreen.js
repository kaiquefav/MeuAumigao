import React from 'react';
import * as S from './PreferencesScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Alert } from 'react-native';
import * as Font from 'expo-font';
import { getRandom } from '../../utils/mathFunctions';
import * as Firebase from 'firebase';
import { Icon } from 'native-base';

class PreferencesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '0',
      behavior: '0',
      care: '0',
      nature: '0',
      sex: '0',
      errorMessage: '',
      error: false,
      loading: false,
      fontLoaded: false,
    };
  }

  addUser(name, doc, email, phone, description, picture, size, behavior, care, sex, uid) {
    let type = 1;
    Firebase.database().ref('users/' + uid).set({
      name: name,
      doc: doc,
      email: email,
      phone: phone,
      description: description,
      picture: picture,
      userType: type,
      preferences: { size: size, behavior: behavior, care: care, sex: sex },
      rating: 0,
    });
    Alert.alert('Cadastro', 'Cadastro com sucesso!');
    this.props.navigation.navigate('Login');
  }

  handleRegister = async () => {
    const { size, behavior, care, nature, sex } = this.state;
    this.setState({ error: false });
    if ((!size || !behavior || !care || !nature || !sex)) {
      this.setState({ error: true });
      this.setState({ errorMessage: 'Preencha todos os campos!' });
    }
    else {
      this.setState({ error: false });
      this.setState({ loading: true });
      Firebase.auth().createUserWithEmailAndPassword(this.props.route.params.email, this.props.route.params.password)
        .then(infoUser => {
          return infoUser.user.updateProfile({ displayName: this.props.route.params.name }),
            this.addUser(
              this.props.route.params.name,
              this.props.route.params.doc,
              this.props.route.params.email,
              this.props.route.params.phone,
              this.props.route.params.description,
              this.props.route.params.picture,
              this.state.size,
              this.state.behavior,
              this.state.care,
              this.state.sex,
              infoUser.user.uid,
            )
        }
        )
        .catch((error) => {
          console.log('error :', error);
          if (error.message === 'The email address is already in use by another account.') this.setState({ error: true }, this.setState({ errorMessage: 'Este email já foi utilizado por outra conta!' }));
          else this.setState({ error: true }, () => this.setState({ errorMessage: error.message }));
        })
        .finally(() => {
          this.setState({ loading: false });
        })
    }
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
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ?
          (<S.FullScrollView>

            <S.HeaderView>
              <S.Header
                backButton={true}
                icon={true}
                onPress={() => this.props.navigation.goBack()}
              />
            </S.HeaderView>

            <S.LoginTitleText>
              Escolha Suas Preferências
          </S.LoginTitleText>

            <S.RegisterTextInputView>

              <S.InputTitleText>Porte</S.InputTitleText>
              <S.RegisterTextInput
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
                placeholder="Preferência de porte?"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.size}
                onValueChange={(size) => this.setState({ size })}
                headerBackButtonText='Voltar'
              >
                <S.RegisterTextInput.Item
                  label="Pequeno"
                  value='1'
                />
                <S.RegisterTextInput.Item
                  label="Médio"
                  value='2'
                />
                <S.RegisterTextInput.Item
                  label="Grande"
                  value='3'
                />
                <S.RegisterTextInput.Item
                  label="Não me importo"
                  value='0'
                />
              </S.RegisterTextInput>

              <S.InputTitleText>Comportamento</S.InputTitleText>
              <S.RegisterTextInput
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
                placeholder="Preferência de comportamento?"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.behavior}
                onValueChange={(behavior) => this.setState({ behavior })}
                headerBackButtonText='Voltar'
              >
                <S.RegisterTextInput.Item
                  label="Tímido"
                  value='1'
                />
                <S.RegisterTextInput.Item
                  label="Calmo"
                  value='2'
                />
                <S.RegisterTextInput.Item
                  label="Brincalhão"
                  value='3'
                />
                <S.RegisterTextInput.Item
                  label="Agitado"
                  value='4'
                />
                <S.RegisterTextInput.Item
                  label="Protetor"
                  value='5'
                />
                <S.RegisterTextInput.Item
                  label="Não me importo"
                  value='0'
                />
              </S.RegisterTextInput>

              <S.InputTitleText>Tempo disponível para o pet</S.InputTitleText>
              <S.RegisterTextInput
                iosHeader='Seu tempo disponível para o pet'
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
                <S.RegisterTextInput.Item
                  label="Pouco"
                  value='1'
                />
                <S.RegisterTextInput.Item
                  label="Médio"
                  value='2'
                />
                <S.RegisterTextInput.Item
                  label="Muito"
                  value='3'
                />
                <S.RegisterTextInput.Item
                  label="Não me importo"
                  value='0'
                />
              </S.RegisterTextInput>

              <S.InputTitleText>Sexo</S.InputTitleText>
              <S.RegisterTextInput
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
                <S.RegisterTextInput.Item
                  label="Masculino"
                  value='1'
                />
                <S.RegisterTextInput.Item
                  label="Feminino"
                  value='2'
                />
                <S.RegisterTextInput.Item
                  label="Não me importo"
                  value='0'
                />
              </S.RegisterTextInput>

              {this.state.error
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
              <S.RegisterText>Registrar</S.RegisterText>
            </S.RegisterTouchableOpacity>

          </S.FullScrollView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default PreferencesScreen;
