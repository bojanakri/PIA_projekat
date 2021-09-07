import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Organizator = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    }
});

export default mongoose.model('Organizator', Organizator, 'organizator');