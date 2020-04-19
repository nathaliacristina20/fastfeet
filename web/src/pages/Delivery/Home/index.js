import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import Pagination from 'react-js-pagination';
// import HomePagination from '~/components/HomePagination';

import { Container, Circle, HtmlView } from './styles';
import api from '~/services/api';
import Badge from '~/components/Badge';
import ActionsButtons from '~/components/ActionsButtons';
import FormHeader from '~/components/Form/FormHeader';

export default function Deliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState();

    useEffect(() => {
        async function loadDeliveries() {
            if (page === null) {
                setPage(1);
            }
            const { data, headers } = await api.get('deliveries', {
                params: {
                    page,
                },
            });
            setDeliveries(data);
            setTotalItemsCount(parseInt(headers['x-total-count'], 10));
            setLoading(false);
        }
        loadDeliveries();
    }, [page]);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
    }

    async function handleDelete(id) {
        try {
            await api.delete(`deliveries/${id}`);
            setPage(null);
            toast.success('Registro excluido com sucesso.');
        } catch (err) {
            toast.error('Ocorreu um erro ao excluir a encomenda.');
        }
    }

    async function handleDeliveries(event) {
        try {
            const { data, headers } = await api.get('deliveries', {
                params:
                    event.target.value !== ''
                        ? { product: event.target.value }
                        : {},
            });
            setDeliveries(data);
            setTotalItemsCount(headers['x-total-count']);
            setPage(1);
            setLoading(false);
        } catch (err) {
            toast.error('Ocorreu um erro ao buscar os registros.');
        }
    }

    function viewDelivery(delivery) {
        return (
            <HtmlView>
                <h3>Informações da encomenda</h3>
                <p>
                    {delivery.recipient.street}, {delivery.recipient.number}
                </p>
                <p>
                    {delivery.recipient.city} - {delivery.recipient.state}
                </p>
                <p>{delivery.recipient.zip_code}</p>
                {(delivery.start_date || delivery.end_date) && (
                    <>
                        <hr />
                        <h3>Datas</h3>
                        <span>
                            <strong>Retirada: </strong>
                            {delivery.start_date !== null &&
                                format(
                                    parseISO(delivery.start_date),
                                    "dd'/'MM'/'yyyy"
                                )}
                        </span>
                        <span>
                            <strong>Entrega: </strong>
                            {delivery.end_date !== null &&
                                format(
                                    parseISO(delivery.end_date),
                                    "dd'/'MM'/'yyyy"
                                )}
                        </span>
                    </>
                )}
                {delivery.signature && (
                    <>
                        <hr />
                        <strong>Assinatura do destinatário</strong>
                        <img
                            src={delivery.signature.url}
                            alt={delivery.recipient.name}
                        />
                    </>
                )}
            </HtmlView>
        );
    }

    return (
        <Container>
            <FormHeader
                title="Gerenciando encomendas"
                pathname="encomendas"
                handleIndex={handleDeliveries}
            />

            {loading && <center>Carregando..</center>}
            {!loading && deliveries.length <= 0 && (
                <center>Nenhum registro encontrado.</center>
            )}
            {!loading && deliveries.length !== 0 && (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Destinatário</th>
                                <th>Entregador</th>
                                <th>Produto</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map(delivery => (
                                <tr key={delivery.id}>
                                    <td>#{delivery.id}</td>
                                    <td>{delivery.recipient.name}</td>
                                    <td>
                                        <Badge
                                            avatar={
                                                delivery.deliveryman.avatar &&
                                                delivery.deliveryman.avatar.url
                                            }
                                            initials={
                                                delivery.deliveryman
                                                    .name_initials
                                            }
                                            name={delivery.deliveryman.name}
                                        />
                                    </td>
                                    <td>{delivery.product}</td>
                                    <td>{delivery.recipient.city}</td>
                                    <td>{delivery.recipient.state}</td>
                                    <td>
                                        <Circle>
                                            <div
                                                className={`status status-${delivery.status.value}`}
                                            >
                                                <div className="circulo" />
                                                {delivery.status.label}
                                            </div>
                                        </Circle>
                                    </td>
                                    <td>
                                        <ActionsButtons
                                            pathname={`encomendas/${delivery.id}/editar`}
                                            handleDelete={() =>
                                                handleDelete(delivery.id)
                                            }
                                            state={delivery}
                                            showAction
                                            showHandle={() =>
                                                viewDelivery(delivery)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        class="pagination"
                        prevPageText="anterior"
                        nextPageText="próximo"
                        firstPageText="primeiro"
                        lastPageText="último"
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </Container>
    );
}
