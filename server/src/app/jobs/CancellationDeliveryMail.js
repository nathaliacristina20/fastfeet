import Mail from '../../lib/Mail';

class CancellationDeliveryMail {
  get key() {
    return 'CancellationDeliveryMail';
  }

  async handle({ data }) {
    const {
      product,
      deliveryman,
      email,
      recipient,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
      delivery,
      reason,
    } = data;
    await Mail.sendMail({
      to: `${deliveryman} <${email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation_delivery',
      context: {
        delivery,
        deliveryman,
        product,
        recipient,
        street,
        number,
        complement,
        city,
        state,
        zip_code,
        reason,
      },
    });
  }
}

export default new CancellationDeliveryMail();
