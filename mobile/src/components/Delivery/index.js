import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import {
    Container,
    Content,
    Top,
    Title,
    Footer,
    FooterContent,
    Cards,
    Card,
    Label,
    Value,
    DetailsLink,
    DetailsLinkText,
} from './styles';

import Progress from '~/components/Progress';

export default function Delivery({ navigation, delivery }) {
    const dataUpdatedAtParsed = useMemo(() => {
        return format(parseISO(delivery.updatedAt), "dd'/'MM'/'yyyy", {});
    }, []);

    return (
        <Container>
            <Content>
                <Top>
                    <Icon name="local-shipping" size={20} color="#7d40e7" />
                    <Title>{delivery.product}</Title>
                </Top>
                <Progress stepActive={delivery.status.value} />
            </Content>
            <Footer>
                <FooterContent>
                    <Cards>
                        <Card>
                            <Label>Data</Label>
                            <Value>{dataUpdatedAtParsed}</Value>
                        </Card>
                        <Card>
                            <Label>Cidade</Label>
                            <Value>{delivery.recipient.city}</Value>
                        </Card>
                    </Cards>
                    <DetailsLink
                        onPress={() =>
                            navigation.navigate('DeliveryDetail', {
                                delivery,
                            })
                        }
                    >
                        <DetailsLinkText>Ver detalhes</DetailsLinkText>
                    </DetailsLink>
                </FooterContent>
            </Footer>
        </Container>
    );
}

Delivery.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    delivery: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
};

Delivery.defaultProps = {};
