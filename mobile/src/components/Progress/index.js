import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Container, List, ContainerT, Circle, StepT, Name } from './styles';

export default function Progress({ stepActive }) {
    const [progress] = useState([
        { key: '1', label: 'Aguardando Retirada', active: true },
        { key: '4', label: 'Retirada', active: false },
        { key: '3', label: 'Entregue', active: false },
    ]);

    const [steps, setSteps] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSteps() {
            const checkedSteps = [];
            let finded = false;
            progress.forEach(step => {
                if (step.key !== stepActive && !finded) {
                    checkedSteps.push({ ...step, active: true });
                }
                if (step.key !== stepActive && finded) {
                    checkedSteps.push({ ...step, active: false });
                }
                if (step.key === stepActive) {
                    finded = true;
                    checkedSteps.push({ ...step, active: true });
                }
            });

            setSteps(checkedSteps);
            setLoading(false);
        }
        loadSteps();
    }, [stepActive]);

    return (
        <Container>
            {loading ? (
                <ActivityIndicator size="large" color="#ddd" />
            ) : (
                <List
                    data={steps}
                    keyExtractor={step => String(step.key)}
                    refreshing={loading}
                    renderItem={({ item: step }) => (
                        <ContainerT>
                            <StepT>
                                <Circle active={step.active} />
                                <Name>{step.label}</Name>
                            </StepT>
                        </ContainerT>
                    )}
                />
            )}
        </Container>
    );
}

Progress.propTypes = {
    stepActive: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

Progress.defaultProps = {};
