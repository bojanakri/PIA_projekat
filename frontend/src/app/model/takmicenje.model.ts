import { Sportista } from "./sportista.model";

export class Takmicenje{
    sport: string;
    disciplina: string;
    format: string;
    pol: string;
    sportisti: Array<Object>;
    delegati: Array<Object>;
    datumPocetka: string;
    datumKraja: string;
    mesto: string;
    unetRaspored: boolean;
    izabraniSportisti: Array<Object>;
    vremeTakmicenja: string;
    datumTakmicenja: string;
    unetRezultat: boolean;
}