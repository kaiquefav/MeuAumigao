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
  background-color: #f1f1f1;
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
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '17px' : '13px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.04}px` : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.07}px` : '25%'};
`;

const AddPetTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-bottom: ${Window.winHeight * 0.1}px;
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
};
