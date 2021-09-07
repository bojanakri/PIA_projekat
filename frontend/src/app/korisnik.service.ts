import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  
  uri='http://localhost:4000'
  constructor(private http: HttpClient) { }

  login(korime, lozinka, tip){
    const data = {
      korime: korime,
      lozinka: lozinka,
      tip: tip
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  dohvatiDelegata(korime){
    const data = {
      korime: korime
    };
    return this.http.post(`${this.uri}/dohvatiDelegata`, data); 
  }

  dohvatiVodju(korime){
    const data = {
      korime: korime
    };
    return this.http.post(`${this.uri}/dohvatiVodju`, data); 
  }

  proveriMailDelegata(email){
    const data = {
      email: email
    };
    return this.http.post(`${this.uri}/proveriMailDelegata`, data); 
  }

  proveriMailVodje(email){
    const data = {
      email: email
    };
    return this.http.post(`${this.uri}/proveriMailVodje`, data); 
  }

  registerD(ime, prezime, korime, lozinka,tip, email, zemlja, odobren){
    const data={
      ime:ime, 
      prezime:prezime,
      korime:korime,
      lozinka:lozinka,
      tip: tip,
      email: email,
      zemlja: zemlja,
      odobren: odobren
    }
    return this.http.post(`${this.uri}/registerD`, data);
  }
  registerV(ime, prezime, korime, lozinka,tip, email, zemlja, odobren){
    const data={
      ime:ime, 
      prezime:prezime,
      korime:korime,
      lozinka:lozinka,
      tip: tip,
      email: email,
      zemlja: zemlja,
      odobren: odobren
    }
    return this.http.post(`${this.uri}/registerV`, data);
  }

  dohvatiVodjeNaCekanju(){
    return this.http.get(`${this.uri}/dohvatiVodjeNaCekanju`);
  }
  dohvatiDelegateNaCekanju(){
    return this.http.get(`${this.uri}/dohvatiDelegateNaCekanju`);
  }

  dodajDelegata(korime, ime, prezime, zemlja){
    const data={
      korime: korime,
      ime: ime,
      prezime: prezime,
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/dodajDelegata`, data);
  }
  dodajVodju(korime, ime, prezime, zemlja){
    const data={
      korime: korime,
      ime: ime,
      prezime: prezime,
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/dodajVodju`, data);
  }
  dohvatiVodjuZemlje(zemlja){
    const data = {
      zemlja: zemlja
    };
    return this.http.post(`${this.uri}/dohvatiVodjuZemlje`, data); 
  }
}
