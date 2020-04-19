import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import FormHeader from '~/components/Form/FormHeader';

import { Container, HtmlView } from './styles';

import api from '~/services/api';

import ActionsButtons from '~/components/ActionsButtons';

export default function DeliveryProblems() {
    const [deliveryProblems, setDeliveryProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        async function loadDeliveryProblems() {
            const { data, headers } = await api.get('delivery/problems', {
                params: {
                    page,
                },
            });

            const dataFormatted = data.map(deliveryProblem => ({
                ...deliveryProblem,
                descriptionFormatted:
                    deliveryProblem.description.length > 100
                        ? `${deliveryProblem.description.substr(0, 100)}...`
                        : deliveryProblem.description,
            }));

            setDeliveryProblems(dataFormatted);
            setTotalItemsCount(parseInt(headers['x-total-count'], 0));
            setLoading(false);
        }

        loadDeliveryProblems();
    }, [page]);

    async function handleDelete(id) {
        try {
            await api.delete(`problem/${id}/cancel-delivery`);
            toast.success('Encomenda cancelada com sucesso.');
        } catch (err) {
            toast.error('Ocorreu um erro ao excluir o registro.');
        }
    }

    function viewDeliveryProblem(delivery_problem) {
        return (
            <HtmlView>
                <strong>Visualizar problema</strong>
                <p>{delivery_problem.description}</p>
            </HtmlView>
        );
    }

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
    }

    return (
        <Container>
            <FormHeader title="Problemas na entrega" buttons={false} />

            {loading && <center>Carregando..</center>}
            {!loading && deliveryProblems.length === 0 && (
                <center>Nenhum registro encontrado.</center>
            )}

            {!loading && deliveryProblems.length !== 0 && (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Encomenda</th>
                                <th>Problema</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryProblems.map(deliveryProblem => (
                                <tr key={deliveryProblem.id}>
                                    <td>{`#${deliveryProblem.delivery_id}`}</td>
                                    <td>
                                        {deliveryProblem.descriptionFormatted}
                                    </td>
                                    <td>
                                        <ActionsButtons
                                            width={250}
                                            textDelete="Cancelar encomenda"
                                            handleDelete={() =>
                                                handleDelete(deliveryProblem.id)
                                            }
                                            showAction
                                            showHandle={() =>
                                                viewDeliveryProblem(
                                                    deliveryProblem
                                                )
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
