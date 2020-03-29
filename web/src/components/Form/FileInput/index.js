import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import {
    Container,
    Preview,
    PreviewDefault,
    PreviewTextInitials,
    PreviewText,
    ContentPreview,
    Label,
} from './styles';

import { colourOptions } from '~/assets/shared/data';

export default function InputFile({
    name,
    name_initials,
    label,
    preview_default,
    ...rest
}) {
    const inputRef = useRef(null);

    const { fieldName, registerField } = useField(name);

    const [preview, setPreview] = useState(preview_default);
    const [color, setColor] = useState([]);

    async function handlePreview(e) {
        const file = e.target.files[0];
        if (!file) {
            setPreview(null);
        }
        const previewURL = URL.createObjectURL(file);

        setPreview(previewURL);
    }
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'files[0]',
            clearValue(ref) {
                ref.value = '';
                setPreview(null);
            },
            setValue(_, value) {
                setPreview(value);
            },
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        function setColorOption() {
            const colorRandom = Math.round(
                Math.random() * (colourOptions.length - 1)
            );
            setColor(colourOptions[colorRandom]);
        }
        setColorOption();
    }, []);

    return (
        <Container>
            <Label htmlFor={name}>
                <ContentPreview>
                    {preview && (
                        <Preview>
                            <img src={preview} alt="Preview" />
                        </Preview>
                    )}
                    {!preview && !name_initials && (
                        <PreviewDefault>
                            <PreviewText>Adicionar foto</PreviewText>
                        </PreviewDefault>
                    )}
                    {!preview && !preview_default && name_initials && (
                        <PreviewDefault color={`${color}`}>
                            <PreviewTextInitials color={`${color}`}>
                                {name_initials}
                            </PreviewTextInitials>
                        </PreviewDefault>
                    )}
                </ContentPreview>
            </Label>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                id={name}
                onChange={handlePreview}
                {...rest}
            />
            {/* {error && <span className="error">{error}</span>} */}
        </Container>
    );
}

InputFile.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    preview_default: PropTypes.string,
    name_initials: PropTypes.string,
};

InputFile.defaultProps = {
    label: '',
    schema: {},
    preview_default: '',
    name_initials: '',
};
