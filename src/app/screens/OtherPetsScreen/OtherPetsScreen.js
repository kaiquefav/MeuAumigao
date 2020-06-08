import React from 'react';
import * as S from './OtherPetsScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Pets from '../../mocky/mockData';

class OtherPetsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 1,
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

          {this.state.userType === 0
            ? (<S.LoginTitleText>Seus amigões cadastrados!</S.LoginTitleText>)
            : (<S.LoginTitleText>Amigões para você!</S.LoginTitleText>)}

          <S.CardsFullView>
            {Pets.pets.map((element, index) => (element.type === this.props.route.params.animalType) && (
              <S.PetsCardsView>
                <S.ContainerTouchableOpacity activeOpacity={0.5}>

                  <S.PetImage
                    source={{ uri: element.petPic }}
                    resizeMode='cover'
                  />

                  <S.PetNameText>{element.name}</S.PetNameText>

                </S.ContainerTouchableOpacity>
              </S.PetsCardsView>
            ))}
          </S.CardsFullView>

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default OtherPetsScreen;
