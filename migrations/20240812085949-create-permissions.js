'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255), // or (166) if you prefer InnoDB with Redundant/Compact row format
        allowNull: false
      },
      guard_name: {
        type: Sequelize.STRING(25),
        allowNull: false
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

    await queryInterface.addConstraint('permissions', {
      fields: ['name', 'guard_name'],
      type: 'unique',
      name: 'permissions_name_guard_name_unique'
    });

    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255), // or (166) if you prefer InnoDB with Redundant/Compact row format
        allowNull: false
      },
      guard_name: {
        type: Sequelize.STRING(25),
        allowNull: false
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

    await queryInterface.addConstraint('roles', {
      fields: ['name', 'guard_name'],
      type: 'unique',
      name: 'roles_name_guard_name_unique'
    });

    await queryInterface.createTable('role_has_permissions', {
      permission_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      role_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addConstraint('role_has_permissions', {
      fields: ['permission_id', 'role_id'],
      type: 'primary key',
      name: 'role_has_permissions_permission_id_role_id_primary'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('role_has_permissions');
  }
};
