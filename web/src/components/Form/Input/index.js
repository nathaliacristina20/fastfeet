import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { Container, Label } from './styles';

export default function Input({ name, label, formRef, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue = '', registerField, error } = useField(
        name
    );
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField, error]);

    function clearFieldError() {
        formRef.current.setFieldError(name, null);
    }

    return (
        <Container>
            <Label>{label}</Label>
            <input
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
                className={error && 'has-error'}
                onClick={clearFieldError}
            />
            {error && <span className="error">{error}</span>}
        </Container>
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    formRef: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
    label: '',
    formRef: [],
};
