import React from 'react';
import * as S from './SplashScreen.style';

class SplashScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Tutorial');
    }, 3000);
  }
  render() {
    return (
      <S.ContainerView>
        <S.LogoImage
          source={require('../../assets/png/ic_transparent_logo_MeuAumigao.png')}
          resizeMode='contain'
        />
      </S.ContainerView>
    );
  }
}

export default SplashScreen;
