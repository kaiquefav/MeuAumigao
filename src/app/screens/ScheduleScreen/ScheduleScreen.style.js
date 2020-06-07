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

export {
  Header,
  PetsCards,
  HeaderView,
  FullScrollView,
  PetsCardsView,
  LoginTitleText,
  RegisterTouchableOpacity,
  RegisterTextInput,
};
