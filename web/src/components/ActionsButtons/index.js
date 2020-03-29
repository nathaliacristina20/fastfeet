import React, { useState, useRef } from 'react';

import { MdMoreHoriz, MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Button, Actions, Chapeu, Content } from './styles';

import AlertConfirm from '~/components/Alert/Confirm';
import AlertModal from '~/components/Alert/AlertModal';

import useOutsideClick from './useOutsideClick';

export default function ActionsButtons({
    pathname,
    state,
    textDelete,
    handleDelete,
    showHandle,
}) {
    const [open, setOpen] = useState(false);
    function openToggle() {
        setOpen(!open);
    }

    function handleConfirm() {
        handleDelete();
        openToggle();
    }

    const ref = useRef();

    useOutsideClick(ref, () => {
        setOpen(false);
    });

    return (
        <Container ref={ref}>
            <Button onClick={openToggle}>
                <MdMoreHoriz size={20} color="#C6C6C6" />
            </Button>
            <Content width={200}>
                <Actions>
                    <Chapeu className={open ? 'opened' : 'closed'} />
                    <ul className={open ? 'opened' : 'closed'}>
                        {showHandle && (
                            <li>
                                <AlertModal
                                    closeActions={openToggle}
                                    showHTML={() => showHandle()}
                                />
                            </li>
                        )}
                        {pathname && (
                            <li>
                                <Link
                                    to={{
                                        pathname,
                                        state,
                                    }}
                                >
                                    <MdModeEdit size={16} color="#4D85EE" />
                                    <span>Editar</span>
                                </Link>
                            </li>
                        )}
                        <li>
                            <AlertConfirm
                                confirm={handleConfirm}
                                title={textDelete || 'Excluir'}
                            />
                        </li>
                    </ul>
                </Actions>
            </Content>
        </Container>
    );
}

ActionsButtons.propTypes = {
    pathname: PropTypes.string,
    state: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textDelete: PropTypes.string,
    handleDelete: PropTypes.func,
    showHandle: PropTypes.func,
};

ActionsButtons.defaultProps = {
    pathname: '',
    state: [],
    textDelete: '',
    handleDelete() {},
    showHandle() {},
};
