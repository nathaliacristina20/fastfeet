import React from 'react';

import { MdAdd, MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Text } from './styles';

export default function Button({ type, text, icon, ...rest }) {
    return (
        <Container {...rest}>
            <button type={type}>
                {icon === 'MdAdd' && <MdAdd size={16} color="#FFF" />}
                {icon === 'MdKeyboardArrowLeft' && (
                    <MdKeyboardArrowLeft size={20} color="#FFF" />
                )}{' '}
                {icon === 'MdCheck' && <MdCheck size={20} color="#FFF" />}
                <Text>{text}</Text>
            </button>
        </Container>
    );
}
