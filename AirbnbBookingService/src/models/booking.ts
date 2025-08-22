import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize'
import sequelize from './sequelize';


export enum BookingStatus{
    BOOKED = 'BOOKED',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED'
}

class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>>{
    declare id: CreationOptional<number>;
    declare userId : number;
    declare hotelId : number;
    declare checkInDate : Date;
    declare checkOutDate : Date;
    declare createdAt : CreationOptional<Date>;
    declare updatedAt : CreationOptional<Date>;
    declare bookingAmount : number;
    declare bookingId : number;
    declare categoryId : number;
    declare status : BookingStatus;
    declare idempotencyKey : CreationOptional<string>;
    declare numberOfGuests : number;

}


Booking.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        // references:{
        //     model:User,
        //     key:"id"
        // }
    },
    hotelId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    checkInDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    checkOutDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    bookingId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique:true
    },
    bookingAmount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('BOOKED', 'PENDING', 'CANCELLED'),
        defaultValue: BookingStatus.PENDING,
        allowNull:false
    
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    },
    idempotencyKey:{
        type:DataTypes.STRING,
        defaultValue:null,
        unique:true,
        
    },
    numberOfGuests:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    sequelize: sequelize,
    tableName: 'bookings',
    underscored:true,
    timestamps:true
})

export default Booking;