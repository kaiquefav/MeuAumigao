import styled from 'styled-components/native';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import PageHeader from '../../components/screens/PageHeader/PageHeader';
import { Input } from 'react-native-elements';

const Header = styled(PageHeader)`
`;

const HeaderView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const FullScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f1f1f1;
  padding-horizontal: 7%;
`;

const CheckboxView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${Window.winHeight * 0.07}px;
`;

const RegisterTextInputView = styled.View`
  flex: 1;
  margin-top: 15%;
  margin-bottom: 10%;
  align-self: flex-start;
`;

const InputTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5%;
`;

const LoginTitleText = styled.Text`
  font-family: Bellota-Bold;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '24px' : '18px'};
  align-self: center;
  text-align: center;
  margin-top: 8%;
`;

const CheckboxText = styled.Text`
  font-family: Bellota-Bold;
  font-size: ${Platform.OS === 'ios' ? '19px' : '15px'};
  color: ${(props) => (props.checked ? 'rgb(0, 104, 191)' : 'rgb(81, 81, 81)')};
`;

const InputTitleText = styled.Text`
  font-family: Bellota-Regular;
  color: rgb(81, 81, 81);
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 2%;
`;

const ErrorText = styled.Text`
  font-family: Bellota-Regular;
  color: red;
  align-self: center;
  font-size: ${Platform.OS === 'ios' ? '17px' : '14px'};
  margin-bottom: 6%;
  margin-top: -4%;
`;

const RegisterText = styled.Text`
  font-family: Bellota-Bold;
  color: #FFF;
  font-size: ${Platform.OS === 'ios' ? '17px' : '13px'};
  padding-vertical: ${Platform.OS === 'ios' ? '5%' : '3%'};
  padding-horizontal: ${Platform.OS === 'ios' ? '30%' : '25%'};
`;

const RegisterTouchableOpacity = styled.TouchableOpacity`
  background-color: rgb(0, 104, 191);
  align-self: center;
  border-width: 0.5px;
  border-radius: 5px;
  margin-bottom: 20%;
`;

const RegisterTextInput = styled(Input)`
`;

export {
  Header,
  HeaderView,
  FullScrollView,
  RegisterTextInputView,
  InputTitleView,
  CheckboxView,
  LoginTitleText,
  CheckboxText,
  InputTitleText,
  RegisterText,
  ErrorText,
  RegisterTouchableOpacity,
  RegisterTextInput,
};
