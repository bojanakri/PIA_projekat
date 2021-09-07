import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SportService {

  uri='http://localhost:4000'
  constructor(private http: HttpClient) { }


  dohvatiSveSportove(){
    return this.http.get(`${this.uri}/dohvatiSveSportove`);
  }
  dohvatiIndividualneSportove(){
    return this.http.get(`${this.uri}/dohvatiIndividualneSportove`);
  }

  dodajSportDisciplinu(nazivSporta, nazivDiscipline){
    const data={
      nazivSporta: nazivSporta,
      nazivDiscipline: nazivDiscipline
    }
    return this.http.post(`${this.uri}/dodajSportDisciplinu`, data);
  }

  unesiTakmicara(ime, prezime, pol, zemlja, sport, s){
    const data={
      ime: ime,
      prezime: prezime,
      pol:pol,
      zemlja:zemlja,
      sport:sport,
      nazivDiscipline: s
    }
    return this.http.post(`${this.uri}/unesiTakmicara`, data);
  }

  dohvatiSportistu(ime, prezime){
    const data={
      ime: ime,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/dohvatiSportistu`, data);
  }

  dodajDisciplinu(ime, prezime, disciplina){
    const data={
      ime:ime,
      prezime:prezime,
      disciplina: disciplina
    }
    return this.http.post(`${this.uri}/dodajDisciplinu`, data);
  }
  dohvatiSveSportiste(){
    return this.http.get(`${this.uri}/dohvatiSveSportiste`);
  }
  dohvatiSveDelegate(){
    return this.http.get(`${this.uri}/dohvatiSveDelegate`);
  }
  dohvatiFormat(disciplina){
    const data={
      disciplina: disciplina
    }
    return this.http.post(`${this.uri}/dohvatiFormat`, data);
  }
  unesiTakmicenje(sport, disciplina, format, pol, sportisti, delegati, datumPocetka, datumKraja, mesto, unetRaspored,izabraniSportisti,vremeTakmicenja, datumTakmicenja, unetRezultat){
    const data={
      sport: sport,
      disciplina: disciplina,
      format: format,
      pol: pol,
      sportisti: sportisti,
      delegati: delegati,
      datumPocetka: datumPocetka,
      datumKraja: datumKraja,
      mesto: mesto,
      unetRaspored: unetRaspored,
      izabraniSportisti: izabraniSportisti,
      vremeTakmicenja: vremeTakmicenja,
      datumTakmicenja: datumTakmicenja,
      unetRezultat: unetRezultat
    }
    return this.http.post(`${this.uri}/unesiTakmicenje`, data);
  }

  dohvatiSveZemlje(){
    return this.http.get(`${this.uri}/dohvatiSveZemlje`);
  }
  dohvatiSportisteIzZemlje(zemlja){
    const data={
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/dohvatiSportisteIzZemlje`, data);
  }
  pretraziSportisteSport(sport){
    const data={
      sport: sport
    }
    return this.http.post(`${this.uri}/pretraziSportisteSport`, data);
  }
  pretraziSportisteZemljaSport(zemlja,sport){
    const data={
      zemlja: zemlja,
      sport: sport
    }
    return this.http.post(`${this.uri}/pretraziSportisteZemljaSport`, data);
  }

  pretraziSportisteImeSport(ime, prezime, sport){
    const data={
      ime: ime,
      prezime: prezime,
      sport: sport
    }
    return this.http.post(`${this.uri}/pretraziSportisteImeSport`, data);
  }

  pretraziSportisteImeZemlja(ime,prezime,zemlja){
    const data={
      ime: ime,
      prezime: prezime,
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/pretraziSportisteImeZemlja`, data);
  }

  pretraziSportisteImeZemljaSport(ime,prezime,zemlja,sport){
    const data={
      ime: ime,
      prezime: prezime,
      zemlja: zemlja,
      sport: sport
    }
    return this.http.post(`${this.uri}/pretraziSportisteImeZemljaSport`, data);
  }

  pretraziSportisteIme(ime, prezime){
    const data={
      ime: ime, 
      prezime: prezime
    }
    return this.http.post(`${this.uri}/pretraziSportisteIme`, data);
  }
  
  dohvatiTakmicenje(disciplina, pol){
    const data={
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/dohvatiTakmicenje`, data);
  }
  
  dohvatiSvaTakmicenjaZaRaspored(){
    return this.http.get(`${this.uri}/dohvatiSvaTakmicenjaZaRaspored`);
  }
  dohvatiSvaTakmicenjaZaRezultat(){
    return this.http.get(`${this.uri}/dohvatiSvaTakmicenjaZaRezultat`);
  }

  unesiIzabraneSportisteRaspored(disciplina,izabraniSportisti, vremeTakmicenja, datumTakmicenja){
    const data={
      disciplina: disciplina,
      izabraniSportisti: izabraniSportisti,
      vremeTakmicenja: vremeTakmicenja,
      datumTakmicenja: datumTakmicenja
    }
    return this.http.post(`${this.uri}/unesiIzabraneSportisteRaspored`, data);
  }

  unesiRezTakmicenja(disciplina){
    const data={
     disciplina: disciplina
    }
    return this.http.post(`${this.uri}/unesiRezTakmicenja`, data);
  }
  uvecajZlatne(zemlja){
    const data={
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/uvecajZlatne`, data);
  }
  uvecajSrebrne(zemlja){
    const data={
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/uvecajSrebrne`, data);
  }
  uvecajBronzane(zemlja){
    const data={
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/uvecajBronzane`, data);
  }

  povecajBrojTakmicenjaDelegatu(korime){
    const data={
      korime: korime
    }
    return this.http.post(`${this.uri}/povecajBrojTakmicenjaDelegatu`, data);
  }
}
