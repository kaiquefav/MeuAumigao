import React from 'react';
import * as S from './OtherPetsScreen.style';
import { Icon } from 'native-base';

class CatsPicker extends React.Component {
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
                    label="Angorá"
                    value='Angorá'
                />
                <S.RacePicker.Item
                    label="British Shorthair"
                    value='British Shorthair'
                />
                <S.RacePicker.Item
                    label="Burmese"
                    value='Burmese'
                />
                <S.RacePicker.Item
                    label="Himalaia"
                    value='Himalaia'
                />
                <S.RacePicker.Item
                    label="Maine Coon"
                    value='Maine Coon'
                />
                <S.RacePicker.Item
                    label="Persa"
                    value='Persa'
                />
                <S.RacePicker.Item
                    label="Ragdoll"
                    value='Ragdoll'
                />
                <S.RacePicker.Item
                    label="Siamês"
                    value='Siamês'
                />
                <S.RacePicker.Item
                    label="Siberiano"
                    value='Siberiano'
                />
                <S.RacePicker.Item
                    label="Sphynx"
                    value='Sphynx'
                />
            </S.RacePicker>
        );
    }
}

export default CatsPicker;
