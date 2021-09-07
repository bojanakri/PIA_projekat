import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sportista = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    zemlja: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: Array
    },
    sekund:{
        type: Number
    }
});

export default mongoose.model('Sportista', Sportista, 'sportista');