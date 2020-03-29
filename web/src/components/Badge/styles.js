import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        margin-right: 5px;
    }
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
        props.colorBadge &&
        css`
            background: ${props.colorBadge};
            color: ${darken(0.5, props.colorBadge)};
        `}
    p {
        display: flex;
        text-transform: uppercase;
    }
`;
