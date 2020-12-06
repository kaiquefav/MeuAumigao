import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';

const TextInput = styled(Input)`
`;

const AddMarkerModal = styled(Modal)`
`;

const Header = styled(PageHeader).attrs({
  logoHeight: Window.winHeight * 0.15,
  logoWidth: Window.winWidth * 0.45,
})`
`;

const HeaderView = styled.View`
  height: ${Window.winHeight * 0.17}px;
  background-color: rgba(255, 255, 255, 0.4);
  padding-horizontal: 7%;
  z-index: 200;
`;

const FullView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const ModalView = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: ${Window.winWidth * 0.8}px;
  border-radius: ${Window.winWidth * 0.05}px;
  background-color: rgb(245, 245, 245);
  justify-content: flex-start;
  align-self: center;
  padding-vertical: 6%;
  padding-horizontal: 10%;
`;

const ModalInputTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 2%;
  margin-left: ${Window.winWidth * -0.04}px;
`;

const ModalTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '20px' : '17px'};
  align-self: center;
  text-align: center;
  margin-bottom: 8%;
`;

const PinDescriptionText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '18px' : '16px'};
  align-self: center;
  text-align: center;
  margin-bottom: ${Window.winHeight * 0.02}px;
`;

const ErrorText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(235, 64, 52);
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  align-self: center;
  text-align: center;
  margin-top: ${Window.winHeight * 0.01}px;
  margin-bottom: ${Window.winHeight * 0.01}px;
`;

const AddStrayAnimalButton = styled.TouchableOpacity`
  height: ${Window.winHeight * 0.055}px;
  width: ${Window.winHeight * 0.055}px;
  background-color: rgb(0, 104, 191);
  border-radius: ${Window.winHeight * 0.055}px;
  position: absolute;
  top: ${Window.winWidth * 0.13}px;
  right: ${Window.winWidth * 0.05}px;
  z-index: 300;
  align-items: center;
  justify-content: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  height: ${Window.winHeight * 0.055}px;
  width: ${Window.winHeight * 0.3}px;
  background-color: rgb(0, 104, 191);
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: ${Window.winHeight * 0.02}px;
  border-width: 0.5px;
  border-radius: 5px;
`;

export {
  TextInput,
  AddMarkerModal,
  Header,
  HeaderView,
  FullView,
  ModalView,
  ModalInputTitleText,
  ModalTitleText,
  PinDescriptionText,
  ErrorText,
  AddStrayAnimalButton,
  ConfirmButton,
};
