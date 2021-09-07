import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Delegat } from '../model/delegat.model';
import { Vodja } from '../model/vodja.model';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private ruter: Router, private servis: KorisnikService) { }

  ngOnInit(): void {
  }

  ime: string="";
  prezime: string="";
  korime: string="";
  lozinka: string="";
  lozinkap: string="";
  zemlja: string="";
  email: string="";
  message: string;
  tip: string;
  pomocniDelegat: Delegat = null;
  pomocniVodja: Vodja = null;
  pomocniDelegat1: Delegat = null;
  pomocniVodja1: Vodja = null;
  prodji: boolean = true;


  registruj(){
    
    const passwordRegex = /^(?=(.*[a-z]){2,})(?=(.*[A-Z]))(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.]){1,}).{8,12}$/;
    

    this.servis.dohvatiDelegata(this.korime).subscribe((delegat:Delegat)=>{
      if(delegat[0]){
        this.pomocniDelegat = delegat[0];
      }
      if(this.pomocniDelegat != null){
        this.prodji = false;
      }
    });

    this.servis.dohvatiVodju(this.korime).subscribe((vodja: Vodja)=>{
      if(vodja[0]){
        this.pomocniVodja = vodja[0];
      }
      if(this.pomocniVodja != null){
        this.prodji = false;
      }
    });

    this.servis.proveriMailDelegata(this.email).subscribe((delegat:Delegat)=>{
      if(delegat){
        this.pomocniDelegat = delegat;
      }
      if(this.pomocniDelegat1 != null){
        this.prodji = false;
      }
    });

    this.servis.proveriMailVodje(this.email).subscribe((vodja: Vodja)=>{
      if(vodja){
        this.pomocniVodja = vodja;
      }
      if(this.pomocniVodja1 != null){
        this.prodji = false;
      }
    });
   
    
    if(this.prodji == true && this.pomocniDelegat==null && this.pomocniDelegat1==null && this.pomocniVodja==null && this.pomocniVodja1==null){
      
    if(this.ime=="" || this.prezime=="" || this.korime=="" || this.lozinka=="" || this.lozinkap=="" ||  this.email=="" || this.zemlja==""){
      this.message="Morate uneti SVE podatke";
      this.prodji=false;
      return;
    }
    else if(!passwordRegex.test(this.lozinka)){
      this.message="Lozinka nije u ispravnom formatu!";
      this.prodji=false;
      return;
    }
    else if(this.lozinka != this.lozinkap){
      this.message="Lozinka i njena potvrda moraju biti iste!";
      this.prodji=false;
      return;
    }
    else{
        if(this.prodji == true){
          if(this.tip == "delegat"){
            
            this.servis.registerD(this.ime,this.prezime, this.korime, this.lozinka, this.tip, this.email, this.zemlja, false).subscribe(ob=>{
              if(ob['delegat']=='ok'){
               this.message="Ako Vas odobri organizator moci cete da se ulogujete";
              }
            });
          }
          else if(this.tip == "vodja"){
            this.servis.dohvatiVodjuZemlje(this.zemlja).subscribe((vodja: Vodja)=>{
              this.pomocniVodja = vodja;
            });
            if(this.pomocniVodja){
              this.servis.registerV(this.ime,this.prezime, this.korime, this.lozinka, this.tip, this.email, this.zemlja, false).subscribe(ob=>{
                if(ob['vodja']=='ok'){
                  this.message="Ako Vas odobri organizator moci cete da se ulogujete";
                }
              });
            }
            else{
              this.message = "Vec postoji vodja delegacije iz te zemlje, ne mozete uneti novog u toj zemlji";
            }
          }
        }
    }
    }
    else{
      this.message="Vec postoji korisnik sa tim korisnickim imenom";
    }
  }
}