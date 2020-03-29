import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { Form } from '@unform/web';

import { signInRequest } from '~/store/modules/auth/actions';

import { FormStyle } from '~/styles/form';
import { Container, Content, Logo } from './styles';

import Input from '~/components/Form/Input';

import logo from '~/assets/fastfeet.svg';

export default function SignIn() {
    const formRef = useRef(null);
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(6)
            .required(),
    });

    async function handleSubmit(data) {
        try {
            await schema.validate(data, {
                abortEarly: false,
            });

            dispatch(signInRequest(data.email, data.password));
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};
                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                });
                formRef.current.setErrors(errorMessages);
            }
        }
    }

    return (
        <Container>
            <Content>
                <Logo>
                    <img src={logo} alt="Logo" />
                </Logo>
                <FormStyle>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            type="email"
                            label="SEU E-MAIL"
                            formRef={formRef}
                        />
                        <Input
                            name="password"
                            type="password"
                            label="SUA SENHA"
                            formRef={formRef}
                        />
                        <button type="submit">Entrar no sistema</button>
                    </Form>
                </FormStyle>
            </Content>
        </Container>
    );
}
