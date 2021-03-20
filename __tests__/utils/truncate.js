const sequelize = require('../../src/app/models');

module.exports = () => {
  const {
    sequelize: { models },
  } = sequelize;
  return Promise.all(
    Object.keys(models).map((key) => {
      return models[key].destroy({ truncate: true, force: true });
    })
  );
};
