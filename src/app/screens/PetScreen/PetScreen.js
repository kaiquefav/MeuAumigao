import React from 'react';
import * as S from './PetScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

class PetScreen extends React.Component {
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
    console.log(this.props);
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

          <S.PetImage
            source={{ uri: this.props.route.params.pet.petPic }}
            resizeMode='cover'
          />

          <S.LoginTitleText>
            {this.props.route.params.pet.name}
          </S.LoginTitleText>

          <S.TextView>
            <S.LoginSubTitleText>Descrição:</S.LoginSubTitleText>
            <S.LoginSubText>
              {this.props.route.params.pet.description}
            </S.LoginSubText>
          </S.TextView>

          <S.TextView>
            <S.LoginSubTitleText>Local:</S.LoginSubTitleText>
            <S.LoginSubText>
              {this.props.route.params.pet.localTitle}
            </S.LoginSubText>
            <S.LoginSubText>
              {`${this.props.route.params.pet.localStreet},\n${this.props.route.params.pet.localDistrict}, nº ${this.props.route.params.pet.localNum}`}
            </S.LoginSubText>
          </S.TextView>

          <S.TextView>
            <S.LoginSubTitleText>Raça:</S.LoginSubTitleText>
            <S.LoginSubText>
              {this.props.route.params.pet.race}
            </S.LoginSubText>
          </S.TextView>

          <S.TextView>
            <S.LoginSubTitleText>Tamanho:</S.LoginSubTitleText>
            <S.LoginSubText>
              {this.props.route.params.pet.size}
            </S.LoginSubText>
          </S.TextView>

          <S.TextView>
            <S.LoginSubTitleText>Idade:</S.LoginSubTitleText>
            <S.LoginSubText>
              {this.props.route.params.pet.age}
            </S.LoginSubText>
          </S.TextView>

          <S.TextView>
            <S.LoginSubTitleText>Comportamento:</S.LoginSubTitleText>
            <S.LoginSubText>
              {this.props.route.params.pet.behavior}
            </S.LoginSubText>
          </S.TextView>

          {this.props.route.params.userType === 0
            ? (<S.RegisterTouchableOpacity
              onPress={() => this.props.navigation.navigate('PetsSchedule', { pet: this.props.route.params.pet })}
            >
              <S.RegisterText>{`Visualizar Solicitações de Visita para ${this.props.route.params.pet.name}`}</S.RegisterText>
            </S.RegisterTouchableOpacity>)
            : (<S.RegisterTouchableOpacity>
              <S.RegisterText>Agendar Visita</S.RegisterText>
            </S.RegisterTouchableOpacity>)
          }


        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetScreen;
