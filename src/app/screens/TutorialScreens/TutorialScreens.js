import React from 'react';
import * as S from './TutorialScreens.style';
import TutorialPage from '../../components/screens/TutorialScreen/TutorialScreen';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

class TutorialScreens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [true, false, false],
      screen: 0,
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

  setIndicator = (index) => {
    this.setState({ screen: index.position });
    let page = [false, false, false];
    page[index.position] = true;
    this.setState({ pages: page })
  }

  render() {
    return (
      this.state.fontLoaded ? (
        <S.ContainerView>

          <S.ContainerViewPager
            initialPage={0}
            onPageSelected={(eventDate) => { this.setIndicator(eventDate.nativeEvent); }}
            ref={(viewPager) => { this.viewPager = viewPager; }}
          >

            <S.PageView key="1">
              <TutorialPage
                screen={1}
                title='Encontre seu amigão!'
                description='Encontre e adote seu amigão através de recomendações que lhe oferecemos.'
              />
            </S.PageView>

            <S.PageView key="2">
              <TutorialPage
                screen={2}
                title='Ajude seu Amigão!'
                description='Não tem condições de adotar?
              Contribua com as ONGs da maneira que puder!'
              />
            </S.PageView>

            <S.PageView key="3">
              <TutorialPage
                screen={3}
                title='Ganhe Benefícios!'
                description='Contribuindo com a causa, você adquire benefícios em estabelecimentos parceiros.'
              />
            </S.PageView>

          </S.ContainerViewPager>

          <S.IndicatorView>
            <S.Indicator1 active={this.state.pages[0]} />
            <S.Indicator2 active={this.state.pages[1]} />
            <S.Indicator3 active={this.state.pages[2]} />
          </S.IndicatorView>

          {this.state.screen !== 2
            ? (
              <S.ButtonsView>
                <S.SkipButton onPress={() => this.props.navigation.navigate('Login')}>
                  <S.SkipButtonText>Pular</S.SkipButtonText>
                </S.SkipButton>
                <S.NextButton
                  activeOpacity={0.5}
                  onPress={() => this.viewPager.setPage(this.state.screen + 1)}
                >
                  <S.NextButtonText>Próximo</S.NextButtonText>
                </S.NextButton>
              </S.ButtonsView>
            )
            : (
              <S.ButtonsView>
                <S.NextButton
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.navigate('Login')}
                >
                  <S.NextButtonText>Concluir</S.NextButtonText>
                </S.NextButton>
              </S.ButtonsView>
            )
          }


        </S.ContainerView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default TutorialScreens;
