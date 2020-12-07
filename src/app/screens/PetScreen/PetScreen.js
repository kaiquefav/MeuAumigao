import React from 'react';
import * as S from './PetScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, View, Alert, Linking } from 'react-native';
import * as Font from 'expo-font';
import TimePicker from "react-native-24h-timepicker";
import * as firebase from 'firebase';

import { StackActions, CommonActions } from '@react-navigation/native';

class PetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      race: '',
      size: '',
      age: '',
      behavior: '',
      time: '',
      timePlaceholder: 'Horário',
      chosenDate: new Date(),
      isVisible: false,
      fontLoaded: false,
      ongID: '',
      ongPhone: '',
    };
  }

  getUserID = async () => {
    const props = this.props;
    let ongID;
    await firebase.database().ref('users/').once('value',
      (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.hasChild('doc')) {
            if (childSnapshot.val().doc === props.route.params.userData.doc) {
              ongID = childSnapshot.key;
            }
          }
        });
      });
    this.setState({ ongID: ongID });
  }

  eraseAnimal = async () => {
    let otherAnimalMeetings = [];

    //APAGANDO TODAS OUTROS MEETINGS COM O ANIMAL
    if (this.props.route.params.pet.data.type === 0) {
      //PEGAR OUTROS MEETINGS DO ANIMAL
      await firebase.database().ref('users/' + this.state.ongID + '/animals/dogs/' + this.props.route.params.pet.id + '/meetings').once('value',
        (snapshot) => {
          snapshot.forEach((element) => {
            otherAnimalMeetings.push(element.key);
          });
        });
    }
    if (this.props.route.params.pet.data.type === 1) {
      //PEGAR OUTROS MEETINGS DO ANIMAL
      await firebase.database().ref('users/' + this.state.ongID + '/animals/cats/' + this.props.route.params.pet.id + '/meetings').once('value',
        (snapshot) => {
          snapshot.forEach((element) => {
            otherAnimalMeetings.push(element.key);
          });
        });
    }
    if (this.props.route.params.pet.data.type === 2) {
      //PEGAR OUTROS MEETINGS DO ANIMAL
      await firebase.database().ref('users/' + this.state.ongID + '/animals/others/' + this.props.route.params.pet.id + '/meetings').once('value',
        (snapshot) => {
          snapshot.forEach((element) => {
            otherAnimalMeetings.push(element.key);
          });
        });
    }
    // APAGAR ESSAS MEETINGS NOS USUARIOS
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
    if (this.props.route.params.pet.data.type === 0) await firebase.database().ref('animals/dogs/' + this.props.route.params.pet.id).remove();
    if (this.props.route.params.pet.data.type === 1) await firebase.database().ref('animals/cats/' + this.props.route.params.pet.id).remove();
    if (this.props.route.params.pet.data.type === 2) await firebase.database().ref('animals/others/' + this.props.route.params.pet.id).remove();

    //APAGANDO DO ANIMAL DENTRO DA ONG
    if (this.props.route.params.pet.data.type === 0) await firebase.database().ref('users/' + this.state.ongID + '/animals/dogs/' + this.props.route.params.pet.id).remove();
    if (this.props.route.params.pet.data.type === 1) await firebase.database().ref('users/' + this.state.ongID + '/animals/cats/' + this.props.route.params.pet.id).remove();
    if (this.props.route.params.pet.data.type === 2) await firebase.database().ref('users/' + this.state.ongID + '/animals/others/' + this.props.route.params.pet.id).remove();
    this.props.navigation.replace('BottomTab');
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ timePlaceholder: `${hour}:${minute}` });
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  async getOngPhone(id) {
    let data = {};
    await firebase.database().ref(`users/${id}`).once('value',
      (snapshot) => {
        data = snapshot.val();
      });
    this.setState({ ongPhone: data.phone });
  }

  modalComponent = () => (
    <>
      <S.ScheduleModal isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
      >
        <S.ModalView>

          <S.LoginTitleText style={{ fontSize: 22, marginTop: 0 }}>Agende uma visita com {this.props.route.params.pet.data.name}</S.LoginTitleText>

          <S.DatePickerView>

            <S.ScheduleModalDatePicker
              defaultDate={new Date(2020, 8, 28)}
              minimumDate={new Date(2020, 8, 28)}
              maximumDate={new Date(2099, 12, 31)}
              locale={"pt"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Data"
              textStyle={{
                color: "rgb(81, 81, 81)",
                fontFamily: "Bellota-Regular",
                fontSize: 19,
                padding: 0,
              }}
              placeHolderTextStyle={{ color: "rgb(81, 81, 81)", fontFamily: "Bellota-Regular", fontSize: 19, padding: 0 }}
              onDateChange={(newDate) => this.setState({ chosenDate: newDate })}
              disabled={false}
            />

            {this.state.time === ''
              ? (<S.DatePickerText>-</S.DatePickerText>)
              : (<S.DatePickerText>às</S.DatePickerText>)
            }

            <S.DatePickerTouchableOpacity onPress={() => this.TimePicker.open()}>
              <S.DatePickerText>{this.state.timePlaceholder}</S.DatePickerText>
            </S.DatePickerTouchableOpacity>

            <TimePicker
              ref={ref => {
                this.TimePicker = ref;
              }}
              onCancel={() => this.onCancel()}
              onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
              itemStyle={{ color: "rgb(81, 81, 81)", fontFamily: "Bellota-Bold", fontSize: 19 }}
              minuteInterval={5}
              hourUnit={"h"}
              selectedHour={"6"}
              textCancel={"Cancelar"}
              textConfirm={"Confirmar"}
            />

          </S.DatePickerView>

          <S.DatePickerButtonsView>

            {((this.state.timePlaceholder !== 'Horário') && (this.state.chosenDate))
              ? (
                <S.ModalTouchableOpacity onPress={async () => {
                  await this.getOngPhone(this.props.route.params.pet.data.owner);
                  firebase.database().ref('meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                    userID: this.props.route.params.userID,
                    userData: this.props.route.params.userData,
                    ongID: this.props.route.params.pet.data.owner,
                    ongName: this.props.route.params.pet.data.local.localTitle,
                    ongPhone: this.state.ongPhone,
                    petID: this.props.route.params.pet.id,
                    petData: this.props.route.params.pet.data,
                    date: `${this.state.chosenDate}`,
                    time: this.state.time,
                    status: 'pending',
                  });
                  firebase.database().ref('users/' + this.props.route.params.userID + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                    isCreated: 'yes',
                  });
                  firebase.database().ref('users/' + this.props.route.params.pet.data.owner + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                    isCreated: 'yes',
                  });
                  if (this.props.route.params.animalType === 0) {
                    firebase.database().ref('animals/dogs/' + this.props.route.params.pet.id + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                      isCreated: 'yes',
                    });
                    firebase.database().ref('users/' + this.props.route.params.pet.data.owner + '/animals/dogs/' + this.props.route.params.pet.id + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                      isCreated: 'yes',
                    });
                  }
                  if (this.props.route.params.animalType === 1) {
                    firebase.database().ref('animals/cats/' + this.props.route.params.pet.id + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                      isCreated: 'yes',
                    });
                    firebase.database().ref('users/' + this.props.route.params.pet.data.owner + '/animals/cats/' + this.props.route.params.pet.id + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                      isCreated: 'yes',
                    });
                  }
                  if (this.props.route.params.animalType === 2) {
                    firebase.database().ref('animals/others/' + this.props.route.params.pet.id + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                      isCreated: 'yes',
                    });
                    firebase.database().ref('users/' + this.props.route.params.pet.data.owner + '/animals/others/' + this.props.route.params.pet.id + '/meetings/' + this.props.route.params.userID + this.props.route.params.pet.id).set({
                      isCreated: 'yes',
                    });
                  }
                  Alert.alert(
                    'Agendamento',
                    'Agendado com sucesso!',
                    [{
                      text: "Ok!", onPress: () => {
                        this.handleSchedule();
                        this.props.navigation.replace('BottomTab');
                      }
                    }
                    ],
                    { cancelable: false }
                  );
                }}>
                  <S.ModalText>Agendar</S.ModalText>
                </S.ModalTouchableOpacity>
              )
              : (
                <S.ModalTouchableOpacity onPress={() => Alert.alert(
                  'Agendamento',
                  'Preencha todos os campos!',
                  [{ text: "Ok!" }
                  ],
                  { cancelable: false }
                )}>
                  <S.ModalText>Agendar</S.ModalText>
                </S.ModalTouchableOpacity>
              )
            }


            <S.ModalTouchableOpacity onPress={() => this.handleSchedule()}>
              <S.ModalText>Cancelar</S.ModalText>
            </S.ModalTouchableOpacity>

          </S.DatePickerButtonsView>
        </S.ModalView>
      </S.ScheduleModal>
    </>
  )

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    await this.getUserID();
    if (this.props.route.params.userType === 1) await this.getOngPhone(this.props.route.params.pet.data.owner);
    this.setState({ fontLoaded: true });
  }

  handleSchedule = () => {
    this.setState({ timePlaceholder: 'Horário' });
    this.setState({ isVisible: !this.state.isVisible });
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
                backButton={true}
                icon={true}
                onPress={() => this.props.navigation.goBack()}
              />
            </S.HeaderView>

            {this.modalComponent()}

            <S.PetImage
              source={{ uri: `data:image/jpg;base64,${this.props.route.params.pet.data.petPic}` }}
              resizeMode='contain'
            />


            <S.AllTextView>
              <S.LoginTitleText>
                {this.props.route.params.pet.data.name}
              </S.LoginTitleText>
              <S.TextView>
                <S.LoginSubTitleText>Descrição:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.description}
                </S.LoginSubText>
              </S.TextView>

              <S.Divisor />

              <S.TextView>
                <S.LoginSubTitleText>Local:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.local.localTitle}
                </S.LoginSubText>
                <S.LoginSubText>
                  {`${this.props.route.params.pet.data.local.localCity},\n${this.props.route.params.pet.data.local.localStreet},\n${this.props.route.params.pet.data.local.localDistrict}, nº ${this.props.route.params.pet.data.local.localNumber}`}
                </S.LoginSubText>
              </S.TextView>

              <S.Divisor />

              <S.TextView>
                <S.LoginSubTitleText>Raça:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.race}
                </S.LoginSubText>
              </S.TextView>

              <S.Divisor />

              <S.TextView>
                <S.LoginSubTitleText>Porte:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.size}
                </S.LoginSubText>
              </S.TextView>

              <S.Divisor />

              <S.TextView>
                <S.LoginSubTitleText>Comportamento:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.behavior}
                </S.LoginSubText>
              </S.TextView>

              <S.Divisor />

              <S.TextView>
                <S.LoginSubTitleText>Idade:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.age}
                </S.LoginSubText>
              </S.TextView>

              <S.Divisor />

              <S.TextView>
                <S.LoginSubTitleText>Necessidade de atenção:</S.LoginSubTitleText>
                <S.LoginSubText>
                  {this.props.route.params.pet.data.care}
                </S.LoginSubText>
              </S.TextView>

              {this.props.route.params.userType === 1 && (
                <>
                  <S.Divisor />
                  <S.CallButton
                    onPress={() => this.callOnWhatsApp('', this.state.ongPhone)}
                  >
                    <S.CallText>Clique aqui para entrar em contato com o doador!</S.CallText>
                  </S.CallButton>
                </>
              )}
            </S.AllTextView>

            {this.props.route.params.userType === 0
              ? (<S.RegisterTouchableOpacity
                onPress={() => {
                  Alert.alert(
                    `Deseja remover ${this.props.route.params.pet.data.name}`,
                    'Esta ação é irreversível.',
                    [{
                      text: "Sim", onPress: async () => {
                        await this.eraseAnimal();
                      }
                    }, {
                      text: "Não",
                    },
                    ],
                    { cancelable: true }
                  )
                }}
              >
                <S.RegisterText>{`Remover ${this.props.route.params.pet.data.name}`}</S.RegisterText>
              </S.RegisterTouchableOpacity>)
              : !this.props.route.params.schedule &&
              (<S.RegisterTouchableOpacity onPress={() => this.handleSchedule()}>
                <S.RegisterText>Agendar Visita</S.RegisterText>
              </S.RegisterTouchableOpacity>)
            }


          </S.FullScrollView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default PetScreen;
