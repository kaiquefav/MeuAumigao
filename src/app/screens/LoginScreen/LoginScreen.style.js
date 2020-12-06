import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import { Input } from 'react-native-elements';

const Header = styled(PageHeader)`
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
  padding-horizontal: 7%;
`;

const FullView = styled.View`
  flex: 1;
`;

const LoginView = styled.View`
  margin-top: 10%;
`;

const EmailTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5%;
`;

const PasswordTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5%;
`;

const Divisor = styled.View`
  background-color: rgb(230, 230, 230);
  height: ${Window.winHeight * 0.008}px;
  width: ${Window.winWidth * 0.09}px;
  margin-top: 8%;
  margin-bottom: 8%;
  border-radius: 15px;
  align-self: center;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '26px' : '21px'};
  align-self: flex-start;
  text-align: left;
  margin-top: 10%;
`;

const EmailTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-left: 2%;
`;

const PasswordTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-left: 2%;
`;

const LoginTouchableOpacityText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '20px' : '15px'};
`;

const RegisterText = styled.Text`
  font-family: Bellota-Regular;
  margin-top: 8%;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '18px' : '14px'};
  text-align: center;
  align-self: center;
`;

const ErrorText = styled.Text`
  font-family: Bellota-Regular;
  color: red;
  align-self: center;
  text-align: center;
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-top: -4%;
  margin-bottom: 5%;
`;

const LoginTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-radius: 5px;
  height: ${Window.winHeight * 0.07}px;
  width: ${Window.winWidth * 0.6}px;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  padding-horizontal: 7%;
  align-self: center;
`;

const LogoImage = styled.Image`
  height: ${Window.winHeight * 0.15}px;
  width: ${Window.winWidth * 0.5}px;
  align-self: center;
`;

const LoginTextInput = styled(Input)`
`;

export const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  Header,
  FullScrollView,
  FullView,
  LoginView,
  EmailTitleView,
  PasswordTitleView,
  Divisor,
  EmailTitleText,
  PasswordTitleText,
  LoginTitleText,
  LoginTouchableOpacityText,
  RegisterText,
  ErrorText,
  LoginTouchableOpacity,
  RegisterTouchableOpacity,
  LoginTextInput,
};
