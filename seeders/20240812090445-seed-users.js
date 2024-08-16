'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        email_verified_at: new Date(),
        password: await bcrypt.hash('password', 10), // Hash the password
        remember_token: faker.random.alphaNumeric(10),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});

  }
};
