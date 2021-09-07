import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegat } from '../model/delegat.model';
import { Disciplina } from '../model/disciplina.model';
import { Format } from '../model/format.model';
import { Organizator } from '../model/organizator.model';
import { Sport } from '../model/sport.model';
import { Sportista } from '../model/sportista.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-unos-takmicenja',
  templateUrl: './unos-takmicenja.component.html',
  styleUrls: ['./unos-takmicenja.component.css']
})
export class UnosTakmicenjaComponent implements OnInit {

  
  constructor(private servis: SportService, private router: Router) { }

  ngOnInit(): void {
    this.servis.dohvatiSveSportove().subscribe((sportovi: Sport[]) => {
      this.sportovi = sportovi;
    });

    this.servis.dohvatiIndividualneSportove().subscribe((individualniSportovi: Sport[]) => {
      this.individualniSportovi = individualniSportovi;
    });

    this.servis.dohvatiSveSportiste().subscribe((sportisti: Sportista[]) => {
      this.sportisti = sportisti;
      this.sportisti.forEach(s => {
        s.dodat = false;
      });
    });

    this.servis.dohvatiSveDelegate().subscribe((delegati: Delegat[]) => {
      this.delegati = delegati;
      this.delegati.forEach(d => {
        d.dodat = false;
      })
    });
    this.ja = JSON.parse(localStorage.getItem('prijavljenOrganizator'));
    if (this.ja == null) {
      this.router.navigate(['']);
    }
  }
  ja: Organizator;
  poruka: string;
  sportovi: Sport[];
  pol: string;
  mesto: string;
  datumPocetka: Date;
  datumKraja: Date;
  sport: string;
  individualniSportovi: Sport[];
  disciplina: string;
  format: Format;
  sportisti: Sportista[];
  idSportista: number;
  delegati: Delegat[];
  izabraniSport: Sport;
  izabraneDiscipline: Disciplina[];
  izabran: boolean = false;
  pomocniSportisti: Sportista[] = [];
  izabraniSportisti: Sportista[] = [];
  izabraniDelegati: Delegat[] = [];
  tipDiscipline: string;
  nazivFormata: string;
  unetRaspored: boolean = false;
  unetRezultat: boolean = false;
  izabraniSportisti2: Sportista[] = [];
  datumTakmicenja: string = "";
  vremeTakmicenja: string = "";


  logout() {
    localStorage.removeItem('prijavljen');
    localStorage.clear();
    this.router.navigate(['']);
  }

  unesiTakmicenje() {
    if (this.sport == "" || this.disciplina == "" || this.pol == "" || this.mesto == "" || this.datumPocetka == null || this.datumKraja == null || this.format == null) {
      this.poruka = "Morate uneti sve podatke";
    }
    else {
      this.sportisti.forEach(s => {
        if(s.dodat){
          this.pomocniSportisti.push(s);
        }
      });

      this.delegati.forEach(d => {
        if(d.dodat){
          this.izabraniDelegati.push(d);
        }
      });

      this.pomocniSportisti.forEach(s => {
        if(s.pol == this.pol){
          s.disciplina.forEach(d => {
          if (d.naziv == this.disciplina){
            this.izabraniSportisti.push(s);
          }
        });
        }
      });
      if(this.izabraniSportisti.length == 0 || this.izabraniDelegati.length == 0){
        this.poruka="Morate uneti sportiste i delegate";
        return;
      }
     
      else{     
          for (let i = 0; i < this.izabraniDelegati.length; i++) {
            this.servis.povecajBrojTakmicenjaDelegatu(this.izabraniDelegati[i].korime).subscribe();
          }
          this.servis.unesiTakmicenje(this.sport, this.disciplina, this.nazivFormata, this.pol, this.izabraniSportisti, this.izabraniDelegati, this.datumPocetka, this.datumKraja, this.mesto, this.unetRaspored,this.izabraniSportisti, this.vremeTakmicenja, this.datumTakmicenja, this.unetRezultat).subscribe();
          alert("Uspesno ste uneli takmicenje");
      }
    }
         
  }

  predloziFormat() {
    this.servis.dohvatiFormat(this.disciplina).subscribe((format: Format) => {
      this.format = format;
      this.nazivFormata = format.format;
    })
  }

  dohvatiDiscipline() {
    this.izabraneDiscipline = [];
    this.individualniSportovi.forEach(s => {
      if (s.sport == this.sport) {
        this.izabraniSport = s;
        s.disciplina.forEach(d => {
          if (d.vrsta.match("individualni")) {
            this.izabraneDiscipline.push(d);
          }
        });
      }
    });
    this.izabran = true;
  }
}
