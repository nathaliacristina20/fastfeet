import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { MdRemoveRedEye } from 'react-icons/md';
import { Container, Option, ModalStyle } from './styles';

export default function AlertModal({ showHTML, closeActions }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            position: `fixed`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
    };
    // let subtitle;
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleOpen() {
        openModal();
        closeActions();
    }

    return (
        <Container>
            <MdRemoveRedEye size={16} color="#7D40E7" />
            <Option onClick={handleOpen}>Visualizar</Option>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <ModalStyle>{showHTML()}</ModalStyle>
            </Modal>
        </Container>
    );
}

AlertModal.propTypes = {
    showHTML: PropTypes.func,
    closeActions: PropTypes.func,
};

AlertModal.defaultProps = {
    showHTML: null,
    closeActions: null,
};
