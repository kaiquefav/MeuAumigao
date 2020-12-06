import React from 'react';
import * as S from './PetCard.style';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import moment from 'moment';
import { Icon } from 'native-base';

class PetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userData: {},
      petData: {},
    };
  }

  async componentDidMount() {
    await this.getData();
    await Font.loadAsync({
      'Bellota-Light': require('../../../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
  }

  getData = async () => {
    await this.setState({ userData: this.props.userData });
    await firebase.database().ref(`animals/cats/${this.props.commitment.data.petID}`).once('value',
      (snapshot) => {
        if (snapshot.val()) this.setState({ petData: snapshot.val() });
      });
    await firebase.database().ref(`animals/dogs/${this.props.commitment.data.petID}`).once('value',
      (snapshot) => {
        if (snapshot.val()) this.setState({ petData: snapshot.val() });
      });
    await firebase.database().ref(`animals/others/${this.props.commitment.data.petID}`).once('value',
      (snapshot) => {
        if (snapshot.val()) this.setState({ petData: snapshot.val() });
      });
  }

  render() {
    const { commitment, Route, userData, callOnWhatsApp } = this.props;
    const { petData } = this.state;
    return (
      this.state.fontLoaded ?
        (<S.ContainerTouchableOpacity
          activeOpacity={0.5}
          onPress={() => Route.navigate('Pet', {
            userData: userData,
            pet: { id: commitment.data.petID, data: commitment.data.petData },
            userType: userData.userType,
            userID: commitment.data.userID,
            animalType: commitment.data.petData.petType,
            schedule: true,
          })}
        >

          <S.PetImage
            source={{ uri: `data:image/jpg;base64,${petData.petPic}` }}
            resizeMode='cover'
          />

          <S.PetNameTextView>

            <S.PetNameText>{petData.name}</S.PetNameText>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Data: </S.PetNameSubText>
              <S.PetNameSubText>{moment(commitment.data.date).format('DD/MM')}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Hora: </S.PetNameSubText>
              <S.PetNameSubText>Às {commitment.data.time}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Local: </S.PetNameSubText>
              <S.PetNameSubText>{petData.local.localTitle}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Rua: </S.PetNameSubText>
              <S.PetNameSubText>{petData.local.localStreet}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Bairro: </S.PetNameSubText>
              <S.PetNameSubText>{petData.local.localDistrict}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Nº: </S.PetNameSubText>
              <S.PetNameSubText>{petData.local.localNumber}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Status: </S.PetNameSubText>
              {(commitment.data.status === 'refused') && (<S.PetNameSubText style={{ color: 'red' }}>Recusado</S.PetNameSubText>)}
              {(commitment.data.status === 'pending') && (<S.PetNameSubText style={{ color: 'orange' }}>Pendente</S.PetNameSubText>)}
              {(commitment.data.status === 'approved') && (<S.PetNameSubText style={{ color: 'green' }}>Aprovado</S.PetNameSubText>)}
            </S.PetTextView>
            <S.ContactTouchableOpacity
              onPress={callOnWhatsApp}
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
          </S.PetNameTextView>

        </S.ContainerTouchableOpacity >)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetCard;
