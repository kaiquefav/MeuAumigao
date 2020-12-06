import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import { Input } from 'react-native-elements';

const RegisterTextInput = styled(Input)`
`;

const RegisterPicker = styled(Picker)`
  width: ${Window.winWidth * 0.86}px;
  background-color: white; 
  padding-horizontal: 2%; 
  border-radius: 8px;
  border-right-width: 2px; 
  border-bottom-width: 2px; 
  border-color: rgba(0, 0, 0, 0.1);
  margin-bottom: ${Window.winHeight * 0.05}px;
  align-self: center;
`;

const Header = styled(PageHeader)`
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
  padding-horizontal: 7%;
`;

const CheckboxView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Window.winHeight * 0.07}px;
`;

const ModalView = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: white; 
  padding-horizontal: ${Platform.OS === 'ios' ? '4%' : '2%'};
  padding-vertical: ${Window.winHeight * 0.04}px;
  border-radius: 8px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
  width: 90%;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '23px' : '19px'};
  align-self: center;
  text-align: center;
  margin-top: 15%;
  margin-bottom: 15%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '20px' : '15px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.015}px` : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? '25%' : '20%'};
  align-self: center;
`;

const PictureButtonText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '18px' : '14px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.015}px` : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? '22%' : '17%'};
  align-self: center;
`;

const CheckboxText = styled.Text`
  font-family: Bellota-Bold;
  font-size: ${Platform.OS === 'ios' ? '19px' : '15px'};
  color: ${(props) => (props.checked ? 'rgb(0, 104, 191)' : 'rgb(81, 81, 81)')};
`;

const InputTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 2%;
`;

const PictureModalText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '20px' : '16px'};
  margin-bottom: 2%;
  text-align: center;
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
  margin-bottom: 20%;
`;

const ProfilePicView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  align-self: center;
  justify-content: center;
  margin-bottom: ${Window.winHeight * 0.05}px;
`;

const BackArrowImage = styled.Image`
  height: ${Window.winHeight * 0.04}px;
  width: ${Window.winWidth * 0.04}px;
  margin-right: 5%;
`;

const ProfilePicImage = styled.Image`
  height: ${Window.winHeight * 0.15}px;
  width: ${Window.winHeight * 0.15}px;
  border-radius: ${Window.winHeight * 0.44 / 2}px;
`;

export const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  RegisterTextInput,
  RegisterPicker,
  Header,
  HeaderView,
  ModalView,
  FullScrollView,
  CheckboxView,
  ProfilePicView,
  CheckboxText,
  LoginTitleText,
  RegisterText,
  PictureButtonText,
  InputTitleText,
  PictureModalText,
  ErrorText,
  RegisterTouchableOpacity,
  BackArrowImage,
  ProfilePicImage,
};
