import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    input[type='file'] {
        display: none;
    }
`;

export const ContentPreview = styled.div`
    display: flex;
    justify-content: center;
`;

export const PreviewDefault = styled.div`
    display: flex;
    justify-content: center;
    ${props =>
        props.color
            ? css`
                  border: 3px dashed ${darken(0.5, props.color)};
                  background: ${props.color};
              `
            : css`
                  border: 1px dashed #dddddd;
              `}

    opacity: 1;
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

export const PreviewDefaultError = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed red;
    opacity: 1;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    p {
        color: red;
    }
`;

export const PreviewText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ddd;
`;

export const PreviewTextInitials = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 66px;
    ${props =>
        props.color &&
        css`
            color: ${darken(0.5, props.color)};
        `}
`;

export const Preview = styled.div`
    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
`;

export const Label = styled.label``;
