import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import FormHeader from '~/components/Form/FormHeader';
import { Container } from './styles';

import api from '~/services/api';

import ActionsButtons from '~/components/ActionsButtons';

import { Avatar } from '~/styles/form';

import Badge from '~/components/Badge';

export default function Deliverymans() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        async function loadDeliverymans() {
            const { data, headers } = await api.get('deliverymans', {
                params: {
                    page,
                },
            });
            setDeliverymans(data);
            setTotalItemsCount(parseInt(headers['x-total-count'], 10));
            setLoading(false);
        }
        loadDeliverymans();
    }, [page]);

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
    }

    async function handleDelete(id) {
        try {
            await api.delete(`deliverymans/${id}`);
            setDeliverymans(
                deliverymans.filter(deliveryman => deliveryman.id !== id)
            );
            setTotalItemsCount(totalItemsCount - 1);
            setPage(1);
            toast.success('Registro excluido com sucesso.');
        } catch (err) {
            toast.error('Ocorreu um erro ao excluir a encomenda.');
        }
    }

    async function handleDeliverymans(event) {
        try {
            const { data, headers } = await api.get('deliverymans', {
                params: { name: event.target.value },
            });
            setPage(1);
            setDeliverymans(data);
            setTotalItemsCount(parseInt(headers['x-total-count'], 10));
            setLoading(false);
        } catch (err) {
            toast.error('Ocorreu um erro ao buscar os registros.');
        }
    }

    return (
        <Container>
            <FormHeader
                pathname="entregadores"
                title="Gerenciando entregadores"
                handleIndex={handleDeliverymans}
            />

            {loading && <center>Carregando..</center>}
            {!loading && deliverymans.length <= 0 && (
                <center>Nenhum registro encontrado.</center>
            )}

            {deliverymans.length > 0 && (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliverymans.map(deliveryman => (
                                <tr key={deliveryman.id}>
                                    <td>#{deliveryman.id}</td>
                                    <td>
                                        {deliveryman &&
                                        deliveryman.avatar &&
                                        deliveryman.avatar.url !== null ? (
                                            <Avatar>
                                                <img
                                                    src={deliveryman.avatar.url}
                                                    alt={deliveryman.name}
                                                />
                                            </Avatar>
                                        ) : (
                                            <Badge
                                                initials={
                                                    deliveryman.name_initials
                                                }
                                            />
                                        )}
                                    </td>
                                    <td>{deliveryman.name}</td>
                                    <td>{deliveryman.email}</td>
                                    <td>
                                        <ActionsButtons
                                            pathname={`/entregadores/${deliveryman.id}/editar`}
                                            state={deliveryman}
                                            handleDelete={() =>
                                                handleDelete(deliveryman.id)
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
                        nextPageText="proximo"
                        firstPageText="primeiro"
                        lastPageText="ultimo"
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
