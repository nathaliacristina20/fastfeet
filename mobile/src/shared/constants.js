export default {
    STATUS: {
        pending: {
            value: 1,
            label: 'Aguardando Retirada',
            labelLink: 'Pendentes',
            active: true,
        },
        canceled: {
            value: 2,
            label: 'Cancelada',
            active: false,
        },
        delivered: {
            value: 3,
            label: 'Entregue',
            labelLink: 'Entregues',
            active: false,
        },
        retired: {
            value: 4,
            label: 'Retirada',
            active: false,
        },
    },
};
