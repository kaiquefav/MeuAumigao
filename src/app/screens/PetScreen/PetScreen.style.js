import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import { Picker } from 'native-base';
import PageHeader from '../../components/screens/PageHeader/PageHeader';

const Header = styled(PageHeader)`
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
  padding-horizontal: 7%;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f1f1f1;
  /* padding-horizontal: 7%; */
`;

const PetImageView = styled.View`
  flex: 1;
`;

const TextView = styled.View`
  margin-top: ${Window.winHeight * 0.03}px;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '30px' : '24px'};
  align-self: center;
  text-align: center;
  margin-top: 5%;
`;

const LoginSubTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '23px' : '18px'};
  padding-horizontal: 7%;
`;

const LoginSubText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '18px' : '15px'};
  margin-top: 1%;
  padding-horizontal: 7%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '20px' : '15px'};
  padding-vertical: ${Platform.OS === 'ios' ? `${Window.winHeight * 0.029}px` : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? `${Window.winWidth * 0.08}px` : '25%'};
  max-width: ${Window.winWidth * 0.7}px;
  align-self: center;
  text-align: center;
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-top: ${Window.winHeight * 0.1}px;
  margin-bottom: ${Window.winHeight * 0.1}px;
`;

const PetImage = styled.Image`
  margin-top: 7%;
  height: ${Window.winHeight * 0.4}px;
  width: ${Window.winWidth * 1}px;
`;

export {
  Header,
  HeaderView,
  FullScrollView,
  PetImageView,
  TextView,
  LoginTitleText,
  LoginSubTitleText,
  LoginSubText,
  RegisterText,
  RegisterTouchableOpacity,
  PetImage,
};
