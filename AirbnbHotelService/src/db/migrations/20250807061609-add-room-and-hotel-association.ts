import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE rooms
          ADD CONSTRAINT hotel_id_fk
          FOREIGN KEY(hotel_id) references hotels(id)   
          ON DELETE CASCADE ON UPDATE CASCADE
      `
    );
  },

  async down (queryInterface: QueryInterface) {
    
     await queryInterface.sequelize.query(
      `
       ALTER TABLE rooms
          DROP FOREIGN KEY hotel_id_fk
       
      `
     );
  }
};
