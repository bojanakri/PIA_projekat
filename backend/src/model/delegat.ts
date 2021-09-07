import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Delegat = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip:{
        type: String
    },
    zemlja:{
        type: String
    },
    email: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    brojTakmicenja: {
        type: Number
    }
});

export default mongoose.model('Delegat', Delegat, 'delegat');
