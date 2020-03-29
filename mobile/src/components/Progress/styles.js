import styled from 'styled-components';

export const Container = styled.View`
    padding: 26px;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-color: #7d40e7;
    border-bottom-width: 1px;
    margin-bottom: 20px;
`;

export const ContainerT = styled.View``;

export const Teste = styled.Text``;

export const StepT = styled.View`
    justify-content: center;
    flex-direction: row;
`;

export const Name = styled.Text`
    font-size: 8px;
    color: #999999;
    bottom: -40px;
    margin-left: -10px;
    position: absolute;
    max-width: 44px;
    min-height: 30px;
`;

export const Circle = styled.View`
    background: ${props => (props.active ? `#7d40e7` : `#fff`)};
    border: ${props => (!props.active ? `1px solid #7d40e7` : `0`)};
    width: 10px;
    height: 10px;
    border-radius: 5px;
    bottom: -5px;
`;

export const Loading = styled.View``;
