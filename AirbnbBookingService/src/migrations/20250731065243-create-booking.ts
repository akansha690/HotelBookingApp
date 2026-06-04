
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS bookings(
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          hotel_id INT NOT NULL,
          booking_amount FLOAT,
          status ENUM('BOOKED', 'PENDING', 'CANCELLED') DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    )
        
  },

  async down (queryInterface: QueryInterface) {
    
    await queryInterface.dropTable('bookings');
     
  }
};
