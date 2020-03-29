import styled from 'styled-components/native';

import Button from '~/components/Form/Button';

export const Container = styled.SafeAreaView``;

export const Content = styled.View`
    margin: 10px 20px 0 20px;
    width: 90%;
    flex: 1;
    margin-top: -60px;
`;

export const TextArea = styled.TextInput.attrs({
    placeholderTextColor: '#999999',
})`
    height: 300px;
    font-size: 16px;
    color: #999999;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #0000001a;
    padding: 20px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 20px;
    background: #7d40e7;
`;
