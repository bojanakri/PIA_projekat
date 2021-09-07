import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Takmicenje = new Schema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    format: {
        type: String
    },
    pol: {
        type: String
    },
    sportisti: {
        type: Array
    },
    delegati: {
        type: Array
    },
    datumPocetka: {
        type: String
    },
    datumKraja: {
        type: String
    },
    mesto: {
        type: String
    },
    unetRaspored: {
        type: Boolean
    },
    izabraniSportisti: {
        type: Array
    },
    vremeTakmicenja: {
        type: String
    },
    datumTakmicenja: {
        type: String
    },
    unetRezultat: {
        type: Boolean
    }
});

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenje');