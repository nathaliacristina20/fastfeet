import styled from 'styled-components/native';

export const Image = styled.Image`
    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};
    border-radius: ${props => `${props.size / 2}px`};
    margin-right: 12px;
`;

export const Default = styled.View`
    background: #f4effc;
    margin-right: 12px;
    width: 68px;
    height: 68px;
    border-radius: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NameInitials = styled.Text`
    color: #a28fd0;
    text-transform: uppercase;
    font-size: 31px;
`;
