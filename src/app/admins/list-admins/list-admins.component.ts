import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { AddAdminsComponent } from '../add-admins/add-admins.component';
import { DeleteAdminsComponent } from '../delete-admins/delete-admins.component';
import { EditAdminsComponent } from '../edit-admins/edit-admins.component';
import { AdminsDetailComponent } from '../admins-detail/admins-detail.component';


@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ]
})
export class ListAdminsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'genre', 'actions'];
  dataSource: MatTableDataSource<Admin>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  admins: Admin[] = [];

  constructor(public dialog: MatDialog, public service: AdminService) {
    this.dataSource = new MatTableDataSource<Admin>([]);

  }

  ngOnInit(): void {
    this.service.getAllAdmins().subscribe(admins => {
      this.dataSource = new MatTableDataSource(admins)
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogAdd(): void {
    this.dialog.open(AddAdminsComponent, {
      width: '550px',
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
      };
    })
  }

  refresh() {
    this.service.getAllAdmins().subscribe(admins => {
      this.dataSource = new MatTableDataSource(admins)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditAdminsComponent, {
      width: '550px',
      data: row
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
        this.refresh()
      };
    })
  }
  openDialogDetail(row: any) {
    this.dialog.open(AdminsDetailComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteAdminsComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
        this.refresh()
      };
    })
  }


  closeDialog(admins: Admin) {
    this.dataSource.data.push(admins);
    this.dataSource.data = [...this.dataSource.data];
  }

}
