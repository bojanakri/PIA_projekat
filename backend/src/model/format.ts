import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Format = new Schema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    format: {
        type: String
    },
    brojTakmicara: {
        type: Number
    },
    brojPokusaja: {
        type: Number
    }
});

export default mongoose.model('Format', Format, 'format');