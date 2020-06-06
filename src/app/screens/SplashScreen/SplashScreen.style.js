import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';

const ContainerView = styled.View`
  flex: 1;
  align-items:center;
  justify-content:center;
  background-color: rgb(250, 250, 250);
`;

const LogoImage = styled.Image`
  height: ${Window.winHeight}px;
  width: ${Window.winWidth}px;
`;

export {
  ContainerView,
  LogoImage,
};
