import React from 'react';
import * as S from './HomeScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, View, Button, BackHandler } from 'react-native';
import { Icon } from 'native-base';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

import * as Euclidean from '../../utils/euclidean';
import * as Manhattan from '../../utils/manhnattan';
import * as Cosine from '../../utils/cosine';

import * as Pets from '../../mocky/mockData';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userID: '',
      userData: {},
      usersPreferences: [],
      ongPets: [],
      allUserPets: [],
      userPets: [],
      recomendations: [],
      recomendationsDogs: [],
      recomendationsCats: [],
    };
  }

  getUserData = async () => {
    await this.getUserID();
    await firebase.database().ref(`users/${this.state.userID}`).once('value',
      (snapshot) => {
        this.setState({ userData: snapshot.val() });
      });
  }

  verifySimResults = (results) => {
    const aux1 = [];
    const aux2 = [];
    const result = [];
    results.forEach((item, index) => {
      if (index === 0) {
        item.forEach((element, i) => {
          if (i < 5) {
            aux1.push(element);
          }
        })
      }
      if (index === 1) {
        item.forEach((element, i) => {
          if (i < 5) {
            aux2.push(element);
          }
        })
      }
    })
    aux1.forEach((item) => {
      aux2.forEach((element) => {
        if (element[1] === item[1]) result.push(item);
      })
    })
    return result.sort(Euclidean.sortFunction).reverse();
  }

  handlePreferences = async () => {
    const { userID, userData, usersPreferences, recomendations } = this.state;
    let auxResult = [];
    let result = [];
    let preferences = [];
    let aux;
    let aux2;
    let aux3;
    let auxCats = [];
    let auxDogs = [];
    await firebase.database().ref(`users/`).once('value',
      (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.hasChild('preferences')) {
            if (childSnapshot.hasChild('pastAdoptions/pastDogsAdoptions') || childSnapshot.hasChild('pastAdoptions/pastCatsAdoptions')) {
              if (childSnapshot.key !== userID) {
                preferences.push({ id: childSnapshot.key, preferences: childSnapshot.child('preferences').val() });
              }
            }
          }
        });
      });

    this.setState({ usersPreferences: preferences });

    const resultEuclidean = Euclidean.calculateSimilarity(userData.preferences, preferences);
    const resultManhattan = Manhattan.calculateSimilarity(userData.preferences, preferences);
    auxResult.push(resultEuclidean);
    auxResult.push(resultManhattan);
    result.push(this.verifySimResults(auxResult));

    if (result[0][0]) await firebase.database().ref(`users/${result[0][0][1]}`).once('value',
      (snapshot) => {
        aux = snapshot.val();
      });
    if (result[0][1]) await firebase.database().ref(`users/${result[0][1][1]}`).once('value',
      (snapshot) => {
        aux2 = snapshot.val();
      });
    if (result[0][2]) await firebase.database().ref(`users/${result[0][2][1]}`).once('value',
      (snapshot) => {
        aux3 = snapshot.val();
      });

    if (aux) {
      auxDogs = auxDogs.concat(aux.pastAdoptions.pastDogsAdoptions);
      auxCats = auxCats.concat(aux.pastCatsAdoptions);
    }
    if (aux2) {
      auxDogs = auxDogs.concat(aux2.pastAdoptions.pastDogsAdoptions);
      auxCats = auxCats.concat(aux2.pastCatsAdoptions);
    }
    if (aux3) {
      auxDogs = auxDogs.concat(aux3.pastAdoptions.pastDogsAdoptions);
      auxCats = auxCats.concat(aux3.pastCatsAdoptions);
    }
    auxDogs = auxDogs.filter((a, b) => auxDogs.indexOf(a) === b);
    auxCats = auxCats.filter((a, b) => auxDogs.indexOf(a) === b);

    this.setState({ recomendationsDogs: auxDogs });
    this.setState({ recomendationsCats: auxCats });
  }

  setPets = async () => {
    const { recomendations, recomendationsDogs, recomendationsCats } = this.state;
    let dogsAux = [];
    let catsAux = [];
    let othersAux = [];
    let allDogsAux = [];
    let allCatsAux = [];
    let allOthersAux = [];
    let allRecomendatedAux = [];
    let allAux = [];

    let ongDogsAux = [];
    let ongCatsAux = [];
    let ongOthersAux = [];
    let ongAllAux = [];

    if (this.state.userData.userType === 0) {
      await firebase.database().ref(`users/${this.state.userID}/animals/dogs`).once('value',
        (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            ongDogsAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
          });
        });
      await firebase.database().ref(`users/${this.state.userID}/animals/cats`).once('value',
        (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            ongCatsAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
          });
        });
      await firebase.database().ref(`users/${this.state.userID}/animals/others`).once('value',
        (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            ongOthersAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
          });
        });
      ongAllAux.push(ongDogsAux);
      ongAllAux.push(ongCatsAux);
      ongAllAux.push(ongOthersAux);
      this.setState({ ongPets: ongAllAux });
    }
    else {
      await firebase.database().ref(`animals/dogs`).once('value',
        (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.hasChild('race')) {
              if (recomendationsDogs.includes(childSnapshot.val().race)) dogsAux.push({ id: childSnapshot.key, data: childSnapshot.val(), isRecommended: true });
              allDogsAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
            }
          });
        });
      let alreadyExists = false;
      allDogsAux.forEach((element) => {
        alreadyExists = false;
        dogsAux.forEach((item) => {
          if (element.id === item.id) alreadyExists = true;
        })
        if (!alreadyExists) dogsAux.push(element);
      });
      await firebase.database().ref(`animals/cats`).once('value',
        (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.hasChild('race')) {
              if (recomendationsCats.includes(childSnapshot.val().race)) catsAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
              allCatsAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
            }
          });
        });
      if (catsAux.length === 0) catsAux = allCatsAux;
      await firebase.database().ref(`animals/others`).once('value',
        (snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.hasChild('race')) {
              othersAux.push({ id: childSnapshot.key, data: childSnapshot.val() });
            }
          });
        });

      allRecomendatedAux.push(dogsAux);
      allRecomendatedAux.push(catsAux);
      allRecomendatedAux.push(othersAux);
      allAux.push(allDogsAux);
      allAux.push(catsAux);
      allAux.push(othersAux);
      this.setState({ userPets: allRecomendatedAux });
      this.setState({ allUserPets: allAux });
    }
  }

  getUserID = async () => {
    const uid = firebase.auth().currentUser.uid;
    this.setState({ userID: uid });
  }

  async componentDidMount() {
    const { usersPreferences, userData } = this.state;
    await this.getUserData();
    if (this.state.userData.userType === 1) await this.handlePreferences();
    await this.setPets();
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    BackHandler.addEventListener('hardwareBackPress', () => true);
    // await this.createUser();
    this.setState({ fontLoaded: true });
  }

  handleNewPet = () => {
    const { userID } = this.state;
    this.props.navigation.replace('NewPet', { userID, userName: this.state.userData.name });
  }

  scrollToItem = () => {
    this.fullScrollView.scrollTo({ x: 1, y: Window.winHeight * 0.15, animated: true });
  }

  render() {
    const { userPets, userData, usersPreferences, ongPets, recomendations } = this.state;
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ?
          (
            <S.FullView ref={(ref) => { this.fullScrollView = ref; }}>
              {this.state.userData.userType === 0
                ? (< S.AddPetTouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.handleNewPet()}>
                  <S.AddPetText>+</S.AddPetText>
                </S.AddPetTouchableOpacity>)
                : null}

              <S.LogoutTouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  firebase.auth().signOut().then(
                    () => {
                      this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    });
                }}>
                <Icon
                  type="Octicons"
                  name="sign-out"
                  style={{
                    fontSize: 25,
                    color: 'black',
                    marginTop: '4%',
                    alignSelf: 'center',
                  }}
                />
                <S.AddPetText style={{ fontSize: 15 }}>Sair</S.AddPetText>
              </S.LogoutTouchableOpacity>

              <S.Header
                backButton={false}
                icon={true}
              />

              {
                this.state.userData.userType === 0
                  ? (<View >
                    <S.LoginTitleText>Seus amigões cadastrados!</S.LoginTitleText>

                    <View style={{ justifyContent: 'center' }}>
                      <S.PetButtonView>
                        <S.PetButton
                          userType={this.state.userData.userType}
                          allPets={this.state.ongPets}
                          recomendedPets={null}
                          routes={this.props}
                          scrollTo={(item) => this.scrollToItem(item)}
                          userData={this.state.userData}
                        />
                      </S.PetButtonView>
                    </View>

                  </View>
                  )
                  : (<View>
                    <S.LoginTitleText>Amigões para você!</S.LoginTitleText>

                    <S.PetButtonView>
                      <S.PetButton
                        userType={this.state.userData.userType}
                        allPets={this.state.allUserPets}
                        recomendedPets={this.state.userPets}
                        routes={this.props}
                        scrollTo={(item) => this.scrollToItem(item)}
                        userID={this.state.userID}
                        userData={this.state.userData}
                      />
                    </S.PetButtonView>
                  </View>
                  )
              }
            </S.FullView >
          )
          : (<ActivityIndicator style={{ flex: 1 }} size='small' color='rgb(0, 104, 191)' />)}
      </>
    );
  }



  async createUser() {
    firebase.database().ref('users/' + 'user_google_forms_60').set({
      name: 'Google Forms User',
      doc: '11111111111',
      email: 'ricardofalsin@gmail.com',
      phone: '99999999999',
      description: 'User based on google forms.',
      userType: 1,
      preferences: {
        sex: '1',
        size: '2',
        care: '2',
        behavior: '2',
      },
      pastAdoptions: {
        pastDogsAdoptions: [
          'Boxer', 'Labrador',
        ],
      }
    });
  }



}

export default HomeScreen;
