import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    flex-direction: column;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 36px;
    margin-bottom: 34px;
    width: 100%;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
`;

export const SearchInput = styled.div`
    display: flex;
    input {
        width: 237px;
        height: 36px;
        padding-left: 30px;
        display: flex;
        width: 100%;
        border: 1px solid #dddddd;
        border-radius: 4px;
        margin-bottom: 16px;
        padding-left: 25px;
        font-size: 16px;
        letter-spacing: 0;
        color: #666666;
    }

    svg {
        position: absolute;
        margin-top: 6px;
        margin-left: 5px;
    }
`;

export const RowButtons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        height: 36px;
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
