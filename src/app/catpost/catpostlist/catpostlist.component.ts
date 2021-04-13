import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { AlertifyService } from "src/app/_services/alertify.service";
import { CatCommentService } from "src/app/_services/catcomment.service";
import { CatPostService } from "src/app/_services/catpost.service";

@Component({
  selector: "app-catpostlist",
  templateUrl: "./catpostlist.component.html",
  styleUrls: ["./catpostlist.component.css"],
})
export class CatpostlistComponent implements OnInit {
  public loading = false;
  pageInfo:any ={};
  catposts: any[] = [];
  model: any = {};
  commentModel: any = {};
  categories: any = [];
  catName: string;
  catNameUrl: string;
  decodedToken: any;
  JwtHelper = new JwtHelperService();
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
  constructor(
    private _alertify:AlertifyService,
    private _catpostSetvice: CatPostService,
    private route: ActivatedRoute,
    private _catCommentService: CatCommentService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      data.catposts.posts.forEach(el => {
        let b = 0;
        el.shownComment = 3;
        el.showMessage = "yapılan yorumu gör"
        el.showCount = el.catComments.length - 3;
        el.catComments.forEach(com => {
          if(com.isFavorite == true){
            el.catComments.splice(b,1);
            el.catComments.unshift(com);
          }
          b++;
        });
      });
      this.catposts = data.catposts.posts;
      this.categories = data.categories;
      this.pageInfo = data.catposts.pageInfo;

      var b = this.pageInfo.totalPages;
      this.pageInfo.totalPages = Array(b);

      this.decodedToken = this.JwtHelper.decodeToken(
        localStorage.getItem("token")
      );

      let name = this.route.snapshot.params.name;
        this.categories.forEach((el) => {
          if (el.nameUrl == name) {
            this.catName = el.name;
            this.catNameUrl = el.nameUrl;
          }
        });
    });
  }
  publishPost(title) {
    if(title == null){
      this._alertify.message();
      return;
    }
    this.loading = true;
    let content = "<b>"+this.model.content+"</b>";
    this.model.content = content;
    this._catpostSetvice
      .PublishPost(this.model, this.catNameUrl)
      .subscribe((data) => {
        if(this.ImageList.length != 0){
          let control = data;
          this._catpostSetvice.UploadImage(this.ImageList,data.id).subscribe(data=>{
            this.model = {};
            this.ImageUrls = [];
            this.ImageList = [];
            control.hasImage = true;
            this.catposts.unshift(control);
            this.loading = false;
          },err =>{
            this._alertify.error("Resimler yüklenemedi , lütfen daha sonra tekrar deneyin..");
          })
          title.control.touched = false;
          title.control.pristine = true;
        }else{
          this.model = {};
          this.ImageUrls = [];
          this.ImageList = [];
          this.catposts.unshift(data);
          this.loading = false;
          title.control.touched = false;
          title.control.pristine = true;
        }
      },err =>{
        this.loading=false;
        this._alertify.error(err.error.message)
      });
  }

  CreateComment(post, postId, comment) {
    this.loading = true;
    if(comment.value === null ||comment.value === ''){
      this.loading = false;
      setTimeout(()=>{
        comment.style.border = "3px solid red";
      },10);
      setTimeout(()=>{
        comment.style.border = "1px solid gray";
      },3000);
    }else{
      if(post == null ||postId == null ||comment == null)
      {
        this._alertify.message();
        return;
      }
      comment.placeholder = "Yorum yap";
      this.commentModel.catPostId = postId;
      this.commentModel.commentContent = comment.value;
      this._catCommentService.MakeCatComment(this.commentModel).subscribe(
        (data) => {
          if (post.catComments == null) {
            post.catComments = [];
          }
          post.catComments.push(data);
          comment.value = "";
          if(post.showCount < 0 && post.catComments.length > post.shownComment){
            post.shownComment = post.catComments.length;
            post.showMessage = "Yapılan tüm yorumları görüyorsunuz";
            post.showCount = post.catComments.length - post.shownComment;
          }
          if(post.showCount == 0){
            post.showCount = null;
          }
          if(post.showCount == null){
            post.shownComment = post.catComments.length;
          }
          this.loading = false;
      },
        (err) => {
          this._alertify.error(err.error.message)
          this.loading = false;
        }
      );
    }
  }
  likePost(post,postId){
    if(post == null ||postId == null)
    {
      this._alertify.message();
      return;
    }
    var model = {
      isLiked:true,
    }
    this._catpostSetvice.LikePost(model,postId).subscribe(
      (data) =>{
        if(data.alreadyLiked)
        {
          post.likeCount +=1;
          post.alreadyLiked = true;
        }else{
          post.likeCount -=1;
          post.alreadyLiked = false;
        }
      },err =>{
        this._alertify.error(err.error.message);
      }
    )
  }
  likeComment(comment,commentId){
    if(comment == null ||commentId == null)
    {
      this._alertify.message();
      return;
    }
    var model = {
      isLiked:true,
    }
    this._catCommentService.LikeComment(model,commentId).subscribe(
      (data) =>{
        if(data.alreadyLiked)
        {
          comment.likeCount +=1;
          comment.alreadyLiked = true;
        }else{
          comment.likeCount -=1;
          comment.alreadyLiked = false;
        }
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  refresPage(number){
    if(number == null || number == 0){
      this._alertify.message();
      return;
    }
    this.loading = true;
    this._catpostSetvice.getCatPostsByParams(this.catNameUrl,number).subscribe(
      (data:any)=>{
        data.posts.forEach(el => {
          let b = 0;
          el.catComments.forEach(com => {
            if(com.isFavorite == true){
              el.catComments.splice(b,1);
              el.catComments.unshift(com);
            }
            b++;
          });
        });
        this.catposts = [];
        this.catposts = data.posts;
        this.loading = false;
      },err =>{
        this.loading = false;
        this._alertify.error(err.error.message)
      }
    )
  }
  ImageList:any = [];
  ImageUrls:any = [];
  selectImage(event: FileList) {
    if(event == null){
      this._alertify.message();
      return;
    }
    if(this.ImageList.length > 0){
      this.ImageList = [];
      this.ImageUrls = [];
    }
    if (event.length > 0) {
      for (let i = 0; i < event.length; i++) {
        if(event.item(i).size > 350000){
          this._alertify.warning("Tanımlanan resimlerden birinin boyutu çok yüksek..")
          this.ImageList = [];
          this.ImageUrls = [];
          return;
        }
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
      this._alertify.message();
      return;
    }
    var model = {
      isReported:true,
    }
    this._catpostSetvice.LikePost(model,postId).subscribe(
      (data) =>{
        this._alertify.success("Sitemize katkınızdan dolayı teşekkürler..")
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  sikayetComment(commentId){
    if(commentId == null){
      this._alertify.message();
      return;
    }
    var model = {
      isReported:true,
    }
    this._catCommentService.LikeComment(model,commentId).subscribe(
      (data) =>{
        this._alertify.success("Sitemize katkınızdan dolayı teşekkürler..")
      },err =>{
        this._alertify.error(err.error.message)
      }
    )
  }
  ShowOthers(post){
    if(post.catComments.length < post.shownComment+3){
      post.shownComment = post.catComments.length;
      post.showMessage = "Yapılan tüm yorumları görüyorsunuz";
      post.showCount = post.catComments.length - post.shownComment;
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
