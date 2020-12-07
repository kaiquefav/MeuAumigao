import React from 'react';
import * as S from './OtherPetsScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import * as Font from 'expo-font';
import * as Pets from '../../mocky/mockData';
import * as firebase from 'firebase';
import DogsPicker from './DogsList';
import CatsPicker from './CatsList';

class OtherPetsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      recommendedPets: [],
      filteredPets: [],
      allPets: [],
      race: '',
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
    this.setState({
      allPets: params.pets,
      filteredPets: params.pets,
    });
    if (params.animalType === 0) {
      params.pets.forEach((element, index) => {
        params.recommendedPets.forEach((item) => {
          if (element.id === item[0]) {
            if (item[2] === true) {
              auxPets[index].isRecommended = true;
            }
          }
        })
      });
    }
    this.setState({
      recommendedPets: auxPets,
    });
    this.setState({ fontLoaded: true });
  }

  filterByRace(race) {
    console.log('race :', race);
    const { allPets, filteredPets } = this.state;
    const { params } = this.props.route;
    if (race !== 'Cancelar') {
      let auxFilteredPets = [];
      this.setState({ filteredPets: [] }, () => {
        if (race === 'Todos') {
          auxFilteredPets = params.pets;
        }
        allPets.forEach((element) => {
          if (element.data.race === race) {
            auxFilteredPets.push(element);
          }
        });
        this.setState({ filteredPets: auxFilteredPets });
      });
    }
  }

  render() {
    const { filteredPets, allPets } = this.state;
    const { animalType } = this.props.route.params;
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
              {animalType === 0 && (
                <>
                  <Icon
                    type="Fontisto"
                    name="filter"
                    style={{
                      fontSize: 20,
                      color: 'rgb(81, 81, 81)',
                      paddingLeft: 10,
                      paddingTop: 40,
                      position: 'absolute',
                      right: 0,
                    }}
                  />
                  <DogsPicker onValueChange={(race) => this.filterByRace(race)} />
                </>)}
              {animalType === 1 && (
                <>
                  <Icon
                    type="Fontisto"
                    name="filter"
                    style={{
                      fontSize: 20,
                      color: 'rgb(81, 81, 81)',
                      paddingLeft: 10,
                      paddingTop: 40,
                      position: 'absolute',
                      right: 0,
                    }}
                  />
                  <CatsPicker onValueChange={(race) => this.filterByRace(race)} />
                </>)}
            </S.HeaderView>

            {this.props.route.params.userType === 0 && filteredPets.length > 0 && <S.LoginTitleText>Seus amigões cadastrados!</S.LoginTitleText>}
            {this.props.route.params.userType === 0 && filteredPets.length === 0 && <S.LoginTitleText>Não encontramos nenhum amigão na busca!</S.LoginTitleText>}
            {this.props.route.params.userType === 1 && filteredPets.length > 0 && <S.LoginTitleText>Amigões para você!</S.LoginTitleText>}
            {this.props.route.params.userType === 1 && filteredPets.length === 0 && <S.LoginTitleText>Não encontramos nenhum amigão na busca!</S.LoginTitleText>}

            <S.CardsFullView>
              {filteredPets.map((element, index) => (
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
