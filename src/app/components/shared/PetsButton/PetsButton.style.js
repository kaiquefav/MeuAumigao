import styled from 'styled-components/native';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';
import PetCard from '../../screens/HomeScreen/PetCard/PetCard';
import Carousel from 'react-native-snap-carousel';

const PetsCard = styled(PetCard)`
`;

const PetsCarousel = styled(Carousel)`
`;

const FullView = styled.View`
  flex: 1;
  margin-bottom: 20%;
`;

const PetsCarouselView = styled.View`
  margin-top: ${Window.winHeight * 0.03}px;
  margin-bottom: ${Window.winHeight * 0.04}px;
`;

const NoPetView = styled.View`
  padding-vertical: 7%;
  padding-horizontal: 5%;
`;

const PetTypeTouchableOpacityTextView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-horizontal: 5%;
`;

const PetTypeText = styled.Text`
  font-family: Bellota-Bold;
  color: black;
  font-size: ${Platform.OS === 'ios' ? '21px' : '16px'};
`;

const NoPetText = styled.Text`
  font-family: Bellota-Bold;
  color: #999999;
  text-align: center;
  font-size: ${Platform.OS === 'ios' ? '21px' : '16px'};
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

const PetTypeTouchableOpacity = styled.TouchableOpacity`
  background-color: ${(props) => (props.active ? '#0068bf' : 'white')};
  height: ${Window.winHeight * 0.1}px;
  width: ${Window.winWidth * 1}px;
  margin-top: 3%;
  justify-content: center;
  border-bottom-width: 3px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export {
  PetsCard,
  PetsCarousel,
  FullView,
  PetsCarouselView,
  NoPetView,
  PetTypeTouchableOpacityTextView,
  PetTypeText,
  NoPetText,
  SeeMoreTouchableOpacityText,
  SeeMoreTouchableOpacity,
  PetTypeTouchableOpacity,
};
