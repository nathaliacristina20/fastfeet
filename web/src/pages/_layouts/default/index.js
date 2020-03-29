import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content } from './styles';

import Menu from '../../../components/Menu';

export default function DefaultLayout({ children }) {
    return (
        <Wrapper>
            <Menu />
            <Content>{children}</Content>
        </Wrapper>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
