import Sequelize, { Model } from 'sequelize';
import Constants from '../shared/constants';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        active: Sequelize.INTEGER,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.canceled_at !== null) {
              return Constants.STATUS.canceled;
            }
            if (this.end_date !== null) {
              return Constants.STATUS.delivered;
            }
            if (this.start_date !== null) {
              return Constants.STATUS.retired;
            }
            return Constants.STATUS.pending;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}

export default Delivery;
