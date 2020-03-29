import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        name_initials: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.name.split(' ').length > 1) {
              return `${this.name.split(' ')[0].substr(0, 1)}${this.name
                .split(' ')[1]
                .substr(0, 1)}`;
            }

            return `${this.name.split(' ')[0].substr(0, 1)}`;
          },
        },
        active: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
