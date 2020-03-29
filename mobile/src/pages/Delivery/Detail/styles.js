import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

export const Header = styled.View`
    background-color: #7159c1;
    width: 100%;
    height: 70px;
    position: relative;
`;

export const Content = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin: 10px 20px 0 20px;
    width: 90%;
    flex: 1;
    margin-top: -60px;
    /* ${Dimensions.get('window').height / 2000} */
`;

export const Cards = styled.View`
    /* background: blue; */
`;

export const Card = styled.View`
    background: #fff;
    border: 1px solid #0000001a;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 8px;
    width: 100%;
`;

export const Top = styled.View`
    flex-direction: row;
`;

export const CardTitle = styled.Text`
    color: #7d40e7;
    margin-left: 10px;
    margin-bottom: 8px;
`;

export const DetailRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Detail = styled.View`
    margin-bottom: 10px;
`;

export const Label = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #999999;
`;

export const Text = styled.Text`
    font-size: 14px;
    color: #666666;
    margin-top: 5px;
`;

export const Buttons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-color: #0000001a;
    background: #f8f9fd;
    margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
    border-right-color: #0000001a;
    border-right-width: 1px;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 14px;
`;

export const ButtonIcon = styled.View`
    align-items: center;
    box-shadow: 5px 10px #888888;
`;

export const ButtonText = styled.Text`
    font-size: 12px;
    color: #999999;
    max-width: 65px;
    text-align: center;
`;
