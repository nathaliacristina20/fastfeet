import React, { useState, useRef } from 'react';

import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import * as Yup from 'yup';
import history from '~/services/history';

import { Container } from './styles';

import { Content, Column, Row, FormStyle } from '~/styles/form';
import Input from '~/components/Form/Input';

import InputMask from '~/components/Form/InputMask';

import FormButtons from '~/components/Form/FormButtons';

import SelectInput from '~/components/Form/SelectInput';

import api from '~/services/api';

import { uf } from '~/assets/shared/data';

export default function Recipient({ title, location }) {
    const formRef = useRef(null);

    const [recipient] = useState(location.state);

    const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatorio'),
        street: Yup.string().required('Campo obrigatorio'),
        number: Yup.number()
            .typeError('Este campo deve ser um numero')
            .required('Campo obrigatorio'),
        zip_code: Yup.string().required('Campo obrigatorio'),
        city: Yup.string().required('Campo obrigatorio'),
        state: Yup.string().required('Campo obrigatorio'),
    });

    async function handleSubmit(data) {
        try {
            await schema.validate(data, {
                abortEarly: false,
            });

            if (recipient && recipient.id) {
                await api.put(`recipients/${recipient.id}`, data);
                toast.success('Registro editado com sucesso.');
            } else {
                await api.post('recipients', data);
                toast.success('Registro salvo com sucesso.');
            }

            history.push('/destinatarios');

            // formRef.current.setErrors({});
            // reset();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};
                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                });
                formRef.current.setErrors(errorMessages);
            } else {
                toast.error('Ocorreu um erro ao salvar o destinatario.');
            }
        }
    }

    return (
        <Container>
            <FormStyle>
                <Form
                    ref={formRef}
                    initialData={recipient}
                    onSubmit={handleSubmit}
                >
                    <FormButtons title={title} pathname="destinatarios" />
                    <Content>
                        <Row>
                            <Column>
                                <Input
                                    type="text"
                                    name="name"
                                    label="Nome"
                                    formRef={formRef}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Input
                                    type="text"
                                    name="street"
                                    label="Rua"
                                    formRef={formRef}
                                />
                            </Column>
                            <Column>
                                <Input
                                    type="text"
                                    name="number"
                                    label="Número"
                                    formRef={formRef}
                                />
                            </Column>
                            <Column>
                                <Input
                                    type="text"
                                    name="complement"
                                    label="Complemento"
                                    formRef={formRef}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Input
                                    type="text"
                                    name="city"
                                    label="Cidade"
                                    formRef={formRef}
                                />
                            </Column>
                            <Column>
                                <SelectInput
                                    name="state"
                                    label="Estado"
                                    formRef={formRef}
                                    placeholder=""
                                    options={uf}
                                    defaultValue={
                                        recipient && {
                                            value: recipient.state,
                                            label: recipient.state,
                                        }
                                    }
                                />
                            </Column>
                            <Column>
                                <InputMask
                                    name="zip_code"
                                    mask="99999-999"
                                    label="CEP"
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

Recipient.propTypes = {
    location: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string.isRequired,
};

Recipient.defaultProps = {
    location: {},
};
