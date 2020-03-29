import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { Container, Label } from './styles';

export default function InputMask({ name, label, formRef, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref, value) {
                ref.setInputValue('');
            },
            clearValue(ref) {
                ref.setInputValue('');
            },
        });
    }, [fieldName, registerField]);

    function clearFieldError() {
        formRef.current.setFieldError(name, null);
    }

    return (
        <Container>
            <Label htmlFor={inputRef}>{label}</Label>
            <ReactInputMask
                ref={inputRef}
                defaultValue={defaultValue}
                onClick={clearFieldError}
                className={error && 'has-error'}
                {...rest}
            />
            {error && <span className="error">{error}</span>}
        </Container>
    );
}

InputMask.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    formRef: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputMask.defaultProps = {
    label: '',
    formRef: [],
};
