import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;
export const Content = styled.View`
    margin: 10px 20px 0 20px;
    width: 90%;
    flex: 1;
    margin-top: -60px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-bottom: 13px;
`;

export const Problems = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})``;
export const Problem = styled.View`
    background: #fff;
    padding: 17px 17px 17px 20px;
    border: 1px solid #0000001a;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;
export const ProblemDescription = styled.Text`
    color: #999999;
    font-size: 16px;
    max-width: 150px;
`;
export const ProblemDate = styled.Text`
    color: #c1c1c1;
    font-size: 12px;
`;
export const Loading = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

export const DefaultEmptyMessage = styled.Text`
    margin-top: 50px;
    color: #666666;
    font-size: 12px;
    text-align: center;
`;
