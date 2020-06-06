import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import ViewPager from '@react-native-community/viewpager';

const ContainerViewPager = styled(ViewPager)`
  flex: 1;
  align-items:center;
  justify-content:center;
  background-color: white;
`;

const DeviceStatusBar = styled.StatusBar`
`;

const ContainerView = styled.View`
  flex: 1;
`;

const PageView = styled.View`
  flex: 1;
`;

const ButtonsView = styled.View`
  margin-top: auto;
`;

const IndicatorView = styled.View`
  position: absolute;
  top: 65%;
  align-self: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Indicator1 = styled.View`
  background-color: ${(props) => (props.active ? 'black' : 'white')};
  border-width: ${(props) => (props.active ? '0px' : '1px')};
  height: 8px;  
  width: ${(props) => (props.active ? '20px' : '8px')};
  border-radius: 4px;
  margin-right:2%;
  margin-top: -40%;
`;

const Indicator2 = styled(Indicator1)`
`;

const Indicator3 = styled(Indicator1)`
`;

const SkipButtonText = styled.Text`
  font-family: Bellota-Regular;
  font-size: ${Platform.OS === 'ios' ? '20px' : '14px'};
  text-align: center;
  color: black;
  padding-vertical: 3%;
`;

const NextButtonText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  padding-vertical: ${Window.winHeight * 0.015}px;
  font-size: ${Platform.OS === 'ios' ? '25px' : '18px'};
  text-align: center;
`;

const SkipButton = styled.TouchableOpacity`
  background-color: white;
  width: ${Window.winWidth * 1}px;
`;

const NextButton = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  width: ${Window.winWidth * 1}px;
  justify-content: center;
`;

const LogoImage = styled.Image`
  height: ${Window.winHeight * 0.35}px;
  width: ${Window.winWidth * 0.75}px;
  position: absolute;
  bottom: 72%;
  align-self: center;
  z-index: 50;
`;

export {
  ContainerViewPager,
  DeviceStatusBar,
  ContainerView,
  PageView,
  ButtonsView,
  IndicatorView,
  Indicator1,
  Indicator2,
  Indicator3,
  SkipButtonText,
  NextButtonText,
  SkipButton,
  NextButton,
  LogoImage,
};
