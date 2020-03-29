import React from 'react';
import PropTypes from 'prop-types';
import { Image, Default, NameInitials } from './styles';

export default function Avatar({ uri, nameInitials, size }) {
    return (
        <>
            {uri ? (
                <Image
                    size={size}
                    source={{
                        uri,
                    }}
                />
            ) : (
                <Default>
                    <NameInitials>{nameInitials}</NameInitials>
                </Default>
            )}
        </>
    );
}

Avatar.propTypes = {
    uri: PropTypes.string,
    nameInitials: PropTypes.string,
    size: PropTypes.number.isRequired,
};

Avatar.defaultProps = {
    uri: '',
    nameInitials: '',
};
