import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 360px;
    height: 425px;
    background: #ffffff;
    box-shadow: 0px 0px 10px #00000033;
    border-radius: 4px;

    button {
        margin-top: 15px;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 216px;
        height: 45px;
    }
`;
