import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE rooms
          ADD CONSTRAINT room_type_fk
          FOREIGN KEY(room_type_id) references room_categories(id)   
          ON DELETE CASCADE ON UPDATE CASCADE
      `
    );
  },

  async down (queryInterface: QueryInterface) {
    
     await queryInterface.sequelize.query(
      `
       ALTER TABLE rooms
          DROP FOREIGN KEY room_type_fk
        
      `
     );
  }
};
