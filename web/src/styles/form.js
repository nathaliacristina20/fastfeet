import styled, { css } from 'styled-components';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    padding: 26px 30px;
`;

export const FormStyle = styled.div`
    min-width: 80%;
    form {
        width: 100%;
        label {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            color: #444444;
            font-weight: bold;
            margin-bottom: 9px;
        }
        input {
            display: flex;
            width: 100%;
            border: 1px solid #dddddd;
            border-radius: 4px;
            margin-bottom: 10px;
            padding-left: 25px;
            font-size: 16px;
            letter-spacing: 0;
            color: #666666;
        }
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 14px;
        transition: background 0.2s;
        width: 100%;
        background: #7d40e7 0% 0% no-repeat padding-box;
        opacity: 1;
        width: 300px;
        height: 45px;
    }
`;

export const TopButtons = styled.div`
    display: flex;
    align-items: center;

    justify-content: flex-end;

    margin-top: 34px;
    margin-bottom: 27px;
    width: 100%;

    .btnBack {
        background: #cccccc;
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        svg {
            margin: 8px 8px 8px 16px;
        }
    }

    a,
    button {
        background: #7d40e7;
        width: 142px;
        margin-left: 10px;
        text-transform: uppercase;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 36px;

    width: 100%;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
    /* display: flex;
    align-items: center;
    justify-items: center;
  
   
    opacity: 1;
   
    width: 80%; */
`;

export const TopTitle = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
    /* display: flex;
    align-items: center;
    justify-items: center;
  
   
    opacity: 1;
   
    width: 80%; */
`;

export const Row = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    margin: 10px;
`;

export const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 10px;
    width: 100%;
`;

export const NameInitials = styled.div`
    border-radius: 50%;
    display: flex;
    height: 35px;
    width: 35px;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    ${props =>
        props.color &&
        css`
            background: ${props.color};
        `}

    p {
        display: flex;
    }
`;

export const Avatar = styled.div`
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;
