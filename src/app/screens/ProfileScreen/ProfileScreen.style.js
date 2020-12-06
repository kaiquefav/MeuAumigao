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

const ProfilePicView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin-top: ${Window.winHeight * 0.04}px;
  height: ${Window.winHeight * 0.22}px;
  width: ${Window.winHeight * 0.22}px;
  align-self: center;
  justify-content: center;
`;

const ModalView = styled.View`
align-self: center;
  align-items: center;
  justify-content: center;
  background-color: white; 
  padding-horizontal: 2%;
  padding-vertical: ${Window.winHeight * 0.04}px;
  border-radius: 8px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
  width: 90%;
`;

const RatingView = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${Window.winHeight * 0.01}px;
  background-color: white; 
  padding-horizontal: 2%;
  padding-vertical: ${Window.winHeight * 0.02}px;
  border-radius: 8px;
  border-right-width: 2px;
  border-bottom-width: 2px; 
  border-color: rgba(0, 0, 0, 0.1);
`;

const Divisor = styled.View`
  background-color: #ccc;
  height: ${Window.winHeight * 0.005}px;
  width: ${Window.winWidth * 0.09}px;
  margin-top: 10%;
  border-radius: 15px;
  align-self: center;
`;

const RegisterTextInputView = styled.View`
  flex: 1;
  margin-top: 10%;
  margin-bottom: 10%;
  align-self: center;
`;

const InputTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5%;
`;

const InputTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 5%;
`;

const LoginTitleText = styled.Text`
  /* font-family: Damascus; */
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '30px' : '20px'};
  align-self: flex-start;
  text-align: center;
  margin-top: 5%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: white;
  font-size: ${Platform.OS === 'ios' ? '16px' : '13px'};
  align-self: center;
  padding-vertical: ${Platform.OS === 'ios' ? '5%' : '4%'};
  padding-horizontal: ${Platform.OS === 'ios' ? '18%' : '17%'};
`;

const ErrorText = styled.Text`
  font-family: Bellota-Regular;
  color: red;
  align-self: center;
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 6%;
  margin-top: -4%;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-bottom: 5%;
`;

const ProfilePicImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: ${Window.winHeight * 0.44 / 2}px;
  border-width: ${Platform.OS === 'ios' ? '0.5px' : '0'};
  border-color: rgb(0, 104, 191);
`;

const RegisterTextInput = styled(Input)`
`;

export const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  Header,
  FullScrollView,
  ProfilePicView,
  RatingView,
  Divisor,
  RegisterTextInputView,
  InputTitleView,
  ModalView,
  InputTitleText,
  LoginTitleText,
  RegisterText,
  ErrorText,
  RegisterTouchableOpacity,
  ProfilePicImage,
  RegisterTextInput,
};
