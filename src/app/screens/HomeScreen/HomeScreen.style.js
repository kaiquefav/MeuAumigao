import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import PetCard from '../../components/screens/HomeScreen/PetCard/PetCard';
import Carousel from 'react-native-snap-carousel';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import PetsButton from '../../components/shared/PetsButton/PetsButton';
import { LinearGradient } from 'expo-linear-gradient';

const Header = styled(PageHeader)`
`;

const PetsCarousel = styled(Carousel)`
`;

const PetsCard = styled(PetCard)`
`;

const PetButton = styled(PetsButton)`
`;

const FullView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
`;

const LinearView = styled(LinearGradient)`
  flex: 1;
`;

const PetButtonView = styled.View`
  margin-top: ${Window.winHeight * 0.05}px;
`;

const PetsCarouselView = styled.View`
  margin-top: ${Window.winHeight * 0.05}px;
  margin-bottom: ${Window.winHeight * 0.04}px;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '25px' : '20px'};
  align-self: center;
  text-align: center;
  margin-top: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.035}px` : '3%'};
`;

const AddPetText = styled.Text`
  font-family: Bellota-Bold;
  color: #000;
  font-size: ${Platform.OS === 'ios' ? '40px' : '30px'};
  align-self: center;
`;

const AddPetTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.025}px` : '5%'};
  right: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.03}px` : '5%'};
  height: ${Window.winHeight * 0.05}px;
  width: ${Window.winHeight * 0.05}px;
  z-index: 500;
`;

const LogoutTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  /* flex-direction: row; */
  top: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.04}px` : '5%'};
  left: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.04}px` : '5%'};
  height: ${Window.winHeight * 0.05}px;
  width: ${Window.winHeight * 0.05}px;
  z-index: 500;
`;

const BackgroundImage = styled.ImageBackground`
  height: ${Window.winHeight * 1}px;
  width: ${Window.winWidth * 1}px;
  position: absolute;
`;

export {
  Header,
  PetsCarousel,
  PetsCard,
  PetButton,
  FullView,
  LinearView,
  PetButtonView,
  PetsCarouselView,
  LoginTitleText,
  AddPetText,
  AddPetTouchableOpacity,
  LogoutTouchableOpacity,
  BackgroundImage,
};
