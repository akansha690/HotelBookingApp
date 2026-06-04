import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS rooms(
          id INT PRIMARY KEY AUTO_INCREMENT,
          hotel_id INT NOT NULL,
          room_type_id INT NOT NULL,
          price INT NOT NULL,
          room_no INT NOT NULL,
          date_of_availability DATE NOT NULL,
          booking_id INT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP DEFAULT NULL
        )
      `
    )
  },

  async down (queryInterface: QueryInterface) {
    
     await queryInterface.sequelize.query(
      `
        DROP TABLE IF EXISTS rooms;
      `
     )
  }
};
