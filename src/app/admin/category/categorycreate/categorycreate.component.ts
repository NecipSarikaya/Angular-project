import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'categorycreate',
  templateUrl: './categorycreate.component.html',
  styleUrls: ['./categorycreate.component.css']
})
export class CategorycreateComponent implements OnInit {

  @Output() newItemEvent:EventEmitter<any> = new EventEmitter<any>();
  category:any ={};
  succesed = false;
  constructor(private _alertify:AlertifyService,private _adminService:AdminService) { }

  ngOnInit() {
  }
  createCat(){
    this._adminService.CreateCategory(this.category).subscribe(data=>{
      if(data){
        this.newItemEvent.emit(data);
        this.succesed = true;
        this._alertify.success("Kategori oluştruma işlemi başarıyla gerçekleşti..")
        setTimeout(()=>{
          this.succesed = false;
        },2000)
      }
    },err =>{
      this._alertify.error(err.error.message)
    })
  }
}
