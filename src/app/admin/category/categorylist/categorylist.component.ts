import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  data:any =[];
  dtOptions :DataTables.Settings = {};
  add = false;
  detail = false;
  detailedCat :any;
  constructor(private _alertify:AlertifyService,private _adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.data = data.categories;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength:5,
        lengthMenu:[5,15,25],
        processing : true
      }
    })
  }
  deleteCat(catId,index){
    if(catId == null || index == null)
    {
      this._alertify.message()
      return ;
    }
    this._adminService.DeleteCategory(catId).subscribe(
      data=>{
        if(data.id == catId){
          this.data.splice(index,1);
        }
        this._alertify.success("Kaldırma işlemi başarıyla gerçekleşti..")
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  ShowAdd(){
    this.add = true;
  }
  GetDetail(category){
    if(category == null){
      this._alertify.message()
      return;
    }
    this.detail = true;
    this.detailedCat = category;
  }
  addItem(newItem: string) {
    if(newItem == null){
      this._alertify.message()
      return;
    }
    this.data.push(newItem);
    this.add = false;
  }
  getItem(newItem:any) {
    if(newItem == null){
      this._alertify.message()
      return;
    }
    this.data.forEach(el => {
      if(el.id == newItem.id){
        el = newItem;
      }
    });
    setTimeout(() => {
      this.detail = false;
    },1000);
  }
}
