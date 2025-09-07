

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        ADD COLUMN number_of_guests INT NOT NULL DEFAULT 0

      `
    )
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings 
        DROP COLUMN number_of_guests
        
      `
    )
  }
};
