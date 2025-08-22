

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        ADD COLUMN numberOfGuests INT NOT NULL DEFAULT 0

      `
    )
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings 
        DROP COLUMN numberOfGuests
        
      `
    )
  }
};
