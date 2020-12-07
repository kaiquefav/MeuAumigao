import React from 'react';
import * as S from './OtherPetsScreen.style';
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
            <S.RacePicker
                iosHeader='Raça?'
                headerStyle={{ backgroundColor: '#f1f1f1' }}
                textStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                itemTextStyle={{ fontFamily: 'Bellota-Light', fontSize: Platform.OS === 'ios' ? 18 : 16 }}
                headerTitleStyle={{ color: "rgb(0, 104, 191)", fontFamily: 'Bellota-Bold' }}
                mode="dialog"
                placeholder="Raça do amigão"
                placeholderStyle={{ color: "#919191" }}
                onValueChange={(race) => {
                    this.setState({ race }, () => onValueChange(race));
                }}
                headerBackButtonText=' '
            >
                <S.RacePicker.Item
                    label="Cancelar"
                    value='Cancelar'
                />
                <S.RacePicker.Item
                    label="Todos"
                    value='Todos'
                />
                <S.RacePicker.Item
                    label="SRD (Sem raça definida)"
                    value='SRD (Sem raça definida)'
                />
                <S.RacePicker.Item
                    label="Akita"
                    value='Akita'
                />
                <S.RacePicker.Item
                    label="Beagle"
                    value='Beagle'
                />
                <S.RacePicker.Item
                    label="Border collie"
                    value='Border collie'
                />
                <S.RacePicker.Item
                    label="Boxer"
                    value='Boxer'
                />
                <S.RacePicker.Item
                    label="Buldogue francês"
                    value='Buldogue francês'
                />
                <S.RacePicker.Item
                    label="Buldogue inglês"
                    value='Buldogue inglês'
                />
                <S.RacePicker.Item
                    label="Bull terrier"
                    value='Bull terrier'
                />
                <S.RacePicker.Item
                    label="Cane corso"
                    value='Cane corso'
                />
                <S.RacePicker.Item
                    label="Chihuahua"
                    value='Chihuahua'
                />
                <S.RacePicker.Item
                    label="Chow chow"
                    value='Chow chow'
                />
                <S.RacePicker.Item
                    label="Cocker"
                    value='Cocker'
                />
                <S.RacePicker.Item
                    label="Dachshund"
                    value='Dachshund'
                />
                <S.RacePicker.Item
                    label="Dálmata"
                    value='Dálmata'
                />
                <S.RacePicker.Item
                    label="Doberman"
                    value='Doberman'
                />
                <S.RacePicker.Item
                    label="Fila"
                    value='Fila'
                />
                <S.RacePicker.Item
                    label="Fox paulistinha"
                    value='Fox paulistinha'
                />
                <S.RacePicker.Item
                    label="Golden retriever"
                    value='Golden retriever'
                />
                <S.RacePicker.Item
                    label="Husky siberiano"
                    value='Husky siberiano'
                />
                <S.RacePicker.Item
                    label="Labrador"
                    value='Labrador'
                />
                <S.RacePicker.Item
                    label="Lhasa apso"
                    value='Lhasa apso'
                />
                <S.RacePicker.Item
                    label="Maltês"
                    value='Maltês'
                />
                <S.RacePicker.Item
                    label="Mastiff"
                    value='Mastiff'
                />
                <S.RacePicker.Item
                    label="Pastor alemão"
                    value='Pastor alemão'
                />
                <S.RacePicker.Item
                    label="Pequinês"
                    value='Pequinês'
                />
                <S.RacePicker.Item
                    label="Pinscher"
                    value='Pinscher'
                />
                <S.RacePicker.Item
                    label="Pit bull"
                    value='Pit bull'
                />
                <S.RacePicker.Item
                    label="Poodle"
                    value='Poodle'
                />
                <S.RacePicker.Item
                    label="Pug"
                    value='Pug'
                />
                <S.RacePicker.Item
                    label="Rottweiler"
                    value='Rottweiler'
                />
                <S.RacePicker.Item
                    label="Schnauzer"
                    value='Schnauzer'
                />
                <S.RacePicker.Item
                    label="Shih tzu"
                    value='Shih tzu'
                />
                <S.RacePicker.Item
                    label="Spitz"
                    value='Spitz'
                />
                <S.RacePicker.Item
                    label="Yorkshire"
                    value='Yorkshire'
                />
            </S.RacePicker>
        );
    }
}

export default DogsPicker;
