
import { QueryInterface } from "sequelize"
module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        ADD COLUMN idempotency_key VARCHAR(250) UNIQUE DEFAULT NULL;
      `
    )
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        DROP COLUMN idempotency_key;
      `
    )
  }
};
