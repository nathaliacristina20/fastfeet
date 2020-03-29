import React, { useRef, useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

import PropTypes from 'prop-types';

import { Container, Label } from './styles';

export default function SelectInput({
    name,
    label,
    formRef,
    options,
    ...rest
}) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    const styleDefault = {
        control: base => ({
            ...base,
            height: '45px',
        }),
    };

    const [styles, setStyles] = useState(styleDefault);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'state.value',
            getValue: ref => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return [];
                    }
                    return ref.state.value.map(option => option.value);
                }
                if (!ref.state.value) {
                    return '';
                }
                return ref.state.value.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    useEffect(() => {
        if (error) {
            setStyles({
                control: (base, state) => ({
                    ...base,
                    height: '45px',
                    border: '1px solid red',
                }),
            });
        }
    }, [error]);

    function clearFieldError() {
        formRef.current.setFieldError(name, null);
        setStyles(styleDefault);
    }

    return (
        <Container>
            <Label htmlFor={selectRef}>{label}</Label>
            <ReactSelect
                defaultValue={defaultValue}
                ref={selectRef}
                options={options}
                classNamePrefix="react-select"
                noOptionsMessage={() => 'Nenhum registro localizado'}
                loadingMessage={() => 'Carregando...'}
                onInputChange={clearFieldError}
                styles={styles}
                {...rest}
            />
            <br />
            {error && <span className="error">{error}</span>}
        </Container>
    );
}

SelectInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    formRef: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SelectInput.defaultProps = {
    name: null,
    label: null,
    placeholder: '',
    formRef: [],
};
