

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
          ADD COLUMN bookingId INT NOT NULL UNIQUE;
      `
    )
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings 
        DROP COLUMN bookingId;
        
      `
    )
  }
};
