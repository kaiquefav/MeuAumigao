import React from 'react';
import { Icon } from 'native-base';
import * as S from './ScheduleScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Platform, Alert, View, Linking } from 'react-native';
import * as Font from 'expo-font';
import { ActionSheet } from "native-base";
import { AirbnbRating } from 'react-native-elements';
import * as firebase from 'firebase';
import moment from 'moment';

import * as Pets from '../../mocky/mockData';

var BUTTONS = ["Aprovar", "Recusar", "Cancelar"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userData: {},
      userType: '',
      pets: [],
      status: [],
      clicked: '',
      userRating: '',
      ratingPlaceholder: '',
      isVisible: false,
      userName: '',
      userID: '',
      singleUserData: {},
      singleMeetingData: {},
      singleUserID: '',
      singlePetName: '',
      commitments: [],
      ratings: [],
      rating: '',
      ongPhone: '',
    };
  }

  petGotHome = async () => {
    const { singleMeetingData } = this.state;
    let pastAdoptions = [];
    let otherAnimalMeetings = [];
    await this.handleRemoveMeetings();

    //APAGANDO TODAS OUTROS MEETINGS COM O ANIMAL
    if (singleMeetingData.data.petData.petType === 0) {
      //PEGAR OUTROS MEETINGS DO ANIMAL
      await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/dogs/' + singleMeetingData.data.petID + '/meetings').once('value',
        (snapshot) => {
          snapshot.forEach((element) => {
            if (element.key !== singleMeetingData.id) {
              otherAnimalMeetings.push(element.key);
            }
          });
        });
    }
    if (singleMeetingData.data.petData.petType === 1) {
      //PEGAR OUTROS MEETINGS DO ANIMAL
      await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/cats/' + singleMeetingData.data.petID + '/meetings').once('value',
        (snapshot) => {
          snapshot.forEach((element) => {
            if (element.key !== singleMeetingData.id) {
              otherAnimalMeetings.push(element.key);
            }
          });
        });
    }
    if (singleMeetingData.data.petData.petType === 2) {
      //PEGAR OUTROS MEETINGS DO ANIMAL
      await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/others/' + singleMeetingData.data.petID + '/meetings').once('value',
        (snapshot) => {
          snapshot.forEach((element) => {
            if (element.key !== singleMeetingData.id) {
              otherAnimalMeetings.push(element.key);
            }
          });
        });
    }
    //APAGAR ESSAS MEETINGS NOS USUARIOS
    await firebase.database().ref(`users/`).once('value',
      (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.hasChild('meetings')) {
            Object.entries(childSnapshot.child('meetings').val()).forEach((item) => {
              otherAnimalMeetings.forEach((animal) => {
                if (animal === item[0]) {
                  firebase.database().ref('users/' + childSnapshot.key + '/meetings/' + item[0]).remove();
                }
              })
            })
          }
        });
      });

    //REMOVENDO ANIMAL DO MEETINGS
    otherAnimalMeetings.forEach(async (element) => {
      await firebase.database().ref('meetings/' + element).remove();
    });

    //APAGANDO ANIMAL
    if (singleMeetingData.data.petData.petType === 0) await firebase.database().ref('animals/dogs/' + singleMeetingData.data.petID).remove();
    if (singleMeetingData.data.petData.petType === 1) await firebase.database().ref('animals/cats/' + singleMeetingData.data.petID).remove();
    if (singleMeetingData.data.petData.petType === 2) await firebase.database().ref('animals/others/' + singleMeetingData.data.petID).remove();

    //APAGANDO DO ANIMAL DENTRO DA ONG
    if (singleMeetingData.data.petData.petType === 0) await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/dogs/' + singleMeetingData.data.petID).remove();
    if (singleMeetingData.data.petData.petType === 1) await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/cats/' + singleMeetingData.data.petID).remove();
    if (singleMeetingData.data.petData.petType === 2) await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/others/' + singleMeetingData.data.petID).remove();

    //ADICIONANDO PASTADOPTION NO USUARIO
    if (singleMeetingData.data.petData.petType === 0) {
      await firebase.database().ref(`users/${singleMeetingData.data.userID}`).once('value',
        (snapshot) => {
          if (snapshot.hasChild('pastDogsAdoptions')) {
            pastAdoptions = snapshot.child('pastDogsAdoptions').val();
          }
        });
      pastAdoptions.push(singleMeetingData.data.petData.race);
      await firebase.database().ref('users/' + singleMeetingData.data.userID).update({
        pastDogsAdoptions: pastAdoptions,
      });
    }
    if (singleMeetingData.data.petData.petType === 1) {
      await firebase.database().ref(`users/${singleMeetingData.data.userID}`).once('value',
        (snapshot) => {
          if (snapshot.hasChild('pastCatsAdoptions')) {
            pastAdoptions = snapshot.child('pastCatsAdoptions').val();
          }
        });
      pastAdoptions.push(singleMeetingData.data.petData.race);
      await firebase.database().ref('users/' + singleMeetingData.data.userID).update({
        pastCatsAdoptions: pastAdoptions,
      });
    }
    if (singleMeetingData.data.petData.petType === 2) {
      await firebase.database().ref(`users/${singleMeetingData.data.userID}`).once('value',
        (snapshot) => {
          if (snapshot.hasChild('pastOthersAdoptions')) {
            pastAdoptions = snapshot.child('pastOthersAdoptions').val();
          }
        });
      pastAdoptions.push(singleMeetingData.data.petData.race);
      await firebase.database().ref('users/' + singleMeetingData.data.userID).update({
        pastOthersAdoptions: pastAdoptions,
      });
    }
    this.props.navigation.replace('BottomTab');

  }

  petDoesntGotHome = async () => {
    await this.handleRemoveMeetings();
    this.props.navigation.replace('BottomTab');
  }

  getUserData = async () => {
    await this.getUserID();
    await firebase.database().ref(`users/${this.state.userID}`).once('value',
      (snapshot) => {
        this.setState({ userData: snapshot.val() });
      });
  }

  getUserMeetings = async () => {
    const aux = Object.entries(this.state.userData.meetings);
    let ratings = [];
    let auxCommitments = [];
    await aux.forEach(async (element) => {
      await firebase.database().ref(`meetings/${element[0]}`).once('value',
        (snapshot) => {
          const data = { id: element[0], data: snapshot.val() }
          auxCommitments.push(data);
          this.setState({ commitments: auxCommitments }, () => this.setStatus());
        });
      await auxCommitments.forEach(async (item, index) => {
        await firebase.database().ref(`users/${item.data.userID}`).once('value',
          (snapshot) => {
            ratings[index] = snapshot.val().rating;
          });
        await this.setState({ ratings: ratings });
      })
    });
  }

  getUserID = () => {
    var uid = firebase.auth().currentUser.uid;
    this.setState({ userID: uid });
  }

  setStatus = async () => {
    if (this.state.userData.userType === 0) {
      let aux = [];
      this.state.commitments.map((element) => {
        aux.push(element.data.status);
      })
      this.setState({ status: aux });
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    await this.getUserData();
    try {
      await this.getUserMeetings();
    } catch (err) {
      console.log('erro: ', err);
    } finally {
      this.setState({ fontLoaded: true });
    }
  }

  showOptions = async (solicitationIndex, userName, meetingID, index) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: `Solicitação de ${userName}`
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] }, async () => {
          if (this.state.clicked === 'Recusar') {
            await firebase.database().ref('meetings/' + meetingID).update({
              status: 'refused',
            });
            let aux = this.state.status;
            aux[index] = 'refused';
            this.setState({ status: aux });
            this.handleRemoveMeetings();
            this.props.navigation.replace('BottomTab');
          }

          if (this.state.clicked === 'Aprovar') {
            await firebase.database().ref('meetings/' + meetingID).update({
              status: 'approved',
            });
            let aux = this.state.status;
            aux[index] = 'approved';
            this.setState({ status: aux });
          }
        });
      }
    )
  }

  modalComponent = () => (
    <>
      <S.ScheduleModal isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
      >
        <S.ModalView>

          <S.ModalText style={{ marginBottom: Window.winHeight * 0.03, fontSize: Platform.OS === 'ios' ? 20 : 16 }}>Como foi sua entrevista com {this.state.userName}?</S.ModalText>

          <AirbnbRating
            count={10}
            defaultRating={this.state.ratingPlaceholder}
            size={16}
            starStyle={{ backgroundColor: 'transparent', marginRight: '1%' }}
            showRating={false}
            onFinishRating={(value) => this.ratingCompleted(value)}
          />

          <S.ModalTouchableOpacityView>

            {this.state.userRating
              ? (
                <S.ModalTouchableOpacity onPress={async () => {
                  if (this.state.userRating > 5) {
                    if (this.state.singleUserData.rating < 10) {
                      await firebase.database().ref('users/' + this.state.singleUserID).update({
                        rating: Math.round(this.state.singleUserData.rating + 1),
                      });
                    }
                  }
                  else {
                    if (this.state.singleUserData.rating >= 1) {
                      await firebase.database().ref('users/' + this.state.singleUserID).update({
                        rating: Math.round(this.state.singleUserData.rating - 1),
                      });
                    }
                  }
                  Alert.alert(
                    'Avaliado(a) com sucesso!',
                    `${this.state.singlePetName} obteve um lar?`,
                    [{
                      text: "Sim", onPress: async () => {
                        this.setState({ isVisible: !this.state.isVisible });
                        await this.petGotHome();
                      }
                    }, {
                      text: "Não", onPress: async () => {
                        this.setState({ isVisible: !this.state.isVisible });
                        await this.petDoesntGotHome();
                      }
                    },
                    ],
                    { cancelable: false }
                  )
                }}>
                  <S.ModalText style={{ color: '#FFF' }}>Confirmar</S.ModalText>
                </S.ModalTouchableOpacity>
              )
              : (
                <S.ModalTouchableOpacity onPress={() => Alert.alert(
                  'Avaliação',
                  'Preencha o campo de avaliação!',
                  [{ text: "Ok!" }
                  ],
                  { cancelable: false }
                )}>
                  <S.ModalText style={{ color: '#FFF' }}>Confirmar</S.ModalText>
                </S.ModalTouchableOpacity>
              )
            }

            <S.ModalTouchableOpacity onPress={() => this.setState({ isVisible: !this.state.isVisible })}>
              <S.ModalText style={{ color: '#FFF' }}>Cancelar</S.ModalText>
            </S.ModalTouchableOpacity>

          </S.ModalTouchableOpacityView>
        </S.ModalView>
      </S.ScheduleModal>
    </>
  )

  toggleModal = (user, userID, userData, status, meetingInfo) => {
    this.setState({ singleMeetingData: meetingInfo });
    if (status === 'approved') {
      this.setState({ userName: user });
      this.setState({ singlePetName: meetingInfo.data.petData.name });
      this.setState({ singleUserID: userID });
      this.setState({ singleUserData: userData });
      this.setState({ ratingPlaceholder: '' });
      this.setState({ userRating: '' });
      this.setState({ isVisible: !this.state.isVisible });
    }
  }

  ratingCompleted = async (rating) => {
    // console.log('rating :', rating);
    this.setState({ userRating: rating });
  }

  getFirstWord = (name) => {
    return name.replace(/ .*/, '');
  }

  getSingleUserData = async (userID) => {
    let result = {};
    await firebase.database().ref(`users/${userID}`).once('value',
      (snapshot) => {
        result = snapshot.val();
      });
    return result;
  }

  handleRemoveMeetings = async () => {
    const { singleMeetingData } = this.state;
    // console.log('singleMeetingData :', singleMeetingData);

    //APAGANDO DO MEETINGS
    await firebase.database().ref('meetings/' + singleMeetingData.id).remove();
    //APAGANDO DO ANIMAL
    if (singleMeetingData.data.petData.petType === 0) await firebase.database().ref('animals/dogs/' + singleMeetingData.data.petID + '/meetings/' + singleMeetingData.id).remove();
    if (singleMeetingData.data.petData.petType === 1) await firebase.database().ref('animals/cats/' + singleMeetingData.data.petID + '/meetings/' + singleMeetingData.id).remove();
    if (singleMeetingData.data.petData.petType === 2) await firebase.database().ref('animals/others/' + singleMeetingData.data.petID + '/meetings/' + singleMeetingData.id).remove();
    //APAGANDO ONG
    await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/meetings/' + singleMeetingData.id).remove();
    //APAGANDO USER
    await firebase.database().ref('users/' + singleMeetingData.data.userID + '/meetings/' + singleMeetingData.id).remove();
    //APAGANDO DO ANIMAL DENTRO DA ONG
    if (singleMeetingData.data.petData.petType === 0) {
      await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/dogs/' + singleMeetingData.data.petID + '/meetings/' + singleMeetingData.id).remove();
    }
    if (singleMeetingData.data.petData.petType === 1) {
      await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/cats/' + singleMeetingData.data.petID + '/meetings/' + singleMeetingData.id).remove();
    }
    if (singleMeetingData.data.petData.petType === 2) {
      await firebase.database().ref('users/' + singleMeetingData.data.ongID + '/animals/others/' + singleMeetingData.data.petID + '/meetings/' + singleMeetingData.id).remove();
    }
  }

  callOnWhatsApp(text, phone) {
    Linking.canOpenURL(`whatsapp://send?text=${text}`).then(supported => {
      if (supported) {
        return Linking.openURL(
          `whatsapp://send?phone=55${phone}&text=${text}`
        );
      } else {
        return Linking.openURL(
          `https://api.whatsapp.com/send?phone=55${phone}&text=${text}`
        );
      }
    })
  }

  render() {
    return (
      <>
        <S.BackgroundImage source={require('../../assets/png/pageBG.png')} />
        {this.state.fontLoaded ?
          (<S.FullScrollView>

            <S.HeaderView>
              <S.Header
                backButton={false}
                icon={true}
                onPress={() => this.props.navigation.goBack()}
              />
            </S.HeaderView>

            {this.modalComponent()}
            {this.state.commitments.length > 0
              ? (
                <>
                  <S.LoginTitleText>
                    Sua agenda:
              </S.LoginTitleText>
                  {this.state.userData.userType === 0
                    ? (this.state.commitments.map((element, index) => {
                      return (
                        <S.PetsCardsView>

                          <S.ContainerTouchableOpacity
                            onPress={this.state.status[index] !== 'pending'
                              ? async () => this.toggleModal(this.getFirstWord(element.data.userData.name), element.data.userID, await this.getSingleUserData(element.data.userID), this.state.status[index], element)
                              : async () => {
                                this.setState({ singleMeetingData: element });
                                this.showOptions(index, this.getFirstWord(element.data.userData.name), element.id, index);
                              }}
                            activeOpacity={0.5}
                          >

                            <S.PetImage
                              source={{ uri: `data:image/jpg;base64,${element.data.petData.petPic}` }}
                              resizeMode='cover'
                            />

                            <S.UserImage
                              source={{ uri: `data:image/jpg;base64,${element.data.userData.picture}` }}
                              resizeMode='cover'
                            />

                            <Icon
                              type="MaterialCommunityIcons"
                              name="heart"
                              style={{
                                position: 'absolute',
                                fontSize: 22,
                                color: this.state.status[index] === 'approved' ? 'red' : 'white',
                                alignSelf: 'center',
                                left: Window.winWidth * 0.176,
                              }}
                            />
                            <S.ContactTouchableOpacity
                              onPress={() => this.callOnWhatsApp(`Olá, somos a ${element.data.ongName} e estamos entrando em contato referente à adoção do(a) ${element.data.petData.name} através do app Meu Aumigão.`, `${element.data.userData.name}`)}
                            >
                              <Icon
                                type="FontAwesome"
                                name="whatsapp"
                                style={{
                                  fontSize: 22,
                                  color: 'green',
                                }}
                              />
                            </S.ContactTouchableOpacity>

                            <S.PetNameTextView>

                              <S.PetTextView>
                                <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>De: </S.PetNameSubText>
                                <S.PetNameSubText>{this.getFirstWord(element.data.userData.name)}</S.PetNameSubText>
                              </S.PetTextView>

                              <S.PetTextView>
                                <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Para: </S.PetNameSubText>
                                <S.PetNameSubText>{element.data.petData.name}</S.PetNameSubText>
                              </S.PetTextView>

                              <S.PetTextView>
                                <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Data: </S.PetNameSubText>
                                <S.PetNameSubText>{moment(element.data.date).format('DD/MM')}</S.PetNameSubText>
                              </S.PetTextView>

                              <S.PetTextView>
                                <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Hora: </S.PetNameSubText>
                                <S.PetNameSubText>Às {element.data.time}</S.PetNameSubText>
                              </S.PetTextView>

                              <S.PetTextView style={{ flexDirection: 'column' }}>
                                <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold', alignSelf: 'flex-start' }}>Avaliação de {this.getFirstWord(element.data.userData.name)}: </S.PetNameSubText>
                                <S.PetNameSubText style={{ alignSelf: 'flex-start' }}>{this.state.ratings[index]} ✰</S.PetNameSubText>
                              </S.PetTextView>

                              {(this.state.status[index] === 'pending') && (
                                <S.PetTextView>
                                  <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Status: </S.PetNameSubText>
                                  <S.PetNameSubText style={{ color: 'orange' }}>Pendente</S.PetNameSubText>
                                </S.PetTextView>)}

                              {(this.state.status[index] === 'approved') && (
                                <S.ColumnView>
                                  <S.PetTextView>
                                    <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Status: </S.PetNameSubText>
                                    <S.PetNameSubText style={{ color: 'green' }}>Aprovado</S.PetNameSubText>
                                  </S.PetTextView>
                                  <S.PetNameSubText style={{ color: 'blue', alignSelf: 'flex-start', textAlign: 'left', marginTop: Window.winHeight * 0.03 }}>Após sua entrevista, clique aqui para avaliar o adotante!</S.PetNameSubText>
                                </S.ColumnView>)}
                              {(this.state.status[index] === 'refused') && (
                                <S.ColumnView>
                                  <S.PetTextView>
                                    <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Status: </S.PetNameSubText>
                                    <S.PetNameSubText style={{ color: 'red' }}>Recusado</S.PetNameSubText>
                                  </S.PetTextView>
                                </S.ColumnView>)}

                            </S.PetNameTextView>

                          </S.ContainerTouchableOpacity>
                        </S.PetsCardsView>
                      );
                    }
                    ))
                    : (this.state.commitments.map((element, index) => {
                      console.log('element :', element);
                      return (
                        <S.PetsCardsView>
                          <S.PetsCards
                            commitment={element}
                            userData={this.state.userData}
                            Route={this.props.navigation}
                            callOnWhatsApp={() => this.callOnWhatsApp(`Olá, sou o ${this.state.userData.name} e estou entrando em contato referente à adoção do(a) ${element.data.petData.name} através do app Meu Aumigão.`, `${element.data.ongPhone}`)}
                          />
                        </S.PetsCardsView>
                      );
                    }))
                  }
                </>
              )
              : (
                <>
                  <S.LoginTitleText style={{ fontSize: Platform.OS === 'ios' ? 20 : 17 }}
                  >{'Infelizmente não encontramos visitas para você!'}</S.LoginTitleText>
                  <Icon
                    type="Entypo"
                    name="emoji-sad"
                    style={{
                      fontSize: 22,
                      color: '#999999',
                      marginTop: '-3%',
                      alignSelf: 'center',
                    }}
                  />
                </>
              )
            }
          </S.FullScrollView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='small' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default ScheduleScreen;
