import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';


const RegisterTextInput = styled(Picker)`
  background-color: white;
  height: ${Window.winHeight * 0.05}px;
  width: ${Window.winWidth * 0.8}px;
  border-width: 0.5px;
  border-color: #000;
  margin-bottom: ${Window.winHeight * 0.04}px;
  align-self: center;
  align-items: center;
`;

const Header = styled(PageHeader)`
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: rgb(250, 250, 250);
  padding-horizontal: 10%;
`;

const RegisterTextInputView = styled.View`
  flex: 1;
  margin-top: 15%;
  margin-bottom: 10%;
  align-self:flex-start;
`;

const InputTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5%;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '23px' : '19px'};
  align-self: center;
  text-align: center;
  margin-top: 15%;
`;

const InputTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 2%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '20px' : '15px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.029}px` : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? '30%' : '25%'};
  align-self: center;
`;

const LogoImage = styled.Image`
  height: ${Window.winHeight * 0.25}px;
  width: ${Window.winWidth * 0.65}px;
  margin-top: -11%;
  margin-bottom: -25%;
  align-self: center;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-bottom: 20%;
`;

const BackArrowImage = styled.Image`
  height: ${Window.winHeight * 0.04}px;
  width: ${Window.winWidth * 0.04}px;
  margin-right: 5%;
`;

export {
  Header,
  HeaderView,
  FullScrollView,
  RegisterTextInputView,
  InputTitleView,
  LoginTitleText,
  InputTitleText,
  RegisterText,
  LogoImage,
  RegisterTouchableOpacity,
  RegisterTextInput,
  BackArrowImage,
};
