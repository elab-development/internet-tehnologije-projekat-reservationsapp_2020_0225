//biblioteka za rad s MongoDB bazom podataka u Node.js okruženju
import mongoose from "mongoose";

//definicija seme
const ObjectSchema = new mongoose.Schema ({
    title: {type:String, required: true},
    description: {type:String, required: true},
    objectType: {type:String, required: true},
    location: {type:String, required: true},
    price: {type:Number, required: true},
    photo: {type:String, required: true},
    //povezano s drugim modelom "User".
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

})

// Mongoose model za "Object" koji se temelji na prethodno definisanoj šemi 
const objectModel = mongoose.model('Object', ObjectSchema);

export default objectModel;