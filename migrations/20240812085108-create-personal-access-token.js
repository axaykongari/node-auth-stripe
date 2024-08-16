'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('personal_access_tokens', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      tokenable_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tokenable_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
      },
      abilities: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      last_used_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('personal_access_tokens', ['tokenable_type', 'tokenable_id']);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('personal_access_tokens');
  }
};
