import React from 'react';
import * as S from './ScheduleScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Container, Header, Button, Content, ActionSheet, Text } from "native-base";

import * as Pets from '../../mocky/mockData';

var BUTTONS = ["Aprovar", "Recusar", "Cancelar"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userType: 1,
      pets: [],
      status: [],
      clicked: '',
    };
  }


  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
    if (this.state.userType === 0) {
      this.setState({ pets: Pets.usersCommitments });
      let aux = [];
      Pets.usersCommitments.map((element) => {
        aux.push(element.status);
      })
      this.setState({ status: aux });
    }
  }

  showOptions = (solicitationIndex, userName) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: `Solicitação de ${userName}`
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] }, () => {
          console.log(this.state.clicked);
          if (this.state.clicked === 'Recusar') {
            let aux = this.state.pets;
            let aux2 = this.state.status;
            aux.splice(solicitationIndex, 1);
            aux2.splice(solicitationIndex, 1);
            this.setState({ pets: aux });
          }

          if (this.state.clicked === 'Aprovar') {
            let aux = this.state.status;
            aux[solicitationIndex] = 'Aprovado';
            this.setState({ status: aux });
          }
        });
      }
    )
  }

  render() {
    console.log('PETS: ', this.state.pets);
    console.log('STATUS: ', this.state.status);
    return (
      this.state.fontLoaded ?
        (<S.FullScrollView>

          <S.HeaderView>
            <S.Header
              backButton={false}
              icon={true}
              onPress={() => this.props.navigation.goBack()}
            />
          </S.HeaderView>

          <S.LoginTitleText>
            Sua agenda:
          </S.LoginTitleText>
          {this.state.userType === 0
            ? (this.state.pets.map((element, index) => (
              <S.PetsCardsView>

                <S.ContainerTouchableOpacity
                  disabled={this.state.status[index] === 'Aprovado'
                    ? true
                    : false
                  }
                  onPress={() => this.showOptions(index, element.userName)}
                  activeOpacity={0.5}
                >

                  <S.PetImage
                    source={{ uri: element.petPic }}
                    resizeMode='cover'
                  />

                  <S.UserImage
                    source={{ uri: element.userPic }}
                    resizeMode='cover'
                  />

                  <S.PetNameTextView>

                    <S.PetTextView>
                      <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>De: </S.PetNameSubText>
                      <S.PetNameSubText>{element.userName}</S.PetNameSubText>
                    </S.PetTextView>

                    <S.PetTextView>
                      <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Para: </S.PetNameSubText>
                      <S.PetNameSubText>{element.petName}</S.PetNameSubText>
                    </S.PetTextView>

                    <S.PetTextView>
                      <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Data: </S.PetNameSubText>
                      <S.PetNameSubText>{element.date}</S.PetNameSubText>
                    </S.PetTextView>

                    <S.PetTextView>
                      <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Hora: </S.PetNameSubText>
                      <S.PetNameSubText>Às {element.time}</S.PetNameSubText>
                    </S.PetTextView>

                    <S.PetTextView>
                      <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Status: </S.PetNameSubText>
                      {(this.state.status[index] === 'Pendente') && (<S.PetNameSubText style={{ color: 'blue' }}>{this.state.status[index]}</S.PetNameSubText>)}
                      {(this.state.status[index] === 'Aprovado') && (<S.PetNameSubText style={{ color: 'green' }}>{this.state.status[index]}</S.PetNameSubText>)}
                    </S.PetTextView>

                  </S.PetNameTextView>

                </S.ContainerTouchableOpacity>
              </S.PetsCardsView>
            )
            ))
            : (Pets.petsCommitments.map((element, index) => (
              <S.PetsCardsView>
                <S.PetsCards commitment={element} />
              </S.PetsCardsView>
            )))
          }
        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default ScheduleScreen;
