import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {

    await queryInterface.bulkInsert("rooms", [

      // ── Hotel 1 (Ocean View, Goa) ── room_type_id 1 (SINGLE) ──
      { id: 10, hotel_id: 1, room_type_id: 1, price: 5000, room_no: 101, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 11, hotel_id: 1, room_type_id: 1, price: 5000, room_no: 102, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 12, hotel_id: 1, room_type_id: 1, price: 5000, room_no: 103, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },

      // ── Hotel 1 (Ocean View, Goa) ── room_type_id 2 (DOUBLE) ──
      { id: 13, hotel_id: 1, room_type_id: 2, price: 8000, room_no: 201, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 14, hotel_id: 1, room_type_id: 2, price: 8000, room_no: 202, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },

      // ── Hotel 2 (Mountain Retreat, Manali) ── room_type_id 3 (DELUXE) ──
      { id: 15, hotel_id: 2, room_type_id: 3, price: 12000, room_no: 301, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 16, hotel_id: 2, room_type_id: 3, price: 12000, room_no: 302, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },

      // ── Hotel 2 (Mountain Retreat, Manali) ── room_type_id 4 (SUITE) ──
      { id: 17, hotel_id: 2, room_type_id: 4, price: 18000, room_no: 401, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 18, hotel_id: 2, room_type_id: 4, price: 18000, room_no: 402, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },

      // ── Hotel 3 (City Lights Inn, Bangalore) ── room_type_id 5 (FAMILY) ──
      { id: 19, hotel_id: 3, room_type_id: 5, price: 9000, room_no: 501, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 20, hotel_id: 3, room_type_id: 5, price: 9000, room_no: 502, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },

      // ── Hotel 3 (City Lights Inn, Bangalore) ── room_type_id 6 (DELUXE) ──
      { id: 21, hotel_id: 3, room_type_id: 6, price: 11000, room_no: 601, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },
      { id: 22, hotel_id: 3, room_type_id: 6, price: 11000, room_no: 602, date_of_availability: "2026-01-01", booking_id: null, created_at: new Date(), updated_at: new Date(), deleted_at: null },

    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete(
      "rooms",
      { id: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
      {}
    );
  },
};