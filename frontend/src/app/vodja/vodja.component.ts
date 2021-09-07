import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../model/disciplina.model';
import { Sport } from '../model/sport.model';
import { Sportista } from '../model/sportista.model';
import { Takmicenje } from '../model/takmicenje.model';
import { Vodja } from '../model/vodja.model';
import { SportService } from '../sport.service';
@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private servis: SportService, private router: Router) { }

  ngOnInit(): void {
    this.ja = JSON.parse(localStorage.getItem('prijavljenVodja'));
    this.zemlja = JSON.parse(localStorage.getItem('zemljaVodje'));
    this.servis.dohvatiSveSportove().subscribe((sportovi: Sport[]) => {
      this.sportovi = sportovi;
    });
    this.servis.dohvatiIndividualneSportove().subscribe((individualniSportovi: Sport[]) => {
      this.individualniSportovi = individualniSportovi;
    });


    if (this.ja == null) {
      this.router.navigate(['']);
    }
    this.zemlja = this.ja.zemlja;
  }
  zemlja: string;
  izabraoDisciplinu: boolean;
  poruka: string;
  sportovi: Sport[];
  pol: string;
  sport: string;
  individualniSportovi: Sport[];
  prezime: string;
  ime: string;
  disciplina: string;
  ja: Vodja;
  sportista: Sportista;
  izabran: boolean;
  izabraneDiscipline: Disciplina[];
  izabraniSport: Sport;
  fileToUpload: File | null = null;

  logout() {
    localStorage.removeItem('prijavljen');
    localStorage.clear();
    this.router.navigate(['']);
  }

  takmicenjeMoje: Takmicenje;
  boo: boolean;

  unesiTakmicara() {
    this.servis.dohvatiTakmicenje(this.disciplina, this.pol).subscribe((takmicenje: Takmicenje) => {
      this.takmicenjeMoje = takmicenje;
      if (this.takmicenjeMoje != null) {
        this.poruka = "Ne mozete da prijavljujete vise takmicara za ovu sportsku disciplinu jer je vec kreirano takmicenje!";
        this.boo = false;
      }
      else {
        this.poruka = "Mozete da kreirate novog takmicara";
        this.boo = true;
      }
    });

    if (this.boo) {
      this.servis.dohvatiSportistu(this.ime, this.prezime).subscribe((sportista: Sportista) => {
        this.sportista = sportista;
        if (sportista != null) {
          if (sportista.sport == this.sport) {
            this.poruka = "Ovaj sportista je vec prijavljen za drugi sport, ne moze novi!";
          }
          else {
            this.servis.dodajDisciplinu(this.ime, this.prezime, this.disciplina).subscribe();
            alert("Uspesno ste dodali sportisti novu disciplinu");
          }
        }
        else {
          this.servis.unesiTakmicara(this.ime, this.prezime, this.pol, this.zemlja, this.sport, this.disciplina).subscribe(ob => {
            if (ob['sportista'] == 'ok') {
              this.servis.dodajDisciplinu(this.ime, this.prezime, this.disciplina).subscribe();
              alert("Uspesno ste uneli sportistu");
            }
          });
        }
      })
    }
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let sportisti = JSON.parse(fileReader.result.toString());
      console.log(sportisti);
      for (let i = 0; i < sportisti.length; i++) {
        this.servis.unesiTakmicara(sportisti[i].ime, sportisti[i].prezime, sportisti[i].pol, sportisti[i].zemlja, sportisti[i].sport, sportisti[i].disciplina).subscribe();
      }
    }
    fileReader.readAsText(this.fileToUpload);
    alert("Uspesno je unet json fajl i dodat objekat u bazi!");
  }

}
