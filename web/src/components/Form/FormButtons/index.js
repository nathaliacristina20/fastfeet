import React from 'react';

import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container } from './styles';
import { TopTitle, TopButtons } from '~/styles/form';
import Button from '~/components/Form/Button';

export default function FormButtons({ title, pathname }) {
    return (
        <Container>
            <TopButtons>
                <TopTitle>{title}</TopTitle>
                <Link to={`/${pathname}`} className="btnBack">
                    <MdKeyboardArrowLeft size={20} color="#FFF" />
                    <span>Voltar</span>
                </Link>
                <Button
                    type="submit"
                    text="Salvar"
                    textTransform="uppercase"
                    width="112"
                    height="36"
                    icon="MdCheck"
                />
            </TopButtons>
        </Container>
    );
}

FormButtons.propTypes = {
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string,
};

FormButtons.defaultProps = {
    title: null,
};
