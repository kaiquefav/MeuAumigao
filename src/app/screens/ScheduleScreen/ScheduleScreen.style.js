import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import PetCard from '../../components/screens/ScheduleScreen/PetCard/PetCard';
import Modal from 'react-native-modal';


const RegisterTextInput = styled(Picker)`
  width: ${Window.winWidth * 0.8}px;
  background-color: white; 
  padding-horizontal: 2%; 
  border-radius: 8px;
  border-right-width: 2px; 
  border-bottom-width: 2px; 
  border-color: rgba(0, 0, 0, 0.1);
  margin-bottom: ${Window.winHeight * 0.05}px;
`;

const Header = styled(PageHeader)`
`;

const PetsCards = styled(PetCard)`
`;

const ScheduleModal = styled(Modal)`
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const ColumnView = styled.View`
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
  padding-horizontal: 7%;
`;

const PetsCardsView = styled.ScrollView`
  margin-bottom: 10%;
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

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '23px' : '19px'};
  align-self: center;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-bottom: 20%;
`;


const PetNameTextView = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding-vertical: 3%;
`;

const PetTextView = styled.View`
  flex-direction: row;
  flex: 1;
  max-width: 60%;
`;

const PetNameText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(41, 41, 41);
  font-size: ${Platform.OS === 'ios' ? '22px' : '17px'};
  align-self: flex-start;
  margin-bottom: ${Platform.OS === 'ios' ? '3%' : '0%'};
`;

const PetNameSubText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(41, 41, 41);
  font-size: ${Platform.OS === 'ios' ? '17px' : '12px'};
  align-self: center;
`;

const ContainerTouchableOpacity = styled.TouchableOpacity`
  background-color: white;
  width: 100%;
  border-radius: 12px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-color: rgba(0, 0, 0, 0.08);
  flex-direction: row;
  align-items: center;
  padding-right: 3%;
`;

const PetImage = styled.Image`
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  height: 100%;
  width: 25%;
`;

const UserImage = styled.Image`
  margin-right: 4%;
  height: 100%;
  width: 25%;
`;


const ModalView = styled.View`
  background-color: #f1f1f1;
  padding-horizontal: ${Window.winWidth * 0.05}px;
  padding-vertical: ${Window.winHeight * 0.02}px;
  align-self: center;
  justify-content: center;
  border-radius: 15px;
`;

const ModalText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.015}px` : `${Window.winHeight * 0.015}px`};
  padding-horizontal: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.05}px` : `${Window.winWidth * 0.05}px`};
  max-width: ${Window.winWidth * 0.7}px;
  text-align: center;
  align-self: center;
`;

const ModalTouchableOpacityView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: ${Window.winHeight * 0.04}px;
  margin-bottom: ${Window.winHeight * 0.04}px;
`;

const ModalTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-top: ${Window.winHeight * 0.02}px;
`;

const ContactTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  align-items: flex-end;
  top: ${Window.winWidth * 0.03}px;
  right: ${Window.winWidth * 0.03}px;
  height: ${Window.winWidth * 0.08}px;
  width: ${Window.winWidth * 0.08}px;
`;

const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  Header,
  ScheduleModal,
  PetsCards,
  HeaderView,
  ColumnView,
  FullScrollView,
  PetsCardsView,
  RatingView,
  LoginTitleText,
  RegisterTouchableOpacity,
  RegisterTextInput,
  PetNameTextView,
  PetTextView,
  PetNameText,
  PetNameSubText,
  ContainerTouchableOpacity,
  PetImage,
  UserImage,
  ModalView,
  ModalText,
  ModalTouchableOpacityView,
  ModalTouchableOpacity,
  ContactTouchableOpacity,
  BackgroundImage,
};
