import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function ConfirmAlert({ confirm, title }) {
    const [state, setState] = useState({ alert: null });

    function onCancel() {
        setState({});
    }

    function handleConfirm() {
        confirm();
        onCancel();
    }

    function deleteThisGoal() {
        const getAlert = () => (
            <SweetAlert
                showCancel
                confirmBtnText="Sim, apague isto!"
                confirmBtnStyle={{ backgroundColor: '#7D40E7' }}
                cancelBtnText="Cancelar"
                cancelBtnStyle={{ backgroundColor: '#CCCCCC' }}
                title="Tem certeza?"
                onConfirm={handleConfirm}
                onCancel={onCancel}
                focusCancelBtn
            >
                Este registro não poderá ser recuperado!
            </SweetAlert>
        );

        setState({
            alert: getAlert(),
        });
    }

    return (
        <Container className="apagar" onClick={() => deleteThisGoal()}>
            <MdDeleteForever size={16} color="#DE3B3B" />
            {title}
            {state.alert}
        </Container>
    );
}

ConfirmAlert.propTypes = {
    title: PropTypes.string,
    confirm: PropTypes.func,
};

ConfirmAlert.defaultProps = {
    title: '',
    confirm() {},
};
