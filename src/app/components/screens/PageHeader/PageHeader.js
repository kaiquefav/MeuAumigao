import React from 'react';
import * as S from './PageHeader.style';

class PageHeader extends React.Component {

  render() {
    const {
      onPress,
      color,
      icon,
      backButton,
    } = this.props;
    return (
      <S.ContainerView color={color}>

        {backButton && (<S.BackArrowTouchableOpacity onPress={onPress}>
          <S.BackArrowImage
            source={require('../../../assets/png/ic_back_arrow_button.png')}
            resizeMode='contain'
          />
        </S.BackArrowTouchableOpacity>)}


        {icon && (<S.LogoImage
          source={require('../../../assets/png/ic_transparent_logo_MeuAumigao.png')}
          resizeMode='cover'
        />)}
      </S.ContainerView>
    );
  }
}

export default PageHeader;
