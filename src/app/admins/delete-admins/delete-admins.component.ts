import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ListAdminsComponent } from '../list-admins/list-admins.component';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-delete-admins',
  templateUrl: './delete-admins.component.html',
  styleUrls: ['./delete-admins.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DeleteAdminsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListAdminsComponent>,
    private service: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteAdmin(this.data.id).subscribe(admin => {
      this.ngOnInit();
      this.dialogRef.close(admin);
    })
  }

}
