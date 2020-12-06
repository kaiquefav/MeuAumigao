import React from 'react';
import * as S from './PageHeader.style';
import { Icon } from 'native-base';

class PageHeader extends React.Component {

  render() {
    const {
      onPress,
      color,
      icon,
      backButton,
      logoHeight,
      logoWidth,
    } = this.props;
    return (
      <S.ContainerView color={color}>

        {backButton && (<S.BackArrowTouchableOpacity onPress={onPress}>
          <Icon
            type="AntDesign"
            name="arrowleft"
            style={{
              fontSize: 23,
              color: 'rgb(81, 81, 81)',
              top: '40%',
            }}
          />
        </S.BackArrowTouchableOpacity>)}


        {icon && (<S.LogoImage
          source={require('../../../assets/png/ic_transparent_logo_MeuAumigao.png')}
          resizeMode='cover'
          logoHeight={logoHeight}
          logoWidth={logoWidth}
        />)}
      </S.ContainerView>
    );
  }
}

export default PageHeader;
