import styled from 'styled-components/native';
import * as Window from '../../../../utils/windowDimensions/WindowDimensions';

const PetNameTextView = styled.View`
  flex: 1;
  width: ${Window.winWidth * 0.8}px;
  align-items: center;
  justify-content: center;
`;

const PetNameText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(61, 61, 61);
  font-size: ${Platform.OS === 'ios' ? '25px' : '20px'};
`;

const ContainerTouchableOpacity = styled.TouchableOpacity`
  background-color: white;
  height: ${Window.winHeight * 0.5}px;
  width: ${Window.winWidth * 0.82}px;
  border-radius: 40px;
  border-width: 1px;
  border-color: rgb(180, 180, 180);
  align-items: center;
  align-self: center;
  justify-content: flex-start;
`;

const PetImage = styled.Image`
  align-self: center;
  height: 80%;
  width: 100%;
  border-radius: 38px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-color: lime;
`;

export {
  PetNameTextView,
  ContainerTouchableOpacity,
  PetNameText,
  PetImage,
};
