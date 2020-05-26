import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
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
    } = data;
    await Mail.sendMail({
      to: `${deliveryman} <${email}>`,
      subject: 'Nova encomenda disponível',
      template: 'new_delivery',
      context: {
        deliveryman,
        product,
        recipient,
        street,
        number,
        complement,
        city,
        state,
        zip_code,
      },
    });
  }
}

export default new NewDeliveryMail();
