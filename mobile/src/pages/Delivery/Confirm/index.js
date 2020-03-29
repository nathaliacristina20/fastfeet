import React, { useRef, useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
    Container,
    Content,
    CameraWrapper,
    Camera,
    SubmitButton,
    CaptureButton,
    Actions,
    Image,
} from './styles';

import api from '~/services/api';

import { Background } from '~/styles/global';

export default function DeliveryConfirm({ navigation }) {
    const [delivery] = useState(navigation.getParam('delivery'));

    const cameraRef = useRef(null);
    const [type] = useState('back');
    const [flash] = useState('off');

    const [preview, setPreview] = useState(false);
    const [delivered, setDelivered] = useState(false);

    useEffect(() => {
        if (delivery.signature && delivery.signature.url) {
            setPreview({ uri: delivery.signature.url });
            setDelivered(true);
        }
    }, []);

    async function takePicture() {
        const data = await cameraRef.current.takePictureAsync({
            quality: 0.5,
            base64: true,
        });
        setPreview(data);
    }

    async function handleSubmit() {
        try {
            const data = new FormData();

            data.append('file', {
                uri: preview.uri,
                type: 'image/jpeg',
                name: `signature.jpg`,
            });

            const signature = await api.post(`/files`, data);

            await api.put(
                `/deliveryman/${delivery.deliveryman.id}/deliveries/${delivery.id}`,
                { signature_id: signature.data.id }
            );

            Alert.alert('Registro salvo com sucesso!');
            navigation.navigate('Dashboard');
        } catch (err) {
            Alert.alert('Houve um erro ao tentar salvar a imagem.');
        }
    }

    return (
        <Container>
            <Background />
            <Content>
                {preview ? (
                    <>
                        <Image source={{ uri: preview.uri }} />
                        {!delivered && (
                            <SubmitButton onPress={handleSubmit}>
                                Enviar
                            </SubmitButton>
                        )}
                    </>
                ) : (
                    <CameraWrapper>
                        <Camera
                            ref={cameraRef}
                            type={type}
                            flashMode={flash}
                            captureAudio={false}
                        >
                            <Actions>
                                <CaptureButton onPress={() => takePicture()}>
                                    <Icon
                                        name="photo-camera"
                                        size={25}
                                        color="#fff"
                                    />
                                </CaptureButton>
                            </Actions>
                        </Camera>
                    </CameraWrapper>
                )}
            </Content>
        </Container>
    );
}

DeliveryConfirm.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar entrega',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
    ),
});

DeliveryConfirm.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
};

DeliveryConfirm.defaultProps = {};
