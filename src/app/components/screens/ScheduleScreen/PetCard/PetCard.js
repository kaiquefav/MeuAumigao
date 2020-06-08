import React from 'react';
import * as S from './PetCard.style';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

class PetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
  }

  render() {
    const { commitment } = this.props;
    return (
      this.state.fontLoaded ?
        (<S.ContainerTouchableOpacity activeOpacity={0.5}>

          <S.PetImage
            source={{ uri: commitment.petPic }}
            resizeMode='cover'
          />

          <S.PetNameTextView>

            <S.PetNameText>{commitment.name}</S.PetNameText>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Data: </S.PetNameSubText>
              <S.PetNameSubText>{commitment.date}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Hora: </S.PetNameSubText>
              <S.PetNameSubText>Às {commitment.time}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Local: </S.PetNameSubText>
              <S.PetNameSubText>{commitment.localTitle}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Rua: </S.PetNameSubText>
              <S.PetNameSubText>{commitment.localStreet}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Bairro: </S.PetNameSubText>
              <S.PetNameSubText>{commitment.localDistrict}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Nº: </S.PetNameSubText>
              <S.PetNameSubText>{commitment.localNum}</S.PetNameSubText>
            </S.PetTextView>
            <S.PetTextView>
              <S.PetNameSubText style={{ fontFamily: 'Bellota-Bold' }}>Status: </S.PetNameSubText>
              {(commitment.status === 'Recusado') && (<S.PetNameSubText style={{ color: 'red' }}>{commitment.status}</S.PetNameSubText>)}
              {(commitment.status === 'Pendente') && (<S.PetNameSubText style={{ color: 'blue' }}>{commitment.status}</S.PetNameSubText>)}
              {(commitment.status === 'Aprovado') && (<S.PetNameSubText style={{ color: 'green' }}>{commitment.status}</S.PetNameSubText>)}
            </S.PetTextView>
          </S.PetNameTextView>

        </S.ContainerTouchableOpacity>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetCard;
