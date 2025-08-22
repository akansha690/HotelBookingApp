import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';
import Hotel from './hotel.model';
import RoomCategory from './roomCategory.model';

class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
  declare id: CreationOptional<number>;
  declare hotelId: number;
  declare roomTypeId: number;
  declare dateOfAvailability: Date;
  declare price: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
  declare bookingId?: number | null;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Hotel,
        key:'id'
      }  
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:RoomCategory,
        key:'id'
      }
    },
    dateOfAvailability: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    tableName: 'rooms',
    sequelize: sequelize,
    underscored: true,
    timestamps: true
  }
);

export default Room;