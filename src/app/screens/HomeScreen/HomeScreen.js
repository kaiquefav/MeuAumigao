import React from 'react';
import * as S from './HomeScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import * as Pets from '../../mocky/mockData';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  scrollToItem = () => {
    this.fullScrollView.scrollTo({ x: 1, y: Window.winHeight * 0.15, animated: true });
  }

  render() {
    return (
      this.state.fontLoaded ?
        (
          <S.FullView ref={(ref) => { this.fullScrollView = ref; }}>

            <S.Header
              backButton={false}
              icon={true}
              onPress={() => this.props.navigation.goBack()}
            />

            <S.LoginTitleText>Amigões para você!</S.LoginTitleText>

            <S.PetButtonView>
              <S.PetButton
                pets={Pets.pets}
                routes={this.props}
                scrollTo={(item) => this.scrollToItem(item)}
              />
            </S.PetButtonView>

          </S.FullView>
        )
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default HomeScreen;
