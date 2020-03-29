import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { parseISO, format } from 'date-fns';
import { signOut } from '~/store/modules/auth/actions';
import {
    Container,
    Content,
    Top,
    Info,
    Label,
    Text,
    LogoutButton,
} from './styles';

import Avatar from '~/components/Avatar';

export default function Profile() {
    const dispatch = useDispatch();
    const deliveryman = useSelector(state => state.auth.deliveryman);

    const dateParsed = useMemo(() => {
        return format(parseISO(deliveryman.createdAt), "dd'/'MM'/'yyyy", {});
    }, []);

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Content>
                <Top>
                    <Avatar
                        uri={deliveryman.avatar && deliveryman.avatar.url}
                        nameInitials={deliveryman.name_initials}
                        size={136}
                    />
                </Top>
                <Info>
                    <Label>Nome completo</Label>
                    <Text>{deliveryman.name}</Text>
                </Info>
                <Info>
                    <Label>Email</Label>
                    <Text>{deliveryman.email}</Text>
                </Info>
                <Info>
                    <Label>Data de cadastro</Label>
                    <Text>{dateParsed}</Text>
                </Info>
                <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
            </Content>
        </Container>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="account-circle" size={18} color={tintColor} />
    ),
};
