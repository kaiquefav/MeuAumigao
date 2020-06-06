import styled from 'styled-components/native';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';

const ContainerView = styled.View`
  background-color: ${(props) => (props.color ? props.color : 'transparent')};
  justify-content: center;
`;

const BackArrowTouchableOpacity = styled.TouchableOpacity`
  align-self: flex-start;
  position: absolute;
`;

const LogoImage = styled.Image`
  height: ${Window.winHeight * 0.15}px;
  width: ${Window.winWidth * 0.5}px;
  align-self: center;
`;

const BackArrowImage = styled.Image`
  height: ${Window.winHeight * 0.04}px;
  width: ${Window.winWidth * 0.04}px;
`;

export {
  ContainerView,
  BackArrowTouchableOpacity,
  LogoImage,
  BackArrowImage,
};
