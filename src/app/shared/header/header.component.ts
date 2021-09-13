import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  UserObject : any;
  isLoggedIn : boolean = false;
  profileMenuStateVisible : boolean = false;
  barMessage : String = "";

  // Login Variables
  email : String = "";
  password : String = "";
  modalError : String = "";
  disableButton : boolean = false;
  LoginButtonText : String = "Login";

  // RegisterVariables
  u_fname : String = "";
  u_lname : String = "";
  u_email : String = "";
  u_mobile : String = "";
  u_password : String = "";
  u_conf_password : String = "";
  regModalError : String = "";
  disableRegButton : boolean = false;
  regButtonText : String = "SignUp Now";

  constructor(config : NgbModalConfig, private modalService:NgbModal, private httpClient : HttpClient, private cookie : CookieService) { 
    config.backdrop = 'static';
    this.UserObject = {
      u_fname : "",
      u_lname : "",
    }
  }

  open(content, size) {
    this.modalService.dismissAll();
    this.modalService.open(content,{ size: size });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  loginUser = async () => {
    let base_url = "api/v1/user/";
    if(this.email === "" || this.password === ""){
      this.modalError = "Please Fill All the Required Feilds";
      return false;
    } 
    if(!this.emailValidate(this.email)){
      this.modalError = "Please Enter Valid Email Address";
      return false;
    }
    this.modalError = "";
    this.disableButton = true;
    this.LoginButtonText = "Loading";
    let url = base_url+"login"
    await this.httpClient.post(url,{'email' : this.email, 'password' : this.password}).toPromise().then((response : any) =>{
      if(response.status){
        this.modalError = "Login Success";
        this.UserObject = response.data[0];
        this.cookie.set("u_id",this.UserObject._id,365);
        location.reload();
      } else{
        this.modalError = "Invalid Login Credentials";
      }
      this.disableButton = false;
      this.LoginButtonText = "Login";
    }).catch((err)=>{
      this.disableButton = false;
      this.LoginButtonText = "Login";
      this.modalError = err;
    });
  }

  registerNow = async () => {
    let base_url = "api/v1/user/";
    if(this.u_fname === "" || this.u_lname === "" || this.u_email === "" || this.u_mobile === "" || this.u_password === "" || this.u_conf_password === ""){
      this.regModalError = "Please Fill All the Required Feilds";
      return false;
    } 
    if(!this.emailValidate(this.u_email)){
      this.regModalError = "Please Enter Valid Email Address";
      return false;
    }
    if(this.u_password.length<6){
      this.regModalError = "Password Should be of 6 Characters or More";
      return false;
    }
    if(this.u_password !== this.u_conf_password){
      this.regModalError = "Password & Confirm Password Should be Same";
      return false;
    }
    if(!this.phoneValidate(this.u_mobile)){
      this.regModalError = "Please Enter Valid Mobile Number of 10 Digits";
      return false;
    }
    this.regModalError = "";
    this.disableRegButton = true;
    this.regButtonText = "Loading...";
    let url = base_url+"register"
    await this.httpClient.post(url,{
      'fname' : this.u_fname, 
      'lname' : this.u_lname, 
      'email' : this.u_email, 
      'password' : this.u_password,
      'mobile' : this.u_mobile
    })
    .toPromise().then( async (response : any) =>{
      if(response.status){
        this.regModalError = "Thanks for Your Regsitration!!! Please Login To Continue";
        // send Verfication Email Request
        await this.httpClient.post(base_url+"verify_email_send",{'user_id' : response.data}).toPromise();
        setTimeout(()=>{
          this.regModalError = "";
          this.disableRegButton = false;
          this.regButtonText = "SignUp Now";
          this.closeModal();
        },3000);
      } else {
        this.regModalError = response.message;
        this.disableRegButton = false;
        this.regButtonText = "SignUp Now";
      }
    }).catch((err)=>{
      this.disableRegButton = false;
      this.regButtonText = "SignUp Now";
      this.regModalError = err;
    });
  }

  emailValidate = (email) => {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
  }

  phoneValidate = (number) => {
    var pattern = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    return pattern.test(number);
  }

  toggleProfileMenu = () =>{
    this.profileMenuStateVisible = !this.profileMenuStateVisible;
  }

  logout = () =>{
    this.cookie.delete("u_id");
    window.location.href="/";
  }

  verifyEmailPopup = () => {
    if(!this.UserObject.u_email_verified){
      let message = 'Your Email is not Verified Yet !!! if you didn\'t Receive any Email. '+
      'Please Click Here to Resend it.';
      this.barMessage = message;
    }
  }

  sendVerificationEmail = () =>{
    alert("function called");
  }

  getCurrentUserData = async () => {
    let url = "api/v1/user/get";
    await this.httpClient.post(url,{'user_id' : this.cookie.get("u_id")})
    .toPromise().then((response : any) =>{
      if(response.status){
        this.UserObject = response.data[0];
        this.verifyEmailPopup();
      } else {
        this.logout();
      }
    })
    .catch(() => {
      this.barMessage = "Server Error !!! Please Reload the Page";
    });
  }

  ngOnInit() {
    if(this.cookie.get("u_id") === "" || this.cookie.get("u_id") === null || this.cookie.get("u_id") === undefined){
      this.isLoggedIn = false;
      // if(location.pathname === "/appointment"){
      //   location.href="/";
      // }
    }
    else{
      this.isLoggedIn = true;
      this.getCurrentUserData();
    }
  }
}