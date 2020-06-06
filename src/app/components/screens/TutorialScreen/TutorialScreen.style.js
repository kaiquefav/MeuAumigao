import styled from 'styled-components/native';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';
import { Platform } from 'react-native';

const ContainerView = styled.SafeAreaView`
  flex: 1;
`;
const DeviceStatusBar = styled.StatusBar`
`;

const LoadingView = styled.View`
  background-color: white;
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
`;

const TopView = styled.View`
  background-color: rgba(235, 207, 52, 0.3);
  height: ${Window.winHeight * 0.55}px;
  width: ${Window.winWidth * 1}px;
  border-bottom-width: 0.5px;
  align-items: center;
  padding: 0;
  justify-content: center;
`;

const BottomView = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
  align-items: center;
  padding-horizontal: 10%;
`;

const TitleText = styled.Text`
  font-family: Bellota-Bold;
  margin-top: ${(props) => (props.screen === 3 ? '-2%' : '10%')};
  margin-bottom: 3%;
  font-size: ${Platform.OS === 'ios' ? '28px' : '20px'};
  color: black;
  align-items: center;
`;

const DescriptionText = styled.Text`
  font-family: Bellota-Light;
  font-size: ${Platform.OS === 'ios' ? '18px' : '16px'};
  color: black;
  text-align: center;
`;

const TutorialImage = styled.Image`
  align-self: center;
  height: ${Window.winHeight * 0.3}px;
  width: ${Window.winWidth * 0.6}px;
`;

const TutorialImage3 = styled.Image`
  align-self: center;
  height: ${Window.winHeight * 0.35}px;
  width: ${Window.winWidth * 0.6}px;
`;

export {
  ContainerView,
  DeviceStatusBar,
  LoadingView,
  TopView,
  BottomView,
  TitleText,
  DescriptionText,
  TutorialImage,
  TutorialImage3,
};
