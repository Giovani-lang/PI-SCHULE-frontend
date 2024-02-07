import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: User;
  img = "../assets/img/DefaultImageProfil.png";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const email = sessionStorage.getItem("email")
    this.userService.getUserByEmail(email).subscribe(user => this.user = user)
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logOut() {
    this.authService.isLogin = false;
    sessionStorage.clear()
  }
}
