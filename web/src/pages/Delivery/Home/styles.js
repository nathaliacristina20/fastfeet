import styled from 'styled-components';

export const Container = styled.div`
    width: 80%;
`;
export const Circle = styled.div`
    display: flex;
    align-items: center;
`;

export const HtmlView = styled.div`
    width: 80%;
    h3 {
        font-size: 14px;
        color: #444444;
        margin-bottom: 8px;
    }
    p,
    strong,
    span {
        font-size: 16px;
        color: #666666;
        margin-bottom: 8px;
    }

    hr {
        border: 0;
        height: 0;
        margin: 10px 0 10px 0;
        border-bottom: 1px solid #eeeeee;
    }
`;
