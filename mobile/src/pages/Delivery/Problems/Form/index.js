import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import { Container, Content, TextArea, SubmitButton } from './styles';
import api from '~/services/api';

import { Background } from '~/styles/global';

export default function DeliveryForm({ navigation }) {
    const [description, setDescription] = useState(null);
    const [delivery] = useState(navigation.getParam('delivery'));
    const [loading, setLoading] = useState(false);

    async function handleProblems() {
        try {
            setLoading(true);
            await api.post(`delivery/${delivery.id}/problems`, {
                description,
            });
            navigation.navigate('DeliveryDetail');
        } catch (err) {
            if (err.response.status === 400) {
                Alert.alert('Falha', err.response.data.error);
            } else {
                Alert.alert('Falha', 'Ocorreu um erro inesperado.');
            }
        }
        setLoading(false);
    }

    return (
        <Container>
            <Background />
            <Content>
                <TextArea
                    textAlignVertical="top"
                    multiline
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Inclua aqui o problema que ocorreu na entrega."
                    value={description}
                    onChangeText={setDescription}
                />
                <SubmitButton loading={loading} onPress={handleProblems}>
                    Enviar
                </SubmitButton>
            </Content>
        </Container>
    );
}

DeliveryForm.navigationOptions = ({ navigation }) => ({
    title: 'Informar problema',
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

DeliveryForm.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
};

DeliveryForm.defaultProps = {};
