import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  loader : boolean = false;
  constructor() { 
    this.loader = true;
  }

  showLoader = () =>{
    this.loader = true;
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader = false;
    },2000);
  }
}