import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker, DatePicker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import Modal from 'react-native-modal';


const Header = styled(PageHeader)`
`;

const ScheduleModal = styled(Modal)`
`;

const ScheduleModalDatePicker = styled(DatePicker)`
`;

const DatePickerView = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-color: #c1c1c1;
  border-radius: 1px;
  margin-top: ${Window.winHeight * 0.04}px;
  padding-vertical: ${Window.winHeight * 0.01}px;
  padding-horizontal: ${Window.winWidth * 0.08}px;
  justify-content: space-between;
  align-items: center;
`;

const Divisor = styled.View`
  background-color: rgba(0, 0, 0, 0.1);
  width: ${Window.winWidth * 0.9}px;
  height: 1px;
  margin-top: ${Window.winHeight * 0.03}px;
  margin-bottom: ${Window.winHeight * 0.03}px;
  align-self: center;
`;

const DatePickerButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Window.winHeight * 0.04}px;
  margin-bottom: ${Window.winHeight * 0.04}px;
`;

const DatePickerText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '19px' : '19px'};
`;

const DatePickerTouchableOpacity = styled.TouchableOpacity`
`;

const ModalView = styled.View`
  background-color: #f1f1f1;
  padding-horizontal: ${Window.winWidth * 0.08}px;
  padding-vertical: ${Window.winHeight * 0.03}px;
  align-self: center;
  justify-content: center;
  border-radius: 15px;
`;

const ModalText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.015}px` : `${Window.winHeight * 0.015}px`};
  padding-horizontal: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.07}px` : `${Window.winWidth * 0.07}px`};
  max-width: ${Window.winWidth * 0.7}px;
  text-align: center;
`;

const ModalTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
  padding-horizontal: 7%;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
  /* padding-horizontal: 7%; */
`;

const AllTextView = styled.View`
  background-Color: rgba(255, 255, 255, 0.4);
  padding-bottom: ${Window.winHeight * 0.05}px;
`;

const PetImageView = styled.View`
  flex: 1;
`;

const TextView = styled.View`
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '30px' : '24px'};
  align-self: center;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const LoginSubTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '23px' : '18px'};
  padding-horizontal: 7%;
`;

const LoginSubText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '18px' : '15px'};
  margin-top: 1%;
  padding-horizontal: 7%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '20px' : '15px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.029}px` : `${Window.winHeight * 0.015}px`};
  padding-horizontal: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.08}px` : `${Window.winWidth * 0.08}px`};
  max-width: ${Window.winWidth * 0.7}px;
  align-self: center;
  text-align: center;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-top: ${Window.winHeight * 0.07}px;
  margin-bottom: ${Window.winHeight * 0.1}px;
  flex: 1;
`;

const PetImage = styled.Image`
  margin-top: 7%;
  height: ${Window.winHeight * 0.4}px;
  width: ${Window.winWidth * 1}px;
`;

export const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  Header,
  ScheduleModal,
  ScheduleModalDatePicker,
  DatePickerView,
  DatePickerText,
  DatePickerTouchableOpacity,
  ModalText,
  ModalTouchableOpacity,
  DatePickerButtonsView,
  Divisor,
  HeaderView,
  ModalView,
  FullScrollView,
  PetImageView,
  AllTextView,
  TextView,
  LoginTitleText,
  LoginSubTitleText,
  LoginSubText,
  RegisterText,
  RegisterTouchableOpacity,
  PetImage,
};
