import styled from 'styled-components/native';
import * as Window from '../../../../utils/windowDimensions/WindowDimensions';

const PetNameTextView = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding-vertical: 3%;
`;

const PetTextView = styled.View`
  flex-direction: row;
  flex: 1;
  max-width: 95%;
  /* background-color: lime; */
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

const ContactTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  align-items: flex-end;
  top: ${Window.winWidth * 0.03}px;
  right: ${Window.winWidth * 0.03}px;
  height: ${Window.winWidth * 0.08}px;
  width: ${Window.winWidth * 0.08}px;
`;

const PetImage = styled.Image`
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-right: 4%;
  height: 100%;
  width: 35%;
`;

export {
  PetNameTextView,
  PetTextView,
  ContainerTouchableOpacity,
  ContactTouchableOpacity,
  PetNameText,
  PetNameSubText,
  PetImage,
};
