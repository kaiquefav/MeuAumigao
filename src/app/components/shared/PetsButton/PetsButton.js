import React from 'react';
import * as S from './PetsButton.style';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';
import { Icon } from 'native-base';
import { useScrollToTop } from '@react-navigation/native';

const NUM_TO_RENDER = 12;

class PetsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalType: '',
      dogs: [],
      cats: [],
      others: [],
      allDogs: [],
      allCats: [],
      allOthers: [],
      active: false,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    const { allPets, recomendedPets } = this.props;
    await Font.loadAsync({
      'Bellota-Light': require('../../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.getAnimalsByType(allPets, recomendedPets);
    this.setState({ fontLoaded: true });
  }

  getAnimalsByType = async (allPets, recomendedPets) => {
    if (this.props.userType === 1) {
      let auxDogs = [];
      let auxCats = [];
      let auxOthers = [];
      recomendedPets.forEach((type, index) => {
        if (index === 0) type.forEach((animal) => { auxDogs.push(Object.values(animal)); })
        if (index === 1) type.forEach((animal) => { auxCats.push(Object.values(animal)); })
        if (index === 2) type.forEach((animal) => { auxOthers.push(Object.values(animal)); })
      });
      this.setState({ dogs: auxDogs.slice(0, NUM_TO_RENDER) });
      this.setState({ cats: auxCats });
      this.setState({ others: auxOthers });
      this.setState({ allDogs: Object.values(allPets[0]) })
      this.setState({ allCats: Object.values(allPets[1]) })
      this.setState({ allOthers: Object.values(allPets[2]) })
    }
    else {
      let aux = [];
      let auxDogs = [];
      let auxCats = [];
      let auxOthers = [];
      allPets[0].forEach((pet, index) => {
        aux = [pet.id, pet.data]
        auxDogs.push(aux);
      })
      allPets[1].forEach((pet, index) => {
        aux = [pet.id, pet.data]
        auxCats.push(aux);
      })
      allPets[2].forEach((pet, index) => {
        aux = [pet.id, pet.data]
        auxOthers.push(aux);
      })
      if (allPets[0]) this.setState({ dogs: auxDogs.slice(0, NUM_TO_RENDER) });
      if (allPets[1]) this.setState({ cats: auxCats.slice(0, NUM_TO_RENDER) });
      if (allPets[2]) this.setState({ others: auxOthers.slice(0, NUM_TO_RENDER) });
      this.setState({ allDogs: allPets[0] })
      this.setState({ allCats: allPets[1] })
      this.setState({ allOthers: allPets[2] })
    }

  }

  renderItem = ({ item, index }) => {
    this.props.scrollTo();
    return (
      <S.PetsCard
        pet={item}
        onPress={() => this.props.routes.navigation.navigate('Pet', { userData: this.props.userData, pet: { id: item[0], data: item[1] }, userType: this.props.userType, userID: this.props.userID, animalType: this.state.animalType })}
        isRecommended={item[2]}
      />
    );
  }

  render() {
    return (
      this.state.fontLoaded ?
        (<S.FullView>

          {((this.state.animalType === '') || (this.state.animalType === 0)) &&
            (<S.PetTypeTouchableOpacity active={this.state.active} onPress={() => {
              if (this.state.animalType !== 0) this.setState({ animalType: 0 }, () => this.setState({ active: !this.state.active }));
              else this.setState({ animalType: '' }, () => this.setState({ active: !this.state.active }));
              this.forceUpdate();
            }}>
              <S.PetTypeTouchableOpacityTextView>

                {this.state.animalType === 0
                  ? (<>
                    <Icon
                      type="FontAwesome5"
                      name="dog"
                      style={{
                        fontSize: 25,
                        color: 'white',
                        alignSelf: 'flex-start',
                        marginRight: '4.8%',
                      }}
                    />
                    <S.PetTypeText style={{ color: 'white' }}>Cães</S.PetTypeText>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-down"
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 23,
                        color: 'white',
                        marginRight: '5%',
                      }}
                    />
                  </>)
                  : (<>
                    <Icon
                      type="FontAwesome5"
                      name="dog"
                      style={{
                        fontSize: 25,
                        color: 'black',
                        alignSelf: 'flex-start',
                        marginRight: '4.8%',
                      }}
                    />
                    <S.PetTypeText>Cães</S.PetTypeText>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-back"
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 23,
                        color: 'black',
                        marginRight: '5%',
                      }}
                    />
                  </>)
                }

              </S.PetTypeTouchableOpacityTextView>
            </S.PetTypeTouchableOpacity>)}

          {((this.state.animalType === '') || (this.state.animalType === 1)) &&
            (<S.PetTypeTouchableOpacity active={this.state.active} onPress={() => {
              this.props.scrollTo();
              if (this.state.animalType !== 1) this.setState({ animalType: 1 }, () => this.setState({ active: !this.state.active }));
              else this.setState({ animalType: '' }, () => this.setState({ active: !this.state.active }));
              this.forceUpdate();
            }} >
              <S.PetTypeTouchableOpacityTextView>

                {this.state.animalType === 1
                  ? (<>
                    <Icon
                      type="FontAwesome5"
                      name="cat"
                      style={{
                        fontSize: 25,
                        color: 'white',
                        alignSelf: 'flex-start',
                        marginRight: '5%',
                      }}
                    />
                    <S.PetTypeText style={{ color: 'white' }}>Gatos</S.PetTypeText>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-down"
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 23,
                        color: 'white',
                        marginRight: '5%',
                      }}
                    />
                  </>)
                  : (<>
                    <Icon
                      type="FontAwesome5"
                      name="cat"
                      style={{
                        fontSize: 25,
                        color: 'black',
                        alignSelf: 'flex-start',
                        marginRight: '5%',
                      }}
                    />
                    <S.PetTypeText>Gatos</S.PetTypeText>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-back"
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 23,
                        color: 'black',
                        marginRight: '5%',
                      }}
                    />
                  </>)
                }

              </S.PetTypeTouchableOpacityTextView>
            </S.PetTypeTouchableOpacity>)}


          {((this.state.animalType === '') || (this.state.animalType === 2)) &&
            (<S.PetTypeTouchableOpacity active={this.state.active} onPress={() => {
              if (this.state.animalType !== 2) this.setState({ animalType: 2 }, () => this.setState({ active: !this.state.active }));
              else this.setState({ animalType: '' }, () => this.setState({ active: !this.state.active }));
              this.forceUpdate();
            }} >
              <S.PetTypeTouchableOpacityTextView>
                {this.state.animalType === 2
                  ? (<>
                    <Icon
                      type="FontAwesome5"
                      name="hippo"
                      style={{
                        fontSize: 23,
                        color: 'white',
                        alignSelf: 'flex-start',
                        marginRight: '4%',
                      }}
                    />
                    <S.PetTypeText style={{ color: 'white' }}>Outros</S.PetTypeText>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-down"
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 23,
                        color: 'white',
                        marginRight: '5%',
                      }}
                    />
                  </>)
                  : (<>
                    <Icon
                      type="FontAwesome5"
                      name="hippo"
                      style={{
                        fontSize: 23,
                        color: 'black',
                        alignSelf: 'flex-start',
                        marginRight: '4%',
                      }}
                    />
                    <S.PetTypeText>Outros</S.PetTypeText>
                    <Icon
                      type="Ionicons"
                      name="ios-arrow-back"
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 23,
                        color: 'black',
                        marginRight: '5%',
                      }}
                    />
                  </>)
                }

              </S.PetTypeTouchableOpacityTextView>
            </S.PetTypeTouchableOpacity>)}



          {this.state.animalType === 0 &&
            (
              this.state.dogs.length > 0
                ?
                (<>
                  <S.PetsCarouselView>
                    <S.PetsCarousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.dogs}
                      renderItem={this.renderItem}
                      sliderWidth={Window.winWidth * 1}
                      itemWidth={Window.winWidth * 0.82}
                      layout="default"
                      enableSnap={false}

                    />
                  </S.PetsCarouselView>

                  <S.SeeMoreTouchableOpacity
                    onPress={() => this.props.routes.navigation.navigate('OtherPets', { animalType: 0, userType: this.props.userType, pets: this.state.allDogs, recommendedPets: this.state.dogs, userData: this.props.userData, userID: this.props.userID, userID: this.props.userID })}
                  >
                    <S.SeeMoreTouchableOpacityText>ver todos</S.SeeMoreTouchableOpacityText>
                  </S.SeeMoreTouchableOpacity>
                </>)
                : (<S.NoPetView>
                  <S.NoPetText>Infelizmente não encontramos amigões nesta categoria para você!</S.NoPetText>
                  <Icon
                    type="Entypo"
                    name="emoji-sad"
                    style={{
                      fontSize: 25,
                      color: '#999999',
                      marginTop: '4%',
                      alignSelf: 'center',
                    }}
                  />
                </S.NoPetView>
                )
            )
          }

          {
            this.state.animalType === 1 &&
            (
              this.state.cats.length > 0
                ?
                (<>
                  <S.PetsCarouselView>
                    <S.PetsCarousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.cats}
                      renderItem={this.renderItem}
                      sliderWidth={Window.winWidth * 1}
                      itemWidth={Window.winWidth * 0.82}
                    />
                  </S.PetsCarouselView>

                  <S.SeeMoreTouchableOpacity
                    onPress={() => this.props.routes.navigation.navigate('OtherPets', { animalType: 1, userType: this.props.userType, pets: this.state.allCats, userData: this.props.userData })}
                  >
                    <S.SeeMoreTouchableOpacityText>ver todos</S.SeeMoreTouchableOpacityText>
                  </S.SeeMoreTouchableOpacity>
                </>)
                : (<S.NoPetView>
                  <S.NoPetText>Infelizmente não encontramos amigões nesta categoria para você!</S.NoPetText>
                  <Icon
                    type="Entypo"
                    name="emoji-sad"
                    style={{
                      fontSize: 25,
                      color: '#999999',
                      marginTop: '4%',
                      alignSelf: 'center',
                    }}
                  />
                </S.NoPetView>
                )
            )
          }

          {
            this.state.animalType === 2 &&
            (
              this.state.others.length > 0
                ?
                (<>
                  <S.PetsCarouselView>
                    <S.PetsCarousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.others}
                      renderItem={this.renderItem}
                      sliderWidth={Window.winWidth * 1}
                      itemWidth={Window.winWidth * 0.82}
                    />
                  </S.PetsCarouselView>

                  <S.SeeMoreTouchableOpacity
                    onPress={() => this.props.routes.navigation.navigate('OtherPets', { animalType: 2, userType: this.props.userType, pets: this.state.allOthers, userData: this.props.userData, userID: this.props.userID })}
                  >
                    <S.SeeMoreTouchableOpacityText>ver todos</S.SeeMoreTouchableOpacityText>
                  </S.SeeMoreTouchableOpacity>
                </>)
                : (<S.NoPetView>
                  <S.NoPetText>Infelizmente não encontramos amigões nesta categoria para você!</S.NoPetText>
                  <Icon
                    type="Entypo"
                    name="emoji-sad"
                    style={{
                      fontSize: 25,
                      color: '#999999',
                      marginTop: '4%',
                      alignSelf: 'center',
                    }}
                  />
                </S.NoPetView>
                )
            )
          }

        </S.FullView >)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetsButton;
