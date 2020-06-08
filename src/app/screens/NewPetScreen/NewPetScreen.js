import React from 'react';
import * as S from './NewPetScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Validation from '../../utils/Validations/validations';
import { CheckBox } from 'react-native-elements'
import { Icon } from 'native-base';

class NewPetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: [true, false, false],
      name: '',
      description: '',
      race: '',
      size: '',
      age: '',
      behavior: '',
      errorFields: { name: false, description: false, race: false, size: false, age: false, behavior: false },
      error: '',
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

  handleRegister = () => {
    const { name, description, race, size, age, behavior } = this.state;
    this.setState({ error: false });
    let result = Validation.AddPetValidation(name, description, race, size, age, behavior);
    if (result.validate !== true) {
      this.setState({ error: true });
      this.setState({ errorMessage: result.validate });
    }
    else {
      this.setState({ error: false });
      this.props.navigation.navigate('BottomTab');
    }
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
                marginRight: '-4%'
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
                marginRight: '-4%'
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
                marginRight: '-4%'
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
          <S.RegisterPicker
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
            placeholder="Raça do amigão"
            placeholderStyle={{ color: "#919191" }}
            selectedValue={this.state.race}
            onValueChange={(race) => this.setState({ race })}
          >
            <S.RegisterPicker.Item
              label="Raça 1"
              value='raça 1'
            />
            <S.RegisterPicker.Item
              label="Raça 2"
              value='raça 2'
            />
            <S.RegisterPicker.Item
              label="Raça 3"
              value='raça 3'
            />
            <S.RegisterPicker.Item
              label="Vira-Lata"
              value='mutt'
            />

          </S.RegisterPicker>

          <S.InputTitleText>Tamanho</S.InputTitleText>
          <S.RegisterPicker
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
            placeholder="Tamanho do amigão"
            placeholderStyle={{ color: "#919191" }}
            selectedValue={this.state.size}
            onValueChange={(size) => this.setState({ size })}
            headerBackButtonText='Voltar'
          >
            <S.RegisterPicker.Item
              label="Pequeno"
              value='small'
            />
            <S.RegisterPicker.Item
              label="Médio"
              value='medium'
            />
            <S.RegisterPicker.Item
              label="Grande"
              value='big'
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
              value='young'
            />
            <S.RegisterPicker.Item
              label="Adulto"
              value='adult'
            />
            <S.RegisterPicker.Item
              label="Velho"
              value='old'
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
            <S.RegisterPicker.Item
              label="Calmo"
              value='calm'
            />
            <S.RegisterPicker.Item
              label="Normal"
              value='normal'
            />
            <S.RegisterPicker.Item
              label="Agitado"
              value='agitated'
            />
          </S.RegisterPicker>

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

        </S.FullScrollView >)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default NewPetScreen;
