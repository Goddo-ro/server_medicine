const { sequelize, Sequelize } = require("./sequelize");

const Disease = sequelize.define("disease", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: sequelize.literal("nextval('disease_id_seq'::regclass)"),
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
}, {
    tableName: 'disease',
    timestamps: false,
});

module.exports = Disease;