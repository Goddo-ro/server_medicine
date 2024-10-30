const { sequelize, Sequelize } = require("./sequelize");

const Transaction = sequelize.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal("nextval('disease_id_seq'::regclass)"),
    },
    medicine_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'medicine',
            key: 'id'
        }
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    purchase_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    expiration_date: {
        type: Sequelize.DATE
    },
    user_uid: {
        type: Sequelize.TEXT
    }
}, {
    tableName: 'transaction',
    timestamps: false,
});

module.exports = Transaction;
