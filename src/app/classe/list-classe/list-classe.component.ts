import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { AddClasseComponent } from '../add-classe/add-classe.component';
import { EditClasseComponent } from '../edit-classe/edit-classe.component';
import { ClasseDetailComponent } from '../classe-detail/classe-detail.component';
import { DeleteClasseComponent } from '../delete-classe/delete-classe.component';
@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css'],
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
export class ListClasseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'filiere', 'option', 'actions'];
  dataSource: MatTableDataSource<Classe>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  admins: Classe[] = [];

  constructor(public dialog: MatDialog, public service: ClasseService) {
    this.dataSource = new MatTableDataSource<Classe>([]);

  }

  ngOnInit(): void {
    this.service.getAllClasse().subscribe(classe => {
      this.dataSource = new MatTableDataSource(classe)
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
    this.dialog.open(AddClasseComponent, {
      width: '380px',
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
      };
    })
  }

  refresh() {
    this.service.getAllClasse().subscribe(classes => {
      this.dataSource = new MatTableDataSource(classes)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditClasseComponent, {
      width: '380px',
      data: row
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
        this.refresh()
      };
    })
  }
  openDialogDetail(row: any) {
    this.dialog.open(ClasseDetailComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteClasseComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((admin) => {
      if (admin) {
        this.closeDialog(admin);
        this.refresh()
      };
    })
  }


  closeDialog(classes: Classe) {
    this.dataSource.data.push(classes);
    this.dataSource.data = [...this.dataSource.data];
  }

}
