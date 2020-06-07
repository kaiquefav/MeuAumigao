import React from 'react';
import * as S from './ScheduleScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import * as Pets from '../../mocky/mockData';

class ScheduleScreen extends React.Component {
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

  render() {
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

          {Pets.petsCommitments.map((element, index) => (
            <S.PetsCardsView>
              <S.PetsCards commitment={element} />
            </S.PetsCardsView>
          ))}

        </S.FullScrollView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default ScheduleScreen;
