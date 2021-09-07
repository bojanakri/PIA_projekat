import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Delegat } from '../model/delegat.model';
import { Organizator } from '../model/organizator.model';
import { Vodja } from '../model/vodja.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-ceka-za-registraciju',
  templateUrl: './ceka-za-registraciju.component.html',
  styleUrls: ['./ceka-za-registraciju.component.css']
})
export class CekaZaRegistracijuComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router, private servisSport: SportService) { }

  ngOnInit(): void {
    
    this.ja = JSON.parse(localStorage.getItem('prijavljenOrganizator'));
    if (this.ja == null) {
      this.router.navigate(['']);
    };
    this.servis.dohvatiDelegateNaCekanju().subscribe((delegati: Delegat[])=>{
      this.delegatiZaOdobrenje=delegati;
    });
    this.servis.dohvatiVodjeNaCekanju().subscribe((vodje: Vodja[])=>{
      this.vodjeZaOdobrenje = vodje;
    });

  }
  ja: Organizator;
  vodjeZaOdobrenje: Vodja[];
  delegatiZaOdobrenje: Delegat[];
  poruka: string;
   logout() {
    localStorage.removeItem('prijavljen');
    localStorage.clear();
    this.router.navigate(['']);
  }

  dodajDelegata(delegat){
    this.servis.dodajDelegata(delegat.korime, delegat.ime, delegat.prezime, delegat.zemlja).subscribe((odg)=>{
      if(odg['poruka']==-1){
        this.poruka = 'Desila se greska';
      }
      else{
        this.servis.dohvatiDelegateNaCekanju().subscribe((delegati: Delegat[])=>{
          this.delegatiZaOdobrenje = delegati;
        })
      }
    })
  }

 dodajVodju(vodja){
   this.servis.dodajVodju(vodja.korime, vodja.ime, vodja.prezime, vodja.zemlja).subscribe((odg)=>{
    if(odg['poruka']==-1){
      this.poruka = 'Desila se greska';
    }
    else{
      this.servis.dohvatiVodjeNaCekanju().subscribe((vodje: Vodja[])=>{
        this.vodjeZaOdobrenje = vodje;
      })
    }
  })
}

}

