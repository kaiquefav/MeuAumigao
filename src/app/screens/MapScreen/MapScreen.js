import React from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Linking } from 'react-native';
import moment from 'moment';
import * as S from './MapScreen.style';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import { Icon } from 'native-base';
import * as Window from '../../utils/windowDimensions/WindowDimensions';
import * as firebase from 'firebase';
import { getRandom } from '../../utils/mathFunctions';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      fontLoaded: false,
      isModalVisible: false,
      isPinModalVisible: false,
      pins: [],
      currentPinDescription: '',
      currentPinLatitude: '',
      currentPinLongitude: '',
      city: '',
      district: '',
      street: '',
      description: '',
      refreshPin: 1,
      isAddLoading: false,
      emptyError: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../assets/fonts/Bellota-Bold.ttf'),
    })
    let { status } = await Location.requestPermissionsAsync();
    let auxCoords = {};
    if (status !== 'granted') {
      this.props.navigation.goBack();
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    auxCoords.latitude = location.coords.latitude;
    auxCoords.longitude = location.coords.longitude;
    this.setState({ location: auxCoords });
    await this.loadAnimalPins();
    this.setState({ fontLoaded: true });
  }

  async handleAdress() {
    const { street, district, city } = this.state;
    try {
      let response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=d870d7a106644d1192c84c5c7315e8d8&q=${street},${district},${city},brazil&pretty=1`,
      );
      const result = await response.json();
      if (result.results.length > 0) return result.results[0].geometry;
    } catch (error) {
      console.error(error);
    }
  }

  async loadAnimalPins() {
    const auxPins = [];
    await firebase.database().ref(`animalsPins/`).once('value',
      (snapshot) => {
        if (snapshot.val()) Object.entries(snapshot.val()).forEach((element) => auxPins.push(element))
      });
    auxPins.forEach(async (element) => {
      await this.handleDeletePin(element)
    })
    this.setState({ pins: auxPins });
  }

  async addMarker() {
    const time = moment().format();
    const coords = await this.handleAdress();
    try {
      await firebase.database().ref('animalsPins/' + `${getRandom()}`).set([{
        latitude: coords.lat,
        longitude: coords.lng,
      }, this.state.description, time]);
    } catch (err) {
      console.log(err.message)
    }
  }

  async handleDeletePin(pin) {
    let today = moment().format(); //today
    today = moment(today).subtract(14, 'd').format();
    const result = moment(pin[1][2]).isSameOrAfter(today);
    if (!result) firebase.database().ref('animalsPins/' + `${pin[0]}`).remove();
  }

  modalComponent = () => (
    <S.AddMarkerModal
      isVisible={this.state.isModalVisible}
      onBackdropPress={() => this.setState({ isModalVisible: false })}
    >
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <S.ModalView onPress={() => Keyboard.dismiss()}>
          <S.ModalTitleText>Adicione um marcador neste local</S.ModalTitleText>

          <S.ModalInputTitleText>Cidade</S.ModalInputTitleText>
          <S.TextInput
            ref={(ref) => { this.city = ref; }}
            containerStyle={{ alignSelf: 'center', width: Window.winWidth * 0.7, paddingHorizontal: 0, marginBottom: Window.winHeight * -0.02 }}
            inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 16 : 14 }}
            inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
            autoCapitalize='words'
            keyboardType='default'
            maxLength={50}
            placeholder='Entre com a Cidade'
            placeholderTextColor={'#919191'}
            value={this.state.city}
            onChangeText={(input) => { this.setState({ city: input }) }}
            clearButtonMode={'while-editing'}
            onSubmitEditing={() => this.district.focus()}
          />

          <S.ModalInputTitleText>Bairro</S.ModalInputTitleText>
          <S.TextInput
            ref={(ref) => { this.district = ref; }}
            containerStyle={{ alignSelf: 'center', width: Window.winWidth * 0.7, paddingHorizontal: 0, marginBottom: Window.winHeight * -0.02 }}
            inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 16 : 14 }}
            inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
            autoCapitalize='words'
            keyboardType='default'
            maxLength={50}
            placeholder='Entre com o Bairro'
            placeholderTextColor={'#919191'}
            value={this.state.district}
            onChangeText={(input) => { this.setState({ district: input }) }}
            clearButtonMode={'while-editing'}
            onSubmitEditing={() => this.street.focus()}
          />

          <S.ModalInputTitleText>Rua</S.ModalInputTitleText>
          <S.TextInput
            ref={(ref) => { this.street = ref; }}
            containerStyle={{ alignSelf: 'center', width: Window.winWidth * 0.7, paddingHorizontal: 0, marginBottom: Window.winHeight * -0.015 }}
            inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 16 : 14 }}
            inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
            autoCapitalize='words'
            keyboardType='default'
            maxLength={50}
            placeholder='Entre com a Rua'
            placeholderTextColor={'#919191'}
            value={this.state.street}
            onChangeText={(input) => { this.setState({ street: input }) }}
            clearButtonMode={'while-editing'}
            onSubmitEditing={() => this.descriptionInput.focus()}
          />

          <S.ModalInputTitleText>Descrição</S.ModalInputTitleText>
          <S.TextInput
            ref={(ref) => { this.descriptionInput = ref; }}
            containerStyle={{ alignSelf: 'center', width: Window.winWidth * 0.7, paddingHorizontal: 0, marginBottom: Window.winHeight * -0.015 }}
            inputStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 16 : 14 }}
            inputContainerStyle={{ backgroundColor: 'white', paddingHorizontal: '2%', borderRadius: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }}
            keyboardType='default'
            maxLength={100}
            multiline
            autoCorrect={true}
            spellCheck={true}
            autoCapitalize='sentences'
            placeholder='Descrição do amigão (máx 100 caracteres)'
            placeholderTextColor={'#919191'}
            value={this.state.description}
            onChangeText={(input) => { this.setState({ description: input }) }}
            style={{ maxHeight: Window.winHeight * 0.07 }}
          />

          {this.state.emptyError && <S.ErrorText>Preencha todos os campos!</S.ErrorText>}

          <S.ConfirmButton
            disabled={this.state.isAddLoading}
            onPress={async () => {
              const { street, district, city, description } = this.state;
              if ((street.length > 0) && (district.length > 0) && (city.length > 0) && (description.length > 0)) {
                this.setState({
                  isAddLoading: true,
                  emptyError: false,
                });
                try {
                  await this.addMarker();
                  await this.loadAnimalPins();
                } catch (error) {
                  console.log(error);
                } finally {
                  this.setState({
                    isModalVisible: false,
                    isAddLoading: false,
                    street: '',
                    district: '',
                    city: '',
                    description: '',
                  });
                }
              } else this.setState({ emptyError: true });
            }}>
            {this.state.isAddLoading
              ? <ActivityIndicator size='small' color='white' />
              : <S.ModalInputTitleText style={{ color: 'white', marginLeft: 0, marginBottom: 0 }}>Adicionar</S.ModalInputTitleText>}
          </S.ConfirmButton>
          <S.ConfirmButton
            style={{ backgroundColor: 'rgb(87, 87, 87)' }}
            disabled={this.state.isAddLoading}
            onPress={() => this.setState({ isModalVisible: false })}>
            <S.ModalInputTitleText style={{ color: 'white', marginLeft: 0, marginBottom: 0 }}>Cancelar</S.ModalInputTitleText>
          </S.ConfirmButton>
        </S.ModalView >
      </KeyboardAvoidingView>
    </S.AddMarkerModal >
  )

  pinModalComponent = () => (
    <S.AddMarkerModal
      isVisible={this.state.isPinModalVisible}
      onBackdropPress={() => this.setState({ isPinModalVisible: false })}
    >
      <S.ModalView>
        <S.PinDescriptionText>{this.state.currentPinDescription}</S.PinDescriptionText>

        <S.ConfirmButton
          disabled={this.state.isAddLoading}
          onPress={() => this.handlOpenMaps(this.state.currentPinLatitude, this.state.currentPinLongitude)}>
          <S.ModalInputTitleText style={{ color: 'white', marginLeft: 0, marginBottom: 0 }}>Rotas</S.ModalInputTitleText>
        </S.ConfirmButton>
        <S.ConfirmButton
          style={{ backgroundColor: 'rgb(87, 87, 87)' }}
          disabled={this.state.isAddLoading}
          onPress={() => this.setState({ isPinModalVisible: false })}>
          <S.ModalInputTitleText style={{ color: 'white', marginLeft: 0, marginBottom: 0 }}>Cancelar</S.ModalInputTitleText>
        </S.ConfirmButton>
      </S.ModalView >
    </S.AddMarkerModal >
  )

  handlOpenMaps(lat, lng) {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
  }

  render() {
    const { location, pins, refreshPin } = this.state;
    return (
      <>
        {this.modalComponent()}
        {this.pinModalComponent()}
        {this.state.fontLoaded ?
          (<S.FullView >

            <S.HeaderView>
              <S.Header
                backButton={false}
                icon={true}
                onPress={() => this.props.navigation.goBack()}
              />
            </S.HeaderView>

            <MapView
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 100,
              }}
              loadingEnabled={true}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
              }}
              showsUserLocation
              showsMyLocationButton
              provider={PROVIDER_GOOGLE}
              // onMapRead={() => this.setState({ refreshPin: 0 })}
            >
              {pins && pins.map((element) => (
                <Marker
                  key={element[0]}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: element[1][0].latitude,
                    longitude: element[1][0].longitude,
                  }}
                  icon={require('../../assets/png/ic_pet_location3.png')}
                  onPress={() => {
                    this.setState({ currentPinDescription: element[1][1] })
                    this.setState({ currentPinLatitude: element[1][0].latitude })
                    this.setState({ currentPinLongitude: element[1][0].longitude })
                    this.setState({ isPinModalVisible: true });
                  }}
                />
              ))}
            </MapView>

            <S.AddStrayAnimalButton onPress={() => this.setState({ isModalVisible: true })}>
              <Icon
                type="MaterialCommunityIcons"
                name="bookmark-plus"
                style={{
                  fontSize: 20,
                  color: 'rgb(255, 255, 255)',
                }}
              />
            </S.AddStrayAnimalButton>

          </S.FullView>)
          : (<ActivityIndicator style={{ flex: 1 }} size='small' color='rgb(0, 104, 191)' />)}
      </>
    );
  }
}

export default MapScreen;
