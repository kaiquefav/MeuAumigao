import React from 'react';
import * as S from './HomeScreen.style';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { ActivityIndicator, View } from 'react-native';
import * as Font from 'expo-font';

import * as Pets from '../../mocky/mockData';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userType: 1,
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

  handleNewPet = () => {
    this.props.navigation.navigate('NewPet');
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
            />

            {this.state.userType === 0
              ? (<View>
                <S.LoginTitleText>Seus amigões cadastrados!</S.LoginTitleText>

                <S.PetButtonView>
                  <S.PetButton
                    userType={this.state.userType}
                    pets={Pets.pets}
                    routes={this.props}
                    scrollTo={(item) => this.scrollToItem(item)}
                  />
                </S.PetButtonView>

                <S.AddPetTouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.handleNewPet()}>
                  <S.AddPetText>Adicionar um novo Amigão!</S.AddPetText>
                </S.AddPetTouchableOpacity>

              </View>
              )
              : (<>
                <S.LoginTitleText>Amigões para você!</S.LoginTitleText>

                <S.PetButtonView>
                  <S.PetButton
                    userType={this.state.userType}
                    pets={Pets.pets}
                    routes={this.props}
                    scrollTo={(item) => this.scrollToItem(item)}
                  />
                </S.PetButtonView>
              </>
              )}
          </S.FullView>
        )
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default HomeScreen;
