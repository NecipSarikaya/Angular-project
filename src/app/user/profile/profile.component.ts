import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";
import { CatPostService } from "src/app/_services/catpost.service";
import { UniPostService } from "src/app/_services/unipost.service";
import { UserService } from "src/app/_services/user.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public loading = false;
  badgeProgress;
  user: any = {};
  data: any;
  ImageToUpload;
  ImageUrl;
  selectedTabIndex = 1;
  posts: any ={
    uniposts : [],
    catposts : []
  };
  likedPosts: any={
    uniposts : [],
    catposts : []
  };
  noPostUni = false;
  noPostCat = false;
  noLikeCat = false;
  noLikeUni = false;
  decodedToken :any;
  jwtHelperService = new JwtHelperService();
  postCount;
  followerCount;
  followingCount;
  searchValue;
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
    private _uniPostService: UniPostService,
    private _catPostService: CatPostService,
    private _authService: AuthService,
    private _alertify: AlertifyService,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}
  badgeBegin;
  badgeEnd;
  ngOnInit() {
    this.route.data.subscribe((data) => {
      let UserPoint = data.user.point;
      if(UserPoint == 0){
        this.badgeProgress = 0;
        this.badgeBegin = 0;
        this.badgeEnd = 1;
      }else if(UserPoint > 0 && UserPoint <5){
        this.badgeProgress = UserPoint*20;
        this.badgeBegin = 1;
        this.badgeEnd = 5;
      }else if(UserPoint >= 5 && UserPoint <15){
        this.badgeProgress = (UserPoint-5)*10;
        this.badgeBegin = 5;
        this.badgeEnd = 15;
      }else if(UserPoint >= 15 && UserPoint <25){
        this.badgeProgress = (UserPoint-15)*10;
        this.badgeBegin = 15;
        this.badgeEnd = 25;
      }else if(UserPoint >= 25 && UserPoint <50){
        this.badgeProgress = (UserPoint-25)*4;
        this.badgeBegin = 25;
        this.badgeEnd = 50;
      }else if(UserPoint >= 50 && UserPoint <75){
        this.badgeProgress = UserPoint;
        this.badgeProgress = (UserPoint-50)*4;
        this.badgeBegin = 50;
        this.badgeEnd = 75;
      }else if(UserPoint >= 75 ){
        this.badgeProgress = UserPoint;
        this.badgeProgress = 100;
        this.badgeBegin = 75;
        this.badgeEnd = 75;
      }
      let imageUrl = "http://localhost:5000/Images/" + data.user.imageUrl;
      this.user = data.user;
      if(this.user.instagramLink == ""){
        this.user.instagramLink = null
      }
      if(this.user.twitterLink == ""){
        this.user.twitterLink = null
      }
      this.user.imageUrl = imageUrl;
      this.ImageUrl = imageUrl;
      this.data = data.data;
      this.data.departments.splice(0,1);
      this.likedPosts = data.likedPosts;
      this.posts = data.publishedPosts;
      if(data.publishedPosts.uniposts.length == 0){
        this.noPostUni = true;
      }
      if(data.publishedPosts.catposts.length == 0){
        this.noPostCat = true;
      }
      if(data.likedPosts.uniposts.length == 0){
        this.noLikeUni = true;
      }
      if(data.likedPosts.catposts.length == 0){
        this.noLikeCat = true;
      }
      this.postCount = data.publishedPosts.catposts.length + data.publishedPosts.uniposts.length;
      this.followerCount = data.user.followings.length;
      this.followingCount = data.user.followers.length;
    });
    this.decodedToken = this.jwtHelperService.decodeToken(localStorage.getItem('token'));
  }
  resetSearchValue(){
    this.searchValue = "";
  }
  UpdateUser() {
    this.loading = true;
    let user = this.user;
    this._userService.UpdateUser(this.user, user.id).subscribe((data) => {
      if (this.ImageUrl != user.imageUrl) {
        this._authService
          .uploadImage(this.ImageToUpload, data.id)
          .subscribe((data) => {
            this.user.imageUrl = this.ImageUrl;
            this._alertify.success("Başarıyla güncelleme yapıldı");
          });
      } else {
        if(data.isEmailChanged){
          this._alertify.success("Email adresiniz başarıyla güncellendi, lütfen yeni email adresinize gelen mail ile hesaabınızı onaylayın..");
        }else{
          this._alertify.success("Başarıyla güncelleme yapıldı");
        }
      }
      this.loading = false;
    },err =>{
      this.loading = false;
      this._alertify.error(err.error.message)
    });
  }
  FollowUserFromOtherProfileIncreaseTakipci(user){
    this.loading = true;
    if(user == null){
      this._alertify.message();
      return;
    }
    var model = {
      followerUserId : parseInt(this.decodedToken.nameid),
      userId : user.id
    }
    this._userService.FollowUser(model).subscribe(data=>{
      if(data.result == "follow"){
        user.isAlreadyFollowed = true;
        var model = {
          name : data.user.name,
          lastName : data.user.lastName,
          userName : data.user.userName,
          imageUrl : "http://localhost:5000/Images/"+data.user.imageUrl,
          id : data.user.id,
          isCurrentUser:true
        }
        this.followingCount++;
        this.user.followers.push(model)
      }
      if(data.result == "break"){
        user.isAlreadyFollowed = false;
        var index = 0;
        this.user.followers.forEach(el => {
          if(el.id == data.user.id){
            this.user.followers.splice(index,1);
            this.followingCount--;
          }
          index++;
        });
      }
      this.loading = false;
    },err => {
      this.loading = false;
      this._alertify.error(err.error.message)
    })
  }
  FollowUser(user){
    this.loading = true;
    if(user == null ){
      this._alertify.message();
      return;
    }
    var model = {
      followerUserId : parseInt(this.decodedToken.nameid),
      userId : user.id
    }
    this._userService.FollowUser(model).subscribe(data=>{
      if(data.result == "follow"){
        user.isAlreadyFollowed = true;
      }
      if(data.result == "break"){
        user.isAlreadyFollowed = false;
      }
      this.loading = false;
    },err => {
      this.loading = false;
      this._alertify.error(err.error.message)
    })
  }
  FollowUserFromFollowing(user){
      this.loading = true;
      if(user == null ){
      this._alertify.message();
      return;
    }
    var model = {
      followerUserId : parseInt(this.decodedToken.nameid),
      userId : user.id
    }
    this._userService.FollowUser(model).subscribe(data=>{
      if(data.result == "follow"){
        user.isAlreadyFollowed = true;
        this.user.followings.unshift(user);
        this.followerCount++;
      }
      if(data.result == "break"){
        user.isAlreadyFollowed = false;
        var index = 0;
        this.user.followings.forEach(el => {
          if(el.id == user.id){
            this.user.followings.splice(index,1);
            this.followerCount--;
          }
          index++;
        });
      }
      this.loading = false;
    },err => {
      this.loading = false;
      this._alertify.error(err.error.message)
    })
  }
  FollowUserFromProfile(user,button){
      this.loading = true;
      if(user == null || button == null){
      this._alertify.message();
      return;
    }
    var model = {
      followerUserId : parseInt(this.decodedToken.nameid),
      userId : user.id
    }
    this._userService.FollowUser(model).subscribe(data=>{
      if(data.result == "follow"){
        button.classList.remove("btn-primary")
        button.classList.add("btn-success")
        button.innerText = "Takiptesin"
        this.followerCount++;
      }
      if(data.result == "break"){
        button.classList.add("btn-primary")
        button.classList.remove("btn-success")
        button.innerText = "Takip Et"
        this.followerCount--;
      }
      this.loading = false;
    },err => {
      this.loading = false;
      this._alertify.error(err.error.message);
    })
  }
  selectImage(event: FileList) {
    if(event == null){
      this._alertify.message();
      return;
    }
    if(event.item(0).size > 350000){
      this._alertify.warning("Tanımlanan resmin boyutu çok yüksek..")
      this.ImageToUpload = null;
      this.ImageUrl = null;
      return;
    }
    if (event.length > 0) {
      this.ImageToUpload = event.item(0);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.ImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.ImageToUpload);
    }
  }
  change(first, second, third, el, index) {
    if(first == null || second == null || third == null || el == null || index == null){
      this._alertify.message();
      return;
    }
    if (first != el) {
      first.classList.remove("borderbottom");
      el.classList.add("borderbottom");
      el.style.display = "block";
      this.selectedTabIndex = index;
    }
    if (second != el) {
      second.classList.remove("borderbottom");
      el.classList.add("borderbottom");
      el.style.display == "block";
      this.selectedTabIndex = index;
    }
    if (third != el) {
      third.classList.remove("borderbottom");
      el.classList.add("borderbottom");
      el.style.display == "block";
      this.selectedTabIndex = index;
    }
  }
  likeUniPost(post, postId, index) {
    if(post == null || postId == null || index == null){
      this._alertify.message()
      return;
    }
    var model = {
      isLiked: true,
    };
    this._uniPostService.LikePost(model, postId).subscribe(
      (data) => {
        if (data.alreadyLiked) {
          this.posts.uniposts.forEach((el) => {
            if (el.id == postId) {
              el.userName = this.user.userName;
              this.likedPosts.uniposts.unshift(post);
            }
          });
          post.likeCount += 1;
          post.alreadyLiked = true;
        } else {
          this.likedPosts.uniposts.forEach((el) => {
            if (el.id == postId) {
              this.likedPosts.uniposts.splice(index, 1);
            }
          });
          post.likeCount -= 1;
          post.alreadyLiked = false;
        }
      },
      (err) => {
        this._alertify.error(err.error.message)
      }
    );
  }
  likeCatPost(post, postId, index) {
    if(post == null || postId == null || index == null){
      this._alertify.message()
      return;
    }
    var model = {
      isLiked: true,
    };
    this._catPostService.LikePost(model, postId).subscribe(
      (data) => {
        if (data.alreadyLiked) {
          this.posts.catposts.forEach((el) => {
            if (el.id == postId) {
              el.userName = this.user.userName;
              this.likedPosts.catposts.unshift(post);
            }
          });
          post.likeCount += 1;
          post.alreadyLiked = true;
        } else {
          this.likedPosts.catposts.forEach((el) => {
            if (el.id == postId) {
              this.likedPosts.catposts.splice(index, 1);
            }
          });
          post.likeCount -= 1;
          post.alreadyLiked = false;
        }
      },
      (err) => {
        this._alertify.error(err.error.message)
      }
    );
  }
}
