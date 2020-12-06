import styled from 'styled-components/native';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';

const ContainerView = styled.View`
  background-color: ${(props) => (props.color ? props.color : 'transparent')};
  margin-top: ${Window.winHeight * 0.02}px;
  justify-content: center;
`;

const BackArrowTouchableOpacity = styled.TouchableOpacity`
  align-self: flex-start;
  padding-horizontal: 3%;
  position: absolute;
`;

const LogoImage = styled.Image`
  height: ${(props) => (props.logoHeight ? `${props.logoHeight}px` : `${Window.winHeight * 0.15}px`)};
  width: ${(props) => (props.logoWidth ? `${props.logoWidth}px` : `${Window.winWidth * 0.5}px`)};
  align-self: center;
`;


export {
  ContainerView,
  BackArrowTouchableOpacity,
  LogoImage,
};
