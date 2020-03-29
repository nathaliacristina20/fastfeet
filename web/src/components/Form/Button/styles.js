import styled, { css } from 'styled-components';

export const Container = styled.div`
    button {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 14px;
        font-weight: bold;

        border: 0;
        border-radius: 4px;

        ${props =>
            props &&
            css`
                color: ${props.color};
                background: ${props.background};
                width: ${props.width}px;
                height: ${props.height}px;
                text-transform: ${props.textTransform};
            `}
    }
`;

export const Text = styled.div`
    display: flex;
    margin-left: 7px;
`;
