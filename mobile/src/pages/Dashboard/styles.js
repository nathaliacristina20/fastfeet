import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.View`
    margin: 0 20px 0 20px;
    flex: 1;
`;

export const Header = styled.View`
    display: flex;
    margin-top: 10px;
    margin-bottom: 22px;
    flex-direction: row;
    justify-content: space-between;
`;

export const ContentHeader = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;
export const Welcome = styled.View``;

export const Title = styled.Text`
    font-size: 12px;
    color: #666666;
`;

export const DeliveriesList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 10px;
    flex: 1;
`;

export const DeliverymanName = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #444444;
`;

export const Logout = styled.View`
    justify-content: center;
`;

export const Body = styled.View`
    flex: 1;
`;

export const BodyHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Options = styled.View`
    display: flex;
    flex-direction: row;
`;

export const StatusLink = styled.TouchableOpacity`
    justify-content: center;
`;

export const StatusText = styled.Text`
    color: ${props => (props.enabled ? `#7D40E7` : '#999')};
    text-decoration: ${props => (props.enabled ? `underline` : 'none')};
    font-size: 12px;
    margin-left: 15px;
`;
export const Loading = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

export const DefaultEmptyMessage = styled.Text`
    margin-top: 20px;
    color: #666666;
    font-size: 12px;
    text-align: center;
`;
