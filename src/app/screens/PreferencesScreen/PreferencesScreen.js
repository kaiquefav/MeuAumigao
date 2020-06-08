import React from 'react';
import * as S from './PreferencesScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Alert } from 'react-native';
import * as Font from 'expo-font';

class PreferencesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      race: '',
      size: '',
      age: '',
      behavior: '',
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
            Escolha Suas Preferências
          </S.LoginTitleText>

          <S.RegisterTextInputView>

            <S.InputTitleText>Raça</S.InputTitleText>
            <S.RegisterTextInput
              iosHeader='Raça?'
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
              placeholder="Preferência de raça?"
              placeholderStyle={{ color: "#919191" }}
              selectedValue={this.state.race}
              onValueChange={(race) => this.setState({ race })}
            >
              <S.RegisterTextInput.Item
                label="Raça 1"
                value='raça 1'
              />
              <S.RegisterTextInput.Item
                label="Raça 2"
                value='raça 2'
              />
              <S.RegisterTextInput.Item
                label="Raça 3"
                value='raça 3'
              />
              <S.RegisterTextInput.Item
                label="Vira-Lata"
                value='mutt'
              />
              <S.RegisterTextInput.Item
                label="Não me importo"
                value='none'
              />
            </S.RegisterTextInput>

            <S.InputTitleText>Tamanho</S.InputTitleText>
            <S.RegisterTextInput
              iosHeader='Tamanho?'
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
              placeholder="Preferência de tamanho?"
              placeholderStyle={{ color: "#919191" }}
              selectedValue={this.state.size}
              onValueChange={(size) => this.setState({ size })}
              headerBackButtonText='Voltar'
            >
              <S.RegisterTextInput.Item
                label="Pequeno"
                value='small'
              />
              <S.RegisterTextInput.Item
                label="Médio"
                value='medium'
              />
              <S.RegisterTextInput.Item
                label="Grande"
                value='big'
              />
              <S.RegisterTextInput.Item
                label="Não me importo"
                value='none'
              />
            </S.RegisterTextInput>

            <S.InputTitleText>Idade</S.InputTitleText>
            <S.RegisterTextInput
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
              placeholder="Preferência de idade?"
              placeholderStyle={{ color: "#919191" }}
              selectedValue={this.state.age}
              onValueChange={(age) => this.setState({ age })}
              headerBackButtonText='Voltar'
            >
              <S.RegisterTextInput.Item
                label="Novo"
                value='young'
              />
              <S.RegisterTextInput.Item
                label="Adulto"
                value='adult'
              />
              <S.RegisterTextInput.Item
                label="Velho"
                value='old'
              />
              <S.RegisterTextInput.Item
                label="Não me importo"
                value='none'
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
                label="Calmo"
                value='calm'
              />
              <S.RegisterTextInput.Item
                label="Normal"
                value='normal'
              />
              <S.RegisterTextInput.Item
                label="Agitado"
                value='agitated'
              />
              <S.RegisterTextInput.Item
                label="Não me importo"
                value='none'
              />
            </S.RegisterTextInput>

          </S.RegisterTextInputView>

          <S.RegisterTouchableOpacity onPress={() => {
            Alert.alert('Cadastro', 'Cadastro com sucesso!');
            this.props.navigation.navigate('BottomTab');
          }}>
            <S.RegisterText>Registrar</S.RegisterText>
          </S.RegisterTouchableOpacity>

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PreferencesScreen;
