import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { parseISO, format } from 'date-fns';
import {
    Container,
    Content,
    Cards,
    Card,
    Top,
    CardTitle,
    DetailRow,
    Detail,
    Label,
    Text,
    Buttons,
    Button,
    ButtonIcon,
    ButtonText,
    Header,
} from './styles';

import api from '~/services/api';

export default function DeliveryDetail({ navigation }) {
    const [delivery] = useState(navigation.getParam('delivery'));

    const address = useMemo(() => {
        return `${delivery.recipient.street},${delivery.recipient.number} ${delivery.recipient.complement}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zip_code}`;
    }, []);

    const dateStartParsed = useMemo(() => {
        return delivery.start_date
            ? format(parseISO(delivery.start_date), "dd'/'MM'/'yyyy", {})
            : '--/--/--';
    }, []);

    const dateEndParsed = useMemo(() => {
        return delivery.end_date
            ? format(parseISO(delivery.end_date), "dd'/'MM'/'yyyy", {})
            : '--/--/--';
    }, []);

    async function handleRetiredDelivery() {
        try {
            await api.put(
                `/deliveryman/${delivery.deliveryman.id}/deliveries/${delivery.id}`,
                { start_date: new Date() }
            );
            Alert.alert('Encomenda retirada!');
            navigation.navigate('Dashboard');
        } catch (err) {
            Alert.alert('Houve um erro ao tentar salvar a imagem.');
        }
    }

    return (
        <>
            <Container>
                <Header />
                <Content>
                    <Cards>
                        <Card>
                            <Top>
                                <Icon
                                    name="local-shipping"
                                    size={20}
                                    color="#7d40e7"
                                />
                                <CardTitle>Informações da entrega</CardTitle>
                            </Top>
                            <Detail>
                                <Label>DESTINATÁRIO</Label>
                                <Text>{delivery.recipient.name}</Text>
                            </Detail>
                            <Detail>
                                <Label>ENDEREÇO DE ENTREGA</Label>
                                <Text>{address}</Text>
                            </Detail>
                            <Detail>
                                <Label>PRODUTO</Label>
                                <Text>{delivery.product}</Text>
                            </Detail>
                        </Card>
                        <Card>
                            <Top>
                                <Icon name="event" size={20} color="#7d40e7" />
                                <CardTitle>Situação da entrega</CardTitle>
                            </Top>
                            <Detail>
                                <Label>STATUS</Label>
                                <Text>{delivery.status.label}</Text>
                            </Detail>
                            <DetailRow>
                                <Detail>
                                    <Label>DATA DE RETIRADA</Label>
                                    <Text>{dateStartParsed}</Text>
                                </Detail>
                                <Detail>
                                    <Label>DATA DE ENTREGA</Label>
                                    <Text>{dateEndParsed}</Text>
                                </Detail>
                            </DetailRow>
                        </Card>
                    </Cards>
                    <Buttons>
                        <Button
                            onPress={() =>
                                navigation.navigate('DeliveryForm', {
                                    delivery,
                                })
                            }
                        >
                            <ButtonIcon>
                                <Icon
                                    name="highlight-off"
                                    size={20}
                                    color="#E74040"
                                />
                            </ButtonIcon>

                            <ButtonText>Informar Problema</ButtonText>
                        </Button>
                        <Button
                            onPress={() =>
                                navigation.navigate('DeliveryProblems', {
                                    delivery,
                                })
                            }
                        >
                            <Icon
                                name="info-outline"
                                size={20}
                                color="#E7BA40"
                            />
                            <ButtonText>Visualizar Problemas</ButtonText>
                        </Button>

                        {delivery.start_date === null && (
                            <Button onPress={handleRetiredDelivery}>
                                <Icon
                                    name="alarm-on"
                                    size={20}
                                    color="#7D40E7"
                                />
                                <ButtonText>Retirar Encomenda</ButtonText>
                            </Button>
                        )}

                        {delivery.start_date !== null && (
                            <Button
                                onPress={() =>
                                    navigation.navigate('DeliveryConfirm', {
                                        delivery,
                                    })
                                }
                            >
                                <Icon
                                    name="check-circle"
                                    size={20}
                                    color="#7D40E7"
                                />
                                <ButtonText>Confirmar Entrega</ButtonText>
                            </Button>
                        )}
                    </Buttons>
                </Content>
            </Container>
        </>
    );
}

DeliveryDetail.navigationOptions = ({ navigation }) => ({
    title: 'Detalhes da encomenda',
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

DeliveryDetail.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
};

DeliveryDetail.defaultProps = {};
