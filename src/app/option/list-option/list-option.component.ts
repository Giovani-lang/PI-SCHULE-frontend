import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Option } from 'src/app/models/option.model';
import { OptionService } from 'src/app/services/option/option.service';
import { AddOptionComponent } from '../add-option/add-option.component';
import { DeleteOptionComponent } from '../delete-option/delete-option.component';
import { OptionDetailComponent } from '../option-detail/option-detail.component';
import { EditOptionComponent } from '../edit-option/edit-option.component';


@Component({
  selector: 'app-list-option',
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.css'],
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
export class ListOptionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Option>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  admins: Option[] = [];

  constructor(public dialog: MatDialog, public service: OptionService) {
    this.dataSource = new MatTableDataSource<Option>([]);

  }

  ngOnInit(): void {
    this.service.getAllOption().subscribe(option => {
      this.dataSource = new MatTableDataSource(option)
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
    this.dialog.open(AddOptionComponent, {
      width: '320px',
    }).afterClosed().subscribe((options) => {
      if (options) {
        this.closeDialog(options);
      };
    })
  }

  refresh() {
    this.service.getAllOption().subscribe(options => {
      this.dataSource = new MatTableDataSource(options)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditOptionComponent, {
      width: '320px',
      data: row
    }).afterClosed().subscribe((options) => {
      if (options) {
        this.closeDialog(options);
        this.refresh()
      };
    })
  }
  openDialogDetail(row: any) {
    this.dialog.open(OptionDetailComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((options) => {
      if (options) {
        this.closeDialog(options);
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteOptionComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((options) => {
      if (options) {
        this.closeDialog(options);
        this.refresh()
      };
    })
  }


  closeDialog(options: Option) {
    this.dataSource.data.push(options);
    this.dataSource.data = [...this.dataSource.data];
  }

}
