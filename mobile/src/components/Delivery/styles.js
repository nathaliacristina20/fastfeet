import styled from 'styled-components/native';

export const Container = styled.View`
    border: 1px solid #0000001a;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
`;

export const Content = styled.View`
    margin: 14px 14px 0 14px;
`;

export const Top = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text`
    color: #7d40e7;
    margin-left: 10px;
`;

export const Footer = styled.View`
    background: #f8f9fd;
`;

export const FooterContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`;

export const Cards = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const Card = styled.View`
    margin-right: 10px;
`;

export const Label = styled.Text`
    color: #999999;
    font-size: 10px;
`;

export const Value = styled.Text`
    color: #444444;
    font-size: 16px;
    font-weight: bold;
`;

export const DetailsLink = styled.TouchableOpacity``;

export const DetailsLinkText = styled.Text`
    color: #7d40e7;
    font-weight: bold;
    font-size: 12px;
`;
