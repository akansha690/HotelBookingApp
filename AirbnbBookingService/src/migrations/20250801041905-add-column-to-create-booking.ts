
import { QueryInterface } from "sequelize"
module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        ADD COLUMN idempotencyKey VARCHAR(250) UNIQUE DEFAULT NULL;
      `
    )
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        DROP COLUMN idempotencyKey;
      `
    )
  }
};
