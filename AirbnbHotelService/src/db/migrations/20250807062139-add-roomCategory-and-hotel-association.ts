import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE room_categories
          ADD CONSTRAINT hotel_categorty_id_fk
          FOREIGN KEY(hotel_id) references hotels(id)   
          ON DELETE CASCADE ON UPDATE CASCADE
      `
    );
  },

  async down (queryInterface: QueryInterface) {
    
     await queryInterface.sequelize.query(
      `
       ALTER TABLE room_categories
          DROP FOREIGN KEY hotel_categorty_id_fk;
      `
     );
  }
};
