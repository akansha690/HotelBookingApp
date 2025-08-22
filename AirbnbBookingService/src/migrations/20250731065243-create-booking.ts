
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS bookings(
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          hotelId INT NOT NULL,
          bookingAmount FLOAT NOT NULL,
          status ENUM('BOOKED', 'PENDING', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    )
        
  },

  async down (queryInterface: QueryInterface) {
    
    await queryInterface.dropTable('bookings');
     
  }
};
