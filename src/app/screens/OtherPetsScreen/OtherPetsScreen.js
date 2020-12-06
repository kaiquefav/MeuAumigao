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
      fontLoaded: false,
      recommendedPets: [],
    };
  }


  async componentDidMount() {
    const { params } = this.props.route
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    let auxPets = params.pets;
    params.pets.forEach((element, index) => {
      params.recommendedPets.forEach((item) => {
        if (element.id === item[0]) {
          if (item[2] === true) {
            auxPets[index].isRecommended = true;
          }
        }
      })
    });
    this.setState({ recommendedPets: auxPets });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { recommendedPets } = this.state;
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ?
          (<S.FullScrollView>

            <S.HeaderView>
              <S.Header
                backButton={true}
                icon={true}
                onPress={() => this.props.navigation.replace('BottomTab')}
              />
            </S.HeaderView>

            {this.props.route.params.userType === 0
              ? (<S.LoginTitleText>Seus amigões cadastrados!</S.LoginTitleText>)
              : (<S.LoginTitleText>Amigões para você!</S.LoginTitleText>)}

            <S.CardsFullView>
              {this.props.route.params.pets.map((element, index) => (
                <S.PetsCardsView>
                  <S.ContainerTouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.props.navigation.navigate('Pet', { route: this.props, pet: element, userType: this.props.route.params.userType, userData: this.props.route.params.userData, userID: this.props.route.params.userID, animalType: this.props.route.params.animalType })}
                    isRecommended={element.isRecommended}
                  >
                    {element.isRecommended && (
                      <S.RecommendedFlagImage
                        source={require('../../assets/png/ic_recommendedFlag.png')}
                        resizeMode='cover'
                      />
                    )}
                    <S.PetImage
                      source={{ uri: `data:image/jpg;base64,${element.data.petPic}` }}
                      resizeMode='cover'
                    />

                    <S.PetNameText>{element.data.name}</S.PetNameText>

                  </S.ContainerTouchableOpacity>
                </S.PetsCardsView>
              ))}
            </S.CardsFullView>

          </S.FullScrollView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default OtherPetsScreen;
