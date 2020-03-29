import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Delivery/Home';
import Delivery from '~/pages/Delivery/Form';

import Deliverymans from '~/pages/Deliverymans/Home';
import Deliveryman from '~/pages/Deliverymans/Form';

import Recipients from '~/pages/Recipients/Home';
import Recipient from '~/pages/Recipients/Form';

import DeliveryProblems from '~/pages/DeliveryProblems';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/encomendas" exact isPrivate component={Deliveries} />
            <Route
                path="/encomendas/novo"
                isPrivate
                title="Cadastro de encomendas"
                component={Delivery}
            />
            <Route
                path="/encomendas/:id/editar"
                isPrivate
                title="Edição de encomendas"
                component={Delivery}
            />
            <Route
                path="/problemas"
                exact
                isPrivate
                title="Problemas na entrega"
                component={DeliveryProblems}
            />
            <Route
                path="/entregadores"
                exact
                isPrivate
                component={Deliverymans}
            />
            <Route
                path="/entregadores/novo"
                exact
                isPrivate
                title="Cadastro de entregadores"
                component={Deliveryman}
            />
            <Route
                path="/entregadores/:id/editar"
                exact
                isPrivate
                title="Edição de entregadores"
                component={Deliveryman}
            />

            <Route
                path="/destinatarios"
                exact
                isPrivate
                component={Recipients}
            />
            <Route
                path="/destinatarios/novo"
                exact
                isPrivate
                title="Cadastro de destinatário"
                component={Recipient}
            />
            <Route
                path="/destinatarios/:id/editar"
                exact
                isPrivate
                title="Edição de destinatário"
                component={Recipient}
            />
        </Switch>
    );
}
