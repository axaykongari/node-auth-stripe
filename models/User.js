const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  remember_token: DataTypes.STRING,
  email_verified_at: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true, // enable timestamps
  createdAt: 'created_at', // map createdAt to created_at
  updatedAt: 'updated_at'  // map updatedAt to updated_at
});

module.exports = User;
