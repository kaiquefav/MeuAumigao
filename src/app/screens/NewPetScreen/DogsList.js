import React from 'react';
import * as S from './NewPetScreen.style';
import { Icon } from 'native-base';

class DogsPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            race: '',
        };
    }
    render() {
        const {
            selectedValue, onValueChange
        } = this.props;
        return (
            <S.RegisterPicker
                iosHeader='Raça?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                iosIcon={
                    <S.BackArrowImage
                        source={require('../../assets/png/ic_down_black_arrow_button.png')}
                        resizeMode='contain'
                    />}
                headerBackButtonTexdt="Voltar"
                headerBackButtonTextStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dropdown"
                placeholder="Raça do amigão"
                placeholderStyle={{ color: "#919191" }}
                selectedValue={this.state.race}
                onValueChange={(race) => {
                    this.setState({ race });
                    onValueChange(race);
                }}
            >
                <S.RegisterPicker.Item
                    label="SRD (Sem raça definida)"
                    value='SRD (Sem raça definida)'
                />
                <S.RegisterPicker.Item
                    label="Akita"
                    value='Akita'
                />
                <S.RegisterPicker.Item
                    label="Beagle"
                    value='Beagle'
                />
                <S.RegisterPicker.Item
                    label="Border collie"
                    value='Border collie'
                />
                <S.RegisterPicker.Item
                    label="Boxer"
                    value='Boxer'
                />
                <S.RegisterPicker.Item
                    label="Buldogue francês"
                    value='Buldogue francês'
                />
                <S.RegisterPicker.Item
                    label="Buldogue inglês"
                    value='Buldogue inglês'
                />
                <S.RegisterPicker.Item
                    label="Bull terrier"
                    value='Bull terrier'
                />
                <S.RegisterPicker.Item
                    label="Cane corso"
                    value='Cane corso'
                />
                <S.RegisterPicker.Item
                    label="Chihuahua"
                    value='Chihuahua'
                />
                <S.RegisterPicker.Item
                    label="Chow chow"
                    value='Chow chow'
                />
                <S.RegisterPicker.Item
                    label="Cocker"
                    value='Cocker'
                />
                <S.RegisterPicker.Item
                    label="Dachshund"
                    value='Dachshund'
                />
                <S.RegisterPicker.Item
                    label="Dálmata"
                    value='Dálmata'
                />
                <S.RegisterPicker.Item
                    label="Doberman"
                    value='Doberman'
                />
                <S.RegisterPicker.Item
                    label="Fila"
                    value='Fila'
                />
                <S.RegisterPicker.Item
                    label="Fox paulistinha"
                    value='Fox paulistinha'
                />
                <S.RegisterPicker.Item
                    label="Golden retriever"
                    value='Golden retriever'
                />
                <S.RegisterPicker.Item
                    label="Husky siberiano"
                    value='Husky siberiano'
                />
                <S.RegisterPicker.Item
                    label="Labrador"
                    value='Labrador'
                />
                <S.RegisterPicker.Item
                    label="Lhasa apso"
                    value='Lhasa apso'
                />
                <S.RegisterPicker.Item
                    label="Maltês"
                    value='Maltês'
                />
                <S.RegisterPicker.Item
                    label="Mastiff"
                    value='Mastiff'
                />
                <S.RegisterPicker.Item
                    label="Pastor alemão"
                    value='Pastor alemão'
                />
                <S.RegisterPicker.Item
                    label="Pequinês"
                    value='Pequinês'
                />
                <S.RegisterPicker.Item
                    label="Pinscher"
                    value='Pinscher'
                />
                <S.RegisterPicker.Item
                    label="Pit bull"
                    value='Pit bull'
                />
                <S.RegisterPicker.Item
                    label="Poodle"
                    value='Poodle'
                />
                <S.RegisterPicker.Item
                    label="Pug"
                    value='Pug'
                />
                <S.RegisterPicker.Item
                    label="Rottweiler"
                    value='Rottweiler'
                />
                <S.RegisterPicker.Item
                    label="Schnauzer"
                    value='Schnauzer'
                />
                <S.RegisterPicker.Item
                    label="Shih tzu"
                    value='Shih tzu'
                />
                <S.RegisterPicker.Item
                    label="Spitz"
                    value='Spitz'
                />
                <S.RegisterPicker.Item
                    label="Yorkshire"
                    value='Yorkshire'
                />
            </S.RegisterPicker>
        );
    }
}

export default DogsPicker;
