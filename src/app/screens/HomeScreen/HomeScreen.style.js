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
  margin-top: 10%;
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
  margin-top: ${Platform.OS === 'ios' ? '5%' : '3%'};
`;

const SeeMoreTouchableOpacityText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '19px' : '14px'};
  text-decoration-line: underline;
  align-self: center;
  text-align: center;
`;

const SeeMoreTouchableOpacity = styled.TouchableOpacity`
  align-self: center;
  margin-top: ${Platform.OS === 'ios' ? '0%' : '-3%'};
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
  SeeMoreTouchableOpacityText,
  SeeMoreTouchableOpacity,
};
