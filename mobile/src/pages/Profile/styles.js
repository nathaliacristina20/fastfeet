import styled from 'styled-components/native';

import Button from '~/components/Form/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Content = styled.View`
    margin: 36px;
    justify-content: center;
`;

export const Top = styled.View`
    align-items: center;
    margin-bottom: 40px;
`;

export const Info = styled.View`
    margin-bottom: 15px;
`;

export const Label = styled.Text`
    color: #666666;
    font-size: 12px;
`;

export const Text = styled.Text`
    color: #444444;
    font-size: 22px;
    font-weight: bold;
`;

export const LogoutButton = styled(Button)`
    margin-top: 30px;
    background: #e74040;
`;
