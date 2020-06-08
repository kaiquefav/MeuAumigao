import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';

const Header = styled(PageHeader)`
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const CardsFullView = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10%;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: rgb(250, 250, 250);
  padding-horizontal: 7%;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '23px' : '19px'};
  align-self: center;
  text-align: center;
  margin-top: 15%;
  margin-bottom: 10%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '20px' : '15px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.029}px` : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? '30%' : '25%'};
  align-self: center;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-bottom: 20%;
`;


const PetsCardsView = styled.View`
  margin-right: 5%;
`;

const PetNameText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(41, 41, 41);
  font-size: ${Platform.OS === 'ios' ? '22px' : '17px'};
  align-self: center;
  margin-bottom: ${Platform.OS === 'ios' ? Window.winHeight * 0.01 : '2%'};
  margin-top: ${Platform.OS === 'ios' ? Window.winHeight * 0.01 : '2%'};
`;

const ContainerTouchableOpacity = styled.TouchableOpacity`
  margin-top: ${Platform.OS === 'ios' ? Window.winHeight * 0.01 : '2%'};
  background-color: white;
  width: ${Window.winHeight * 0.2}px;
  border-radius: 12px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-color: rgba(0, 0, 0, 0.08);
  flex-direction: column;
  align-items: center;
`;

const PetImage = styled.Image`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: ${Window.winHeight * 0.2}px;
  width: 100%;
`;

export {
  Header,
  HeaderView,
  CardsFullView,
  FullScrollView,
  LoginTitleText,
  RegisterText,
  RegisterTouchableOpacity,
  PetsCardsView,
  PetNameText,
  ContainerTouchableOpacity,
  PetImage,
};
