import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';

const ContainerView = styled.View`
  flex: 1;
  align-items:center;
  justify-content:center;
  background-color: #f1f1f1;
`;

const LogoImage = styled.Image`
  height: ${Window.winHeight}px;
  width: ${Window.winWidth}px;
`;

export {
  ContainerView,
  LogoImage,
};
