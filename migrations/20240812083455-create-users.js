'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email_verified_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      remember_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('password_reset_tokens', {
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Assumes there's a users table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true
      },
      ip_address: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      payload: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      last_activity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        index: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('password_reset_tokens');
    await queryInterface.dropTable('sessions');
  }
};
