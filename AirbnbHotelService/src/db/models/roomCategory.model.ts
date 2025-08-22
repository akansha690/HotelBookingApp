import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';
import Hotel from './hotel.model';


export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  FAMILY = 'FAMILY',
  DELUXE = 'DELUXE',
  SUITE = 'SUITE',
}

class RoomCategory extends Model<
  InferAttributes<RoomCategory>,
  InferCreationAttributes<RoomCategory>
> {
  declare id: CreationOptional<number>;
  declare hotelId: number;
  declare roomCount: number;
  declare roomType: RoomType;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
}

RoomCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Hotel,
        key: 'id',
      },
    },
    roomCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomType: {
      type: DataTypes.ENUM,
      values: [...Object.values(RoomType)],
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
  },
  {
    tableName: 'room_categories',
    sequelize: sequelize,
    underscored: true,
    timestamps: true,
  }
);

export default RoomCategory;