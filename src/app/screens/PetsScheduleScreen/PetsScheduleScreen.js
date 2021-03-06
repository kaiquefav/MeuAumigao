import React from 'react';
import * as S from './PetsScheduleScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, Platform } from 'react-native';
import * as Font from 'expo-font';
import { Icon } from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';

class PetsScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fontLoaded: false,
    };
  }


  componentDidMount = async () => {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    try {
      await this.getUserByPet();
    } catch (err) {
      console.log('erro: ', err);
    } finally {
      this.setState({ fontLoaded: true });
    }
  }

  getUserByPet = async () => {
    let auxCommitments = [];
    await Object.keys(this.props.route.params.pet.data.meetings).forEach(async (element) => {
      await firebase.database().ref(`meetings/${element}`).once('value',
        (snapshot) => {
          auxCommitments.push(snapshot.val());
        });
      this.setState({ users: auxCommitments });
    });
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
          {this.state.users.length !== 0
            ? (<>
              <S.LoginTitleText>
                {`Solicitações de Visita para ${this.props.route.params.pet.data.name}`}
              </S.LoginTitleText>

              {this.state.users.map((element, index) => (
                <S.PetsCardsView>
                  <S.ContainerTouchableOpacity activeOpacity={0.5}>

                    <S.PetImage
                      source={{ uri: element.userData.picture }}
                      resizeMode='cover'
                    />

                    <S.PetNameTextView>

                      <S.PetNameText>{element.userData.name}</S.PetNameText>
                      <S.PetTextView >
                        <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Email:</S.PetNameSubText>
                        <S.PetNameSubText>{element.userData.email}</S.PetNameSubText>
                      </S.PetTextView>

                      <S.PetTextView>
                        <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Tel: </S.PetNameSubText>
                        <S.PetNameSubText>{element.userData.phone}</S.PetNameSubText>
                      </S.PetTextView>

                      <S.PetTextView>
                        <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Data: </S.PetNameSubText>
                        <S.PetNameSubText>{moment(element.date).format('DD/MM')}</S.PetNameSubText>
                      </S.PetTextView>

                      <S.PetTextView>
                        <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Horário: </S.PetNameSubText>
                        <S.PetNameSubText>Às {element.time}</S.PetNameSubText>
                      </S.PetTextView>

                    </S.PetNameTextView>

                  </S.ContainerTouchableOpacity>
                </S.PetsCardsView>
              ))}
            </>)
            : (
              <>
                <S.LoginTitleText style={{ fontSize: Platform.OS === 'ios' ? 20 : 17 }}
                >{`Infelizmente não encontramos solicitações de visita para ${this.props.route.params.pet.data.name}`}</S.LoginTitleText>
                <Icon
                  type="Entypo"
                  name="emoji-sad"
                  style={{
                    fontSize: 25,
                    color: '#999999',
                    marginTop: '-3%',
                    alignSelf: 'center',
                  }}
                />
              </>
            )
          }
        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetsScheduleScreen;
