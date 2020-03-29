import React, { useState, useRef } from 'react';

import { Form } from '@unform/web';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container } from './styles';
import { Content, Column, Row, FormStyle } from '~/styles/form';

import history from '~/services/history';

import Input from '~/components/Form/Input';
import api from '~/services/api';
import FormButtons from '~/components/Form/FormButtons';
import AsyncSelect from '~/components/Form/AsyncSelect';

export default function Delivery({ title, location }) {
    const formRef = useRef(null);
    const [delivery] = useState(location.state);

    async function loadRecipients(name) {
        try {
            const response = await api.get('recipients', {
                params: name !== '' ? { name } : {},
            });
            const data = response.data.map(recipient => ({
                label: recipient.name,
                value: recipient.id,
            }));

            return data;
        } catch (err) {
            toast.error('Ocorreu um erro ao carregar os Destinatarios.');
            return [];
        }
    }

    async function loadDeliverymans(name) {
        try {
            const response = await api.get('deliverymans', {
                params: name !== '' ? { name } : {},
            });
            const data = response.data.map(deliveryman => ({
                label: deliveryman.name,
                value: deliveryman.id,
            }));
            return data;
        } catch (err) {
            toast.error('Ocorreu um erro ao carregar os Entregadores.');
            return [];
        }
    }

    const schema = Yup.object().shape({
        recipient_id: Yup.number()
            .typeError('Campo obrigatorio')
            .positive()
            .required('Campo obrigatorio'),
        deliveryman_id: Yup.number()
            .required('Campo obrigatorio')
            .typeError('Campo obrigatorio'),
        product: Yup.string().required('Campo obrigatorio'),
    });

    async function handleSubmit(data, { reset }) {
        try {
            await schema.validate(data, {
                abortEarly: false,
            });

            if (delivery && delivery.id) {
                await api.put(
                    `deliveryman/${delivery.deliveryman_id}/deliveries/${delivery.id}`,
                    data
                );
                toast.success('Registro editado com sucesso.');
            } else {
                await api.post('deliveries', data);
                toast.success('Registro salvo com sucesso.');
            }

            history.push('/encomendas');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};
                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                });
                formRef.current.setErrors(errorMessages);
            } else {
                toast.error('Ocorreu um erro ao salvar a encomenda.');
            }
        }
    }

    return (
        <Container>
            <FormStyle>
                <Form
                    ref={formRef}
                    initialData={delivery}
                    onSubmit={handleSubmit}
                >
                    <FormButtons title={title} pathname="encomendas" />
                    <Content>
                        <Row>
                            <Column>
                                <AsyncSelect
                                    label="Destinatário"
                                    name="recipient_id"
                                    loadOptions={loadRecipients}
                                    formRef={formRef}
                                    placeholder="Destinatários"
                                    noOptionsMessage={() =>
                                        'Nenhum destinatário encontrado'
                                    }
                                    defaultValue={
                                        delivery && {
                                            value: delivery.recipient.id,
                                            label: delivery.recipient.name,
                                        }
                                    }
                                />
                            </Column>
                            <Column>
                                <AsyncSelect
                                    label="Entregador"
                                    name="deliveryman_id"
                                    placeholder="Entregadores"
                                    loadOptions={loadDeliverymans}
                                    formRef={formRef}
                                    noOptionsMessage={() =>
                                        'Nenhum entregador encontrado'
                                    }
                                    defaultValue={
                                        delivery && {
                                            value: delivery.deliveryman.id,
                                            label: delivery.deliveryman.name,
                                        }
                                    }
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Input
                                    type="text"
                                    name="product"
                                    label="Nome do produto"
                                    formRef={formRef}
                                />
                            </Column>
                        </Row>
                    </Content>
                </Form>
            </FormStyle>
        </Container>
    );
}

Delivery.propTypes = {
    location: PropTypes.func,
    title: PropTypes.string.isRequired,
};

Delivery.defaultProps = {
    location: [],
};
