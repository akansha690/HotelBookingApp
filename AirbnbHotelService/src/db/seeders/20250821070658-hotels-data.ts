import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('hotels', [
      {
        id: 1,
        name: 'Ocean View Hotel',
        address: '123 Beachside Lane',
        location: 'Goa',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 2,
        name: 'Mountain Retreat',
        address: '456 Hilltop Road',
        location: 'Manali',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);


    await queryInterface.bulkInsert('room_categories', [
      {
        id:1,
        hotel_id: 1,
        room_type: 'SINGLE',
        room_count: 10,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id:2,
        hotel_id: 1,
        room_type: 'DOUBLE',
        room_count: 8,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      { 
        id:3,
        hotel_id: 2,
        room_type: 'DELUXE',
        room_count: 5,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id:4,
        hotel_id: 2,
        room_type: 'SUITE',
        room_count: 2,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);

     await queryInterface.bulkInsert('rooms', [
      {
        id: 1,
        hotel_id: 1,
        room_type_id: 1,
        price: 5000,
        date_of_availability: '2025-06-03',
        room_no: 1,
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 2,
        hotel_id: 1,
        room_type_id: 2,
        price: 8000,
        room_no: 1,
        date_of_availability: '2025-06-04',
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 3,
        hotel_id: 2,
        room_type_id: 3,
        price:12000,
        room_no: 1,
        date_of_availability: '2025-06-05',
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: 4,
        hotel_id: 2,
        room_type_id: 4,
        price: 6000,
        date_of_availability: '2025-06-03',
        room_no: 1,
        booking_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      // {
      //   id: 5,
      //   hotel_id: 2,
      //   room_type_id: 1,
      //   price: 4500,
      //   room_no: 1,
      //   date_of_availability: '2025-06-04',
      //   booking_id: null,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      //   deleted_at: null,
      // },
      // {
      //   id: 6,
      //   hotel_id: 2,
      //   room_type_id: 2,
      //   price: 10000,
      //   room_no: 1,
      //   date_of_availability: '2025-06-05',
      //   booking_id: null,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      //   deleted_at: null,
      // },
    ]);
   
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('rooms', {}, {});
    await queryInterface.bulkDelete('room_categories', {}, {});
    await queryInterface.bulkDelete('hotels', {}, {});
  },
};