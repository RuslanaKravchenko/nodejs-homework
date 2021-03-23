const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:./data/contacts.db");

sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
});

sequelize.sync();

module.exports = {
  db: sequelize,
  connect: sequelize.authenticate(),
};
