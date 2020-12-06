import React from 'react';
import * as S from './PreferencesProfileScreen.style';
import { ActivityIndicator, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

class PreferencesProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '0',
      behavior: '0',
      care: '0',
      sex: '0',
      fontLoaded: false,
      userID: '',
      userData: {},
      newData: {},
    };
  }

  getUserID = () => {
    const uid = firebase.auth().currentUser.uid
    this.setState({ userID: uid });
  }

  getUserData = async () => {
    await this.getUserID();
    firebase.database().ref(`users/${this.state.userID}/preferences`).once('value',
      (snapshot) => {
        this.setState({ userData: snapshot.val() });
        this.setState({ newData: snapshot.val() });
      });
  }

  handleUpdate = async () => {
    const { newData, userID } = this.state;
    await firebase.database().ref(`users/${userID}/preferences`)
      .update({
        size: newData.size,
        behavior: newData.behavior,
        care: newData.care,
        sex: newData.sex
      }, (err) => {
        if (err) Alert.alert('Preferências', 'Erro ao atualizar suas preferências!')
        if (!err) {
          Alert.alert('Preferências', 'Preferências atualizadas com sucesso!');
          this.props.navigation.goBack();
        }
      });
  }

  async componentDidMount() {
    await this.getUserData();
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    this.setState({ fontLoaded: true });
  }

  render() {
    const { newData } = this.state;
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {(this.state.fontLoaded && newData) ?
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
                selectedValue={this.state.newData.size}
                headerBackButtonText='Voltar'
                onValueChange={(size) => {
                  const aux = this.state.newData;
                  aux.size = size;
                  this.setState({ newData: aux });
                }}
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
                selectedValue={this.state.newData.behavior}
                onValueChange={(behavior) => {
                  const aux = this.state.newData;
                  aux.behavior = behavior;
                  this.setState({ newData: aux });
                }}
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
                selectedValue={this.state.newData.care}
                onValueChange={(care) => {
                  const aux = this.state.newData;
                  aux.care = care;
                  this.setState({ newData: aux });
                }}
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
                selectedValue={this.state.newData.sex}
                headerBackButtonText='Voltar'
                onValueChange={(sex) => {
                  const aux = this.state.newData;
                  aux.sex = sex;
                  this.setState({ newData: aux });
                }}
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

            </S.RegisterTextInputView>

            <S.RegisterTouchableOpacity onPress={() => this.handleUpdate()}>
              <S.RegisterText>Atualizar</S.RegisterText>
            </S.RegisterTouchableOpacity>
          </S.FullScrollView >)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default PreferencesProfileScreen;
