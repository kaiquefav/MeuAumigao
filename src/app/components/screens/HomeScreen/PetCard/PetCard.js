import React from 'react';
import * as S from './PetCard.style';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Icon } from 'native-base'; ''

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
    const { pet, onPress, isRecommended } = this.props;
    return (
      this.state.fontLoaded ?
        (<S.ContainerTouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          isRecommended={isRecommended}
        >
          {isRecommended && (
            <S.RecommendedFlagImage
              source={require('../../../../assets/png/ic_recommendedFlag.png')}
              resizeMode='cover'
            />
          )}
          <S.PetImage
            source={{ uri: `data:image/jpg;base64,${pet[1].petPic}` }}
            resizeMode='cover'
          />
          {isRecommended && (
            <S.RecommendedTextView>
              <S.RecommendedText>Recomendado para você!</S.RecommendedText>
            </S.RecommendedTextView>
          )}
          <S.PetNameTextView>
            <S.PetNameText>{pet[1].name}</S.PetNameText>
          </S.PetNameTextView>
        </S.ContainerTouchableOpacity>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetCard;
