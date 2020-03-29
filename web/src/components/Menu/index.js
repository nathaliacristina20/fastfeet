import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Content, Logo, Navigation, Logout } from './styles';

import logo from '../../assets/fastfeet.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Menu() {
    const dispatch = useDispatch();

    const breadcrumbs = [
        { route: '/encomendas', label: 'Encomendas' },
        { route: '/entregadores', label: 'Entregadores' },
        { route: '/destinatarios', label: 'Destinatários' },
        { route: '/problemas', label: 'Problemas' },
    ];

    const profile = useSelector(state => state.user.profile);

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Content>
                <Logo>
                    <img src={logo} alt="Logo" />
                </Logo>
                <Navigation active>
                    <nav>
                        {breadcrumbs.map(breadcrumb => (
                            <NavLink
                                key={breadcrumb.label}
                                to={breadcrumb.route}
                                activeStyle={{
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                {breadcrumb.label}
                            </NavLink>
                        ))}
                    </nav>
                </Navigation>
            </Content>
            <Logout>
                <h3>{profile.name}</h3>
                <button type="button" onClick={handleSignOut}>
                    <span>sair do sistema</span>
                </button>
            </Logout>
        </Container>
    );
}
