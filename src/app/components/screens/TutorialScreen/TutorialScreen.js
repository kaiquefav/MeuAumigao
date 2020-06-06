import React from 'react';
import * as S from './TutorialScreen.style';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';

class TutorialScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
  }

  render() {
    const {
      screen,
      title,
      description,
    } = this.props;

    return (
      this.state.fontLoaded ?
        (<S.ContainerView>
          <S.DeviceStatusBar barStyle='dark-content' />

          <S.TopView>
            {screen == 1 &&
              (<S.TutorialImage
                source={require('../../../assets/png/img_tutorial1.png')}
                resizeMode='contain'
              />)
            }
            {screen == 2 &&
              (<S.TutorialImage
                source={require('../../../assets/png/img_tutorial2.png')}
                resizeMode='contain'
              />)
            }
            {screen == 3 &&
              (<S.TutorialImage3
                source={require('../../../assets/png/img_tutorial3.png')}
                resizeMode='contain'
              />)
            }

          </S.TopView>

          <S.BottomView>

            <S.TitleText
              screen={screen}>{title}</S.TitleText>
            <S.DescriptionText>{description}</S.DescriptionText>

          </S.BottomView>

        </S.ContainerView>)
        : (
          <S.LoadingView>
            <ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />
          </S.LoadingView>)
    );
  }
}

export default TutorialScreen;
