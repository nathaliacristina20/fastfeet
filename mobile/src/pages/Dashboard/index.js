import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';

import {
    Container,
    Content,
    Header,
    ContentHeader,
    Welcome,
    Title,
    DeliverymanName,
    Logout,
    Body,
    BodyHeader,
    Options,
    StatusLink,
    StatusText,
    DeliveriesList,
    DefaultEmptyMessage,
    Loading,
} from './styles';
import Avatar from '~/components/Avatar';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import Delivery from '~/components/Delivery';

function Dashboard({ navigation, isFocused }) {
    const dispatch = useDispatch();
    const [deliveryman] = useState(
        useSelector(state => state.auth.deliveryman)
    );

    const [options] = useState([
        { key: 1, label: 'Pendentes', active: false },
        { key: 3, label: 'Entregues', active: false },
    ]);

    const [numberOfPages, setNumberOfPages] = useState();

    const [deliveries, setDeliveries] = useState([]);

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(true);

    async function loadDeliveries() {
        try {
            const { data, headers } = await api.get(
                `deliveryman/${deliveryman.id}/deliveries`,
                {
                    params: {
                        page,
                        perPage: 3,
                        status,
                    },
                }
            );

            setNumberOfPages(headers['x-pages-count']);
            setDeliveries(data);
            setLoading(false);
        } catch (err) {
            if (err.response.status === 400) {
                Alert.alert('Falha', err.response.data.error);
            } else {
                Alert.alert('Falha', 'Ocorreu um erro inesperado.');
            }
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadDeliveries();
        }
    }, [isFocused, status]);

    async function loadMore() {
        if (page + 1 > numberOfPages) {
            return;
        }
        try {
            const response = await api.get(
                `deliveryman/${deliveryman.id}/deliveries`,
                {
                    params: {
                        page: page + 1,
                        perPage: 3,
                        status,
                    },
                }
            );

            const deliveriesPagesConcat = deliveries.concat(response.data);

            setPage(page + 1);
            setDeliveries(deliveriesPagesConcat);
        } catch (err) {
            if (err.response.status === 400) {
                Alert.alert('Falha', err.response.data.error);
            } else {
                Alert.alert('Falha', 'Ocorreu um erro inesperado.');
            }
        }
    }

    function handleLogout() {
        dispatch(signOut());
    }

    function handleStatus(option) {
        setLoading(true);
        setPage(1);
        setStatus(option);
    }

    return (
        <Container>
            <Content>
                <Header>
                    <ContentHeader>
                        <Avatar
                            uri={deliveryman.avatar && deliveryman.avatar.url}
                            nameInitials={deliveryman.name_initials}
                            size={60}
                        />
                        <Welcome>
                            <Title>Bem vindo de volta,</Title>
                            <DeliverymanName>
                                {deliveryman.name}
                            </DeliverymanName>
                        </Welcome>
                    </ContentHeader>
                    <Logout>
                        <TouchableOpacity onPress={handleLogout}>
                            <Icon
                                name="exit-to-app"
                                size={18}
                                color="#E74040"
                            />
                        </TouchableOpacity>
                    </Logout>
                </Header>
                <Body>
                    <BodyHeader>
                        <DeliverymanName>Entregas</DeliverymanName>
                        <Options>
                            {options.map(option => (
                                <StatusLink
                                    key={option.label}
                                    onPress={() => handleStatus(option.key)}
                                >
                                    <StatusText enabled={status === option.key}>
                                        {option.label}
                                    </StatusText>
                                </StatusLink>
                            ))}
                        </Options>
                    </BodyHeader>

                    {!loading && deliveries.length < 1 && (
                        <DefaultEmptyMessage>
                            Não há registros a serem exibidos.
                        </DefaultEmptyMessage>
                    )}

                    {loading ? (
                        <Loading>
                            <ActivityIndicator color="#ddd" size={50} />
                        </Loading>
                    ) : (
                        <>
                            <DeliveriesList
                                data={deliveries}
                                keyExtractor={delivery => String(delivery.id)}
                                onEndReachedThreshold={0.3} // Carrega mais itens quando chegar em 20% do fim
                                onEndReached={loadMore} // Função que carrega mais itens
                                renderItem={({ item: delivery }) => (
                                    <Delivery
                                        navigation={navigation}
                                        delivery={delivery}
                                    />
                                )}
                            />
                        </>
                    )}
                </Body>
            </Content>
        </Container>
    );
}

Dashboard.navigationOptions = {
    title: null,
    headerTransparent: true,
};

Dashboard.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    isFocused: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {};

export default withNavigationFocus(Dashboard);
