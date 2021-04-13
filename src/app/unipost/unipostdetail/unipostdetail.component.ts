import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxGalleryImage, NgxGalleryOptions } from "ngx-gallery";
import { AlertifyService } from "src/app/_services/alertify.service";
import { UniCommentService } from "src/app/_services/unicomment.service";
import { UniPostService } from "src/app/_services/unipost.service";

@Component({
  selector: "app-unipostdetail",
  templateUrl: "./unipostdetail.component.html",
  styleUrls: ["./unipostdetail.component.css"],
})
export class UnipostdetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  post: any;
  commentModel: any = {};
  decodedToken: any;
  public loading = false;
  jwtHelper = new JwtHelperService();
  constructor(
    private _alertify: AlertifyService,
    private _uniPostService: UniPostService,
    private _uniCommentService: UniCommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let temp = [];
    this.route.data.subscribe((data) => {
      this.post = data.post;
      this.decodedToken = this.jwtHelper.decodeToken(
        localStorage.getItem("token")
      );
      if (data.post.postImageUrls.length != 0) {
        data.post.postImageUrls.forEach((el) => {
          temp.push({
            small: el,
            medium: el,
            big: el,
          });
        });
      }
    });
    this.galleryImages = temp;
    this.galleryOptions = [
      {
        width: "300px",
        height: "350px",
        thumbnailsColumns: 4,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "200px",
        height: "250px",
        imagePercent: 60,
        thumbnailsPercent: 40,
        thumbnailsMargin: 10,
        thumbnailMargin: 10,
      },
      // max-width 400
      {
        breakpoint: 400,
        width: "100%",
        height: "200px",
        preview: true,
      },
    ];
  }
  CreateComment(comment) {
    if (comment.value === null || comment.value === "") {
      setTimeout(() => {
        comment.style.border = "3px solid red";
      }, 10);
      setTimeout(() => {
        comment.style.border = "1px solid gray";
      }, 3000);
    } else {
      if (comment == null) {
        this._alertify.message();
        this.loading=false;
        return;
      }
      this.loading = true;
      comment.placeholder = "Yorum yap";
      this.commentModel.uniPostId = this.post.id;
      this.commentModel.commentContent = comment.value;
      this.commentModel.userId = this.decodedToken.nameid;
      this._uniCommentService.CreateUniComment(this.commentModel).subscribe(
        (data) => {
          if (this.post.uniComments == null) {
            this.post.uniComments = [];
          }
          this.post.uniComments.push(data);
          comment.value = "";
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this._alertify.error(err.error.message);
        }
      );
    }
  }
  likePost() {
    var model = {
      isLiked: true,
      userId: this.decodedToken.nameid,
    };
    this._uniPostService.LikePost(model, this.post.id).subscribe(
      (data) => {
        if (data.alreadyLiked) {
          this.post.likeCount += 1;
          this.post.alreadyLiked = true;
        } else {
          this.post.likeCount -= 1;
          this.post.alreadyLiked = false;
        }
      },
      (err) => {
        this._alertify.error(err.error.message);
      }
    );
  }
  likeComment(comment, commentId) {
    if (comment == null || commentId == null) {
      this._alertify.message();
      return;
    }
    var model = {
      isLiked: true,
      userId: this.decodedToken.nameid,
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
        this._alertify.error(err.error.message);
      }
    );
  }
  SetAsFavorite(comment, commentId) {
    this.loading = true;
    if (comment == null || commentId == null) {
      this._alertify.message();
      return;
    }
    var model = {
      isFavorite: true,
      userId: this.decodedToken.nameid,
    };
    this._uniCommentService
      .SetFavorite(model, commentId, comment.userId)
      .subscribe(
        (data) => {
          comment.isFavorite = !comment.isFavorite;
          this.post.isFavoriSelected = true;
          this._alertify.success("Bir yorum favori olarak seçildi..");
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this._alertify.error(err.error.message);
        }
      );
  }
}
