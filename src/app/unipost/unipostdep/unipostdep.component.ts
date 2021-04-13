import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { AlertifyService } from "src/app/_services/alertify.service";
import { UniCommentService } from "src/app/_services/unicomment.service";
import { UniPostService } from "src/app/_services/unipost.service";

@Component({
  selector: "app-unipostdep",
  templateUrl: "./unipostdep.component.html",
  styleUrls: ["./unipostdep.component.css"],
})
export class UnipostdepComponent implements OnInit {
  uniposts: any;
  model: any = {};
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "120px",
    minHeight: "120px",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: false,
    showToolbar: false,
    placeholder: "",
    defaultParagraphSeparator: "p",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: "v1/image",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };
  public loading = false;
  university: any = {};
  departments: any;
  commentModel: any = {};
  decodedToken: any = {};
  jwtHelper = new JwtHelperService();
  selectedDep: any;
  pageInfo: any = {};
  constructor(
    private _alertify:AlertifyService,
    private _uniCommentService: UniCommentService,
    private _uniPostService: UniPostService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.uniposts = data.uniposts.posts;
      this.university = data.university;
      this.departments = data.departments;
      this.departments.forEach(el => {
        this.route.params.subscribe(data=>{
          if(el.nameUrl == data.depName)
            this.selectedDep = el;
        })
      });
      this.pageInfo = data.uniposts.pageInfo;
      var b = this.pageInfo.totalPages;
      this.pageInfo.totalPages = Array(b);
      this.decodedToken = this.jwtHelper.decodeToken(
        localStorage.getItem("token")
      );
      data.uniposts.posts.forEach(el => {
        let b = 0;
        el.shownComment = 3;
        el.showMessage = "yapılan yorumu gör"
        el.showCount = el.uniComments.length - 3;
        el.uniComments.forEach(com => {
          if(com.isFavorite == true){
            el.uniComments.splice(b,1);
            el.uniComments.unshift(com);
          }
          b++;
        });
      });
    });
  }
  CreatePost(title) {
    if(title == null)
    {
      this._alertify.message()
      return;
    }
    this.loading = true;
    this.model.universityId = this.university.id;
    this.model.departmentId = this.selectedDep.id;
    var content = "<b>"+this.model.content+"</b>";
    this.model.content = content;
    this._uniPostService.CreatePost(this.model).subscribe(
      (data) => {
       if(this.ImageList.length != 0){
        let control = data;
        this._uniPostService.UploadImage(this.ImageList,data.id).subscribe(data=>{
          this.model = {};
          this.ImageList = [];
          this.ImageUrls = [];
          this.loading = false;
          control.hasImage=true;
          this.uniposts.unshift(control);
        },err => {
          this._alertify.error("Resimler yükelenemdi , lütfen daha sonra tekrar deneyin..")
        })
        title.control.touched = false;
        title.control.pristine = true;
       }else{
        this.model = {};
        this.ImageList = [];
        this.ImageUrls = [];
        this.loading = false;
        this.uniposts.unshift(data);
        title.control.touched = false;
        title.control.pristine = true;
       }
      },
      (err) => {
        this.loading = false;
        this._alertify.error(err.error.message)
      }
    );
  }
  likePost(post, postId) {
    if(post == null || postId == null)
    {
      this._alertify.message()
      return;
    }
    var model = {
      isLiked: true,
    };
    this._uniPostService.LikePost(model, postId).subscribe(
      (data) => {
        if (data.alreadyLiked) {
          post.likeCount += 1;
          post.alreadyLiked = true;
        } else {
          post.likeCount -= 1;
          post.alreadyLiked = false;
        }
      },
      (err) => {
          this._alertify.error(err.error.message)
      }
    );
  }
  CreateComment(post, postId, comment) {
    if( comment == null ||post == null || postId == null)
    {
      this._alertify.message()
      return;
    }
    this.loading = true;
    if (comment.value === null || comment.value === "") {
      setTimeout(() => {
        comment.style.border = "3px solid red";
      }, 10);
      setTimeout(() => {
        comment.style.border = "1px solid gray";
      }, 3000);
    } else {
      comment.placeholder = "Yorum yap";
      this.commentModel.uniPostId = postId;
      this.commentModel.commentContent = comment.value;
      this._uniCommentService.CreateUniComment(this.commentModel).subscribe(
        (data) => {
          if (post.uniComments == null) {
            post.uniComments = [];
          }
          post.uniComments.push(data);
          comment.value = "";
          if(post.showCount < 0 && post.uniComments.length > post.shownComment){
            post.shownComment = post.uniComments.length;
            post.showMessage = "Yapılan tüm yorumları görüyorsunuz";
            post.showCount = post.uniComments.length - post.shownComment;
          }
          if(post.showCount == 0){
            post.showCount = null;
          }
          if(post.showCount == null){
            post.shownComment = post.uniComments.length;
          }
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this._alertify.error(err.error.message)
      }
      );
    }
  }
  likeComment(comment, commentId) {
    if( comment == null ||commentId == null )
    {
      this._alertify.message()
      return;
    }
    var model = {
      isLiked: true,
    };
    this._uniCommentService.LikeComment(model, commentId).subscribe(
      (data) => {
        if (data.alreadyLiked) {
          comment.likeCount += 1;
          comment.alreadyLiked = true;
        } else {
          comment.likeCount -= 1;
          comment.alreadyLiked = false;
        }
      },
      (err) => {
        this._alertify.error(err.error.message)
      }
    );
  }
  refresPage(number) {
    if( number == null )
    {
      this._alertify.message()
      return;
    }
    this.loading = true;
    this._uniPostService
      .GetUniPostsByUniDep(
        this.university.nameUrl,
        this.selectedDep.nameUrl,
        number
      )
      .subscribe(
        (data: any) => {
          this.uniposts = [];
          data.posts.forEach(el => {
            let b = 0;
            el.uniComments.forEach(com => {
              if(com.isFavorite == true){
                el.uniComments.splice(b,1);
                el.uniComments.unshift(com);
              }
              b++;
            });
          });
          this.uniposts = data.posts;
          this.loading = false;
       },
        (err) => {
          this.loading = false;
          this._alertify.error(err.error.message)
        }
      );
  }
  ImageList:any = [];
  ImageUrls:any = [];
  selectImage(event: FileList) {
    if( event == null )
    {
      this._alertify.message()
      return;
    }
    if(this.ImageList.length > 0){
      this.ImageList = [];
      this.ImageUrls = [];
    }
    if (event.length > 0) {
      for (let i = 0; i < event.length; i++) {
        this.ImageList.push(event.item(i));
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.ImageUrls.push( e.target.result);
        };
        reader.readAsDataURL(this.ImageList[i]);
    }
    }
  }
  sikayet(postId){
    if(postId == null){
      this._alertify.message()
      return;
    }
    var model = {
      isReported:true,
    }
    this._uniPostService.LikePost(model,postId).subscribe(
      (data) =>{
        this._alertify.success("Sitemize katkınızdan dolayı teşekkürler..")
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  sikayetComment(commentId){
    if(commentId == null){
      this._alertify.message()
      return;
    }
    var model = {
      isReported:true,
    }
    this._uniCommentService.LikeComment(model,commentId).subscribe(
      (data) =>{
        this._alertify.success("Sitemize katkınızdan dolayı teşekkürler..")
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  ShowOthers(post){
    if(post.uniComments.length < post.shownComment+3){
      post.shownComment = post.uniComments.length;
      post.showMessage = "Yapılan tüm yorumları görüyorsunuz";
      post.showCount = post.uniComments.length - post.shownComment;
    }else{
      post.shownComment += 3;
      post.showCount -= 3;
    }
    if(post.showCount == 0){
      post.showCount = null;
      post.showMessage = "Yapılan tüm yorumları görüyorsunuz";
    }
  }
}
