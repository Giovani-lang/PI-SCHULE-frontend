import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ListAdminsComponent } from '../list-admins/list-admins.component';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admins-detail',
  templateUrl: './admins-detail.component.html',
  styleUrls: ['./admins-detail.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,

  ]
})
export class AdminsDetailComponent implements OnInit {

  admin!: Admin;

  constructor(
    public dialogRef: MatDialogRef<ListAdminsComponent>,
    private service: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  img = "../assets/img/DefaultImageProfil.png";


  ngOnInit(): void {
    this.service.getAdmin(this.data.id).subscribe(admin => this.admin = admin)
  }

}
