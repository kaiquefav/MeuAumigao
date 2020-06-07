import React from 'react';
import * as S from './ScheduleScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      race: '',
      size: '',
      age: '',
      behavior: '',
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

          <S.LoginTitleText>
            Escolha Suas Preferências
          </S.LoginTitleText>



        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default ScheduleScreen;
