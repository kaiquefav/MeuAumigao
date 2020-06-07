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
    const { pet, onPress } = this.props;
    return (
      this.state.fontLoaded ?
        (<S.ContainerTouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
        >
          <S.PetImage
            source={{ uri: pet.petPic }}
            resizeMode='cover'
          />
          <S.PetNameTextView>
            <S.PetNameText>{pet.name}</S.PetNameText>
          </S.PetNameTextView>
        </S.ContainerTouchableOpacity>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetCard;
