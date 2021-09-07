import { Disciplina } from "./disciplina.model";

export class Sportista{
    ime: string;
    prezime: string;
    pol: string;
    zemlja: string;
    sport: string;
    disciplina: Array<Disciplina>;
    dodat: boolean;
}