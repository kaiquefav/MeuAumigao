import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import PetCard from '../../components/screens/ScheduleScreen/PetCard/PetCard';


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

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f1f1f1;
  padding-horizontal: 7%;
`;

const PetsCardsView = styled.ScrollView`
  margin-bottom: 10%;
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
  flex-direction: column;
  flex: 1;
  margin-top: 5%;
  max-width: 80%;
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
  align-self: flex-start;
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
  margin-right: 4%;
  height: 100%;
  width: 35%;
`;

export {
  Header,
  PetsCards,
  HeaderView,
  FullScrollView,
  PetNameTextView,
  LoginTitleText,
  RegisterTouchableOpacity,
  RegisterTextInput,
  PetsCardsView,
  PetTextView,
  PetNameText,
  PetNameSubText,
  ContainerTouchableOpacity,
  PetImage,
};
