import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";



class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare location: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue:null,
      allowNull: true, // Use allowNull instead of defaultValue for nullable fields
    },
    createdAt:{
      type:DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt:{
      type:DataTypes.DATE,
      defaultValue:new Date()
    }
  },
  
  {
    tableName: 'hotels',
    sequelize: sequelize,
    underscored: true, // createdAt --> created_at
    timestamps: true, // createdAt, updatedAt
  }
);

export default Hotel