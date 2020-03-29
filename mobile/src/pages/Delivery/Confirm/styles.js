import { RNCamera } from 'react-native-camera';

import styled from 'styled-components/native';

import Button from '~/components/Form/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Content = styled.View`
    margin: -70px 20px 13px 20px;
    flex: 1;
    justify-content: flex-end;
`;

export const CameraWrapper = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

export const Camera = styled(RNCamera)`
    width: 100%;
    height: 85%;
    border-radius: 8px;
`;

export const Actions = styled.View`
    top: -5%;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

export const CaptureButton = styled.TouchableOpacity`
    background: rgba(0, 0, 0, 0.3);
    width: 61px;
    height: 61px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    background: #7d40e7;
`;

export const Image = styled.ImageBackground`
    width: 100%;
    height: 85%;
    margin-bottom: 11px;
    justify-content: flex-end;
`;
