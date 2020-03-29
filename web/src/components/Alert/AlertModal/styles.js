import styled from 'styled-components';

export const Container = styled.div``;

export const Option = styled.label``;

export const ModalStyle = styled.div`
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
        margin-top: 8px;
        margin-bottom: 20px;
        text-align: justify;
        display: flex;
        flex-direction: column;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;
        background: #ee4d64;
        margin-top: 20px;

        svg {
            margin: 8px 8px 8px 16px;
        }
    }
`;
