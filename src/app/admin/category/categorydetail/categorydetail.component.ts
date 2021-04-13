import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'category-detail',
  templateUrl: './categorydetail.component.html',
  styleUrls: ['./categorydetail.component.css']
})
export class CategorydetailComponent implements OnInit {

  @Input() category:any ={};
  @Output() newItemEvent:EventEmitter<any> = new EventEmitter<any>();
  succesed = false;
  constructor(private _alertify:AlertifyService,private _adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit() {
  }
  updateCat(){
    this._adminService.UpdateCategory(this.category).subscribe(data=>{
      if(data){
        this.newItemEvent.emit(data);
        this.succesed = true;
        this._alertify.success("Güncelleme işlemi başarıyla gerçekleşti..")
        setTimeout(() => {
          this.succesed = false;
        },3000);
      }
    },err =>{
      this._alertify.error(err.error.message);
    })
  }
}
