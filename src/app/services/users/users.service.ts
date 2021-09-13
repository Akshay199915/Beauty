import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  response : any;
  base_url = "api/v1/user/";
  constructor(private httpClient : HttpClient) { }

  loginUser = (email,password) => {
    
  }
}
