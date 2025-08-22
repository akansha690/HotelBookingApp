

import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings
        ADD COLUMN check_in_date Date NOT NULL,
        ADD COLUMN check_out_date Date NOT NULL;

      `
    )
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE bookings 
        DROP COLUMN check_in_date,
        DROP COLUMN check_out_date;
        
      `
    )
  }
};
