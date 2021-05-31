import { Schema, Model, model } from 'mongoose';


const equipmentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    definition: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    modelEquip: {
        type: String,
        require: true
    },
    serie: {
        type: String,
        required: true,

    },
    weight: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    invimaReg: {
        type: String,
        required: true
    },
    usefulLife: {
        type: String,
        required: true
    },
    noInvima: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },

});
export const Equipment = model('Equipment', equipmentSchema);