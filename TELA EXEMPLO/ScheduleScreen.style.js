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

export {
  Header,
  HeaderView,
  FullScrollView,
  LoginTitleText,
  RegisterText,
  RegisterTouchableOpacity,
};
