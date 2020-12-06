import React from 'react';
import * as S from './NewPetScreen.style';
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
                    label="Angorá"
                    value='Angorá'
                />
                <S.RegisterPicker.Item
                    label="British Shorthair"
                    value='British Shorthair'
                />
                <S.RegisterPicker.Item
                    label="Burmese"
                    value='Burmese'
                />
                <S.RegisterPicker.Item
                    label="Himalaia"
                    value='Himalaia'
                />
                <S.RegisterPicker.Item
                    label="Maine Coon"
                    value='Maine Coon'
                />
                <S.RegisterPicker.Item
                    label="Persa"
                    value='Persa'
                />
                <S.RegisterPicker.Item
                    label="Ragdoll"
                    value='Ragdoll'
                />
                <S.RegisterPicker.Item
                    label="Siamês"
                    value='Siamês'
                />
                <S.RegisterPicker.Item
                    label="Siberiano"
                    value='Siberiano'
                />
                <S.RegisterPicker.Item
                    label="Sphynx"
                    value='Sphynx'
                />
            </S.RegisterPicker>
        );
    }
}

export default CatsPicker;
