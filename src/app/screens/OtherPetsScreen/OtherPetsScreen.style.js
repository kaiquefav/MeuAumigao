import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import { Platform } from 'react-native';

const Header = styled(PageHeader)`
`;

const RacePicker = styled(Picker)`
  position: absolute;
  right: ${Platform.OS === 'ios' ? '0px' : '0px'};
  z-index: 999;
  padding-top: ${Platform.OS === 'ios' ? '40px' : '50px'};
  height: ${Platform.OS === 'ios' ? '39px' : '35px'};
  width: ${Platform.OS === 'ios' ? '39px' : '35px'};
  top: ${Platform.OS === 'ios' ? '-70px' : '53px'};
`;

const HeaderView = styled.View`
  flex: 1;
  justify-content: center;
`;

const CardsFullView = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10%;
  justify-content: center;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
  padding-horizontal: 4%;
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
  margin-horizontal: 4%;
  margin-top: 8%;
`;

const PetNameText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(41, 41, 41);
  font-size: ${Platform.OS === 'ios' ? '22px' : '17px'};
  align-self: center;
  margin-bottom: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.01}px` : '2%'};
  margin-top: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.01}px` : '2%'};
`;

const ContainerTouchableOpacity = styled.TouchableOpacity`
  margin-top: ${Platform.OS === 'ios' ? Window.winHeight * 0.01 : '2%'};
  background-color: white;
  width: ${Window.winHeight * 0.19}px;
  border-radius: 12px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-color: ${(props) => (props.isRecommended ? 'rgb(254, 197, 57)' : 'rgba(0, 0, 0, 0.08)')};
  flex-direction: column;
  align-items: center;
`;

const PetImage = styled.Image`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: ${Window.winHeight * 0.2}px;
  width: 100%;
`;

const RecommendedFlagImage = styled.Image`
  position: absolute;
  z-index: 500;
  height: ${Window.winHeight * 0.06}px;
  width: ${Window.winHeight * 0.06}px;
  top: 0px;
  right: 0px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 9px;
`;

const BackArrowImage = styled.Image`
  height: ${Window.winHeight * 0.04}px;
  width: ${Window.winWidth * 0.04}px;
  margin-right: 5%;
`;

export const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  Header,
  RacePicker,
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
  BackArrowImage,
  RecommendedFlagImage,
};
