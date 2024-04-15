import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    fromSlot:{
        type:Date,
        required:true,
    },
    toSlot:{
        type:Date,
        required:true,
    },
    totalHour:{
        type:Number,
        required:true,
    },
    totalAmount:{
        type:Number,
        default:true,
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"approved"
    }
},
{timestamps:true,}
);

if(mongoose.models.bookings){
    const bookingModel = mongoose.model("bookings");
    mongoose.deleteModel(bookingModel.modelName);
}

const Booking = mongoose.model("bookings",bookingSchema);
export default Booking;
