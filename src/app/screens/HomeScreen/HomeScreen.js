import React from 'react';
import * as S from './HomeScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [
        { name: 'Mel', picture: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5d390a1df7e583326da377b8/big.jpg?1564019229' },
        { name: 'Rex', picture: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5d93921df7e583479b69b738/big.jpg?1569952283' },
        { name: 'Pagu', picture: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5dad06dff7e583479b69d35c/big.jpg?1571620574' },
        { name: 'Belinha', picture: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5c37abae8b0dad2aece0a4fc/big.jpg?1547152298' },
        { name: 'Princesa', picture: 'https://qph.fs.quoracdn.net/main-qimg-a9f43765a00412105e7161b0794783e4' },
        { name: 'Don', picture: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef' },
      ],
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
  }

  renderItem = ({ item, index }) => {
    return (
      <S.PetsCard pet={item} />
    );
  }

  render() {
    return (
      this.state.fontLoaded ?
        (<S.LinearView colors={['rgba(235, 207, 200, 0.1)', 'white']}>

          <S.Header
            backButton={false}
            icon={true}
            onPress={() => this.props.navigation.goBack()}
          />

          <S.LoginTitleText>Amigões para você!</S.LoginTitleText>

          <S.PetsCarouselView>
            <S.PetsCarousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.pets}
              renderItem={this.renderItem}
              sliderWidth={Window.winWidth * 1}
              itemWidth={Window.winWidth * 0.82}
            />
          </S.PetsCarouselView>

          <S.SeeMoreTouchableOpacity>
            <S.SeeMoreTouchableOpacityText>ver mais</S.SeeMoreTouchableOpacityText>
          </S.SeeMoreTouchableOpacity>
        </S.LinearView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default HomeScreen;
