import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  
  categories : any;
  subCategories : any;
  loader : boolean = true;
  
  constructor() {
    
  }

  loadData = () =>{
    this.categories = [
      {
        "cat_id" : 0,
        "cat_name" : "Combo Packages",
        "cat_selection_type" : "active"
      },
      {
        "cat_id" : 1,
        "cat_name" : "Top Rated",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 2,
        "cat_name" : "Basic Services",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 3,
        "cat_name" : "Skin Care",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 4,
        "cat_name" : "Waxing",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 5,
        "cat_name" : "Body Massage",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 6,
        "cat_name" : "Body Care",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 7,
        "cat_name" : "Offers",
        "cat_selection_type" : ""
      },
      {
        "cat_id" : 8,
        "cat_name" : "Bridal / Party Makeup",
        "cat_selection_type" : ""
      },
    ]

    this.subCategories = [
      {
        "sub_cat_id" : 0,
        "cat_id" : 0,
        "sub_cat_title" : "Hair Cut Service",
        "sub_cat_image" : "haircut.jpg",
        "services" : [
          {
            "serv_name":"Laser Cut",
            "serv_time":"45 Min",
            "serv_price": 499.00,
            "serv_status": true,
          },
          {
            "serv_name":"Boy Cut",
            "serv_time":"40 Min",
            "serv_price": 399.00,
            "serv_status": true,
          },
          {
            "serv_name":"Pony Cut",
            "serv_time":"60 Min",
            "serv_price": 799.00,
            "serv_status": true,
          },
          {
            "serv_name":"Double Face Hair Cut",
            "serv_time":"90 Min",
            "serv_price": 1299.00,
            "serv_status": true,
          }
        ]
      },
      {
        "sub_cat_id" : 1,
        "cat_id" : 0,
        "sub_cat_title" : "Hairfall Treatment",
        "sub_cat_image" : "download17.jpg",
      },
      {
        "sub_cat_id" : 2,
        "cat_id" : 0,
        "sub_cat_title" : "Hair Shading Service",
        "sub_cat_image" : "serv2.png",
      }
    ]
    setTimeout(() => {
      this.loader = false;
    },3000)
  }

  selectCat = (cat_id) =>{
    for(let i = 0; i<this.categories.length;i++){
      this.categories[i].cat_selection_type = "";  
    }
    this.categories[cat_id].cat_selection_type = "active";
  }

  ngOnInit(): void {
    this.loadData();
  }

}
