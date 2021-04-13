import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UniversityService } from "src/app/_services/university.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: "unisearch",
  templateUrl: "./unisearch.component.html",
  styleUrls: ["./unisearch.component.css"],
})
export class UnisearchComponent implements OnInit {

  selectedUniNameUrl:any = '';
  @Input() universities: any[];
  searchUni:any=[];
  decodedToken;
  jwtHelper = new JwtHelperService();
  selectedItems = [];
  dropdownSettings :IDropdownSettings;
  constructor(private router:Router,private _universityService:UniversityService) {}

  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('token')
    );
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      defaultOpen : false
    };
    this.searchUni = this.universities;
  }
  onItemSelect(item: any) {
    this.searchUni.forEach(el =>{
      if(el.id == item.id && el.name == item.name){
        this.selectedUniNameUrl = el.nameUrl
      }
    })
  }
  isSelected() {
    if(this.selectedUniNameUrl === ''){
      return true;
    }else{
      return false;
    }
  }
  Search(){
    if (
      this.selectedUniNameUrl == '' ||
      this.decodedToken == null
    ) {
      this.router.navigate(['giris-yap']);
    } else {
      this.router.navigate(['universite-postlari/' + this.selectedUniNameUrl]);
      this.selectedUniNameUrl = '';
    }
  }

}
