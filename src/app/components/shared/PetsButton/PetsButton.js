import React from 'react';
import * as S from './PetsButton.style';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Window from '../../../utils/windowDimensions/WindowDimensions';
import { Icon } from 'native-base';
import { useScrollToTop } from '@react-navigation/native';

class PetsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalType: '',
      dogs: [],
      cats: [],
      others: [],
      active: false,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Bellota-Light': require('../../../assets/fonts/Bellota-Light.ttf'),
      'Bellota-Regular': require('../../../assets/fonts/Bellota-Regular.ttf'),
      'Bellota-Bold': require('../../../assets/fonts/Bellota-Bold.ttf'),
    })

    this.setState({ fontLoaded: true });
    await this.getAnimalsByType();
  }

  getAnimalsByType = async () => {
    const { pets } = this.props;
    let aux;
    pets.map((element) => {
      switch (element.type) {
        case 0:
          aux = this.state.dogs;
          aux.push(element);
          this.setState({ dogs: aux }, () => aux = []);
          break;
        case 1:
          aux = this.state.cats;
          aux.push(element);
          this.setState({ cats: aux }, () => aux = []);
          break;
        case 2:
          aux = this.state.others;
          aux.push(element);
          this.setState({ others: aux }, () => aux = []);
          break;
        default:
          break;
      }
    })
  }

  renderItem = ({ item, index }) => {
    this.props.scrollTo();
    return (
      <S.PetsCard pet={item} onPress={() => this.props.routes.navigation.navigate('Pet', { pet: item })} />
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
                    <S.PetTypeText style={{ color: 'white' }}>Cachorros</S.PetTypeText>
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
                    <S.PetTypeText>Cachorros</S.PetTypeText>
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
                    />
                  </S.PetsCarouselView>

                  <S.SeeMoreTouchableOpacity>
                    <S.SeeMoreTouchableOpacityText>ver mais</S.SeeMoreTouchableOpacityText>
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

          {this.state.animalType === 1 &&
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

                  <S.SeeMoreTouchableOpacity>
                    <S.SeeMoreTouchableOpacityText>ver mais</S.SeeMoreTouchableOpacityText>
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

          {this.state.animalType === 2 &&
            (
              this.state.others.length > 0
                ?
                (<>
                  <S.PetsCarouselView>
                    <S.PetsCarousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.birds}
                      renderItem={this.renderItem}
                      sliderWidth={Window.winWidth * 1}
                      itemWidth={Window.winWidth * 0.82}
                    />
                  </S.PetsCarouselView>

                  <S.SeeMoreTouchableOpacity>
                    <S.SeeMoreTouchableOpacityText>ver mais</S.SeeMoreTouchableOpacityText>
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

        </S.FullView>)
        : (<ActivityIndicator style={{ flex: 1 }} size='large' color='rgb(0, 104, 191)' />)
    );
  }
}

export default PetsButton;
