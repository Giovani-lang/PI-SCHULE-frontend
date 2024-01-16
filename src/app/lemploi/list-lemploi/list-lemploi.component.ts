import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Lemploi } from 'src/app/models/lemploi.model';
import { EditLemploiComponent } from '../edit-lemploi/edit-lemploi.component';
import { AddLemploiComponent } from '../add-lemploi/add-lemploi.component';
import { LemploiService } from 'src/app/services/lemploi/lemploi.service';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { DeleteLemploiComponent } from '../delete-lemploi/delete-lemploi.component';

@Component({
  selector: 'app-list-lemploi',
  templateUrl: './list-lemploi.component.html',
  styleUrls: ['./list-lemploi.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    CommonModule,
    NgxPrintModule,
  ]
})
export class ListLemploiComponent implements OnInit {
  displayedColumns: string[] = ['jour', 'horaires', 'matiere', 'enseignant', 'actions'];
  dataSource: MatTableDataSource<Lemploi>;

  classe: string | null;
  lemploi: Lemploi[] = [];
  groupedArry: Map<any, any> = new Map();

  role = sessionStorage.getItem('role');

  constructor(
    public dialog: MatDialog,
    public service: LemploiService,
    private route: ActivatedRoute,
  ) {
    this.dataSource = new MatTableDataSource<Lemploi>([]);
    this.classe = this.route.snapshot.paramMap.get('classe')
  }



  ngOnInit(): void {
    this.service.getAllByClasse(this.classe).subscribe(lemploi => {
      this.lemploi = lemploi

      const groupedObjects = lemploi.reduce((acc, obj) => {
        const group = acc.get(obj.jour);
        if (!group) {
          // Si le groupe n'existe pas encore, créez-le et associez-le à l'âge
          acc.set(obj.jour, [obj]);
        }
        else {
          // Si le groupe existe déjà, assurez-vous qu'il est initialisé comme un tableau
          if (!Array.isArray(group)) {
            acc.set(obj.jour, [group, obj]);
          } else {
            group.push(obj);
          }
        }
        return acc;
      }, new Map());
      console.log(JSON.stringify(groupedObjects))
      this.groupedArry = groupedObjects;
      // Convertir la Map en un tableau plat
      console.log(groupedObjects)
      const flattenedArray = Array.from(groupedObjects.values()).flat();
      this.dataSource = new MatTableDataSource(flattenedArray);
    });
  }

  // On crée une méthode qui renvoie un tableau des clés du Map
  getKeys() {
    return Array.from(this.groupedArry.keys());
  }

  // On crée une méthode qui renvoie un tableau des valeurs du Map
  getValues() {
    return Array.from(this.groupedArry.values());
  }


  openDialogAdd(): void {
    this.dialog.open(AddLemploiComponent, {
      width: '550px',
      data: this.classe
    }).afterClosed().subscribe((lemploi) => {
      if (lemploi) {
        this.closeDialog(lemploi);
        this.ngOnInit()
      };
    })
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditLemploiComponent, {
      width: '550px',
      data: row
    }).afterClosed().subscribe((lemploi) => {
      if (lemploi) {
        this.closeDialog(lemploi);
        this.ngOnInit()
      };
    })
  }
  openDialogDelete(row: any) {
    this.dialog.open(DeleteLemploiComponent, {
      width: '380px',
      data: row
    }).afterClosed().subscribe((lemploi) => {
      if (lemploi) {
        this.closeDialog(lemploi);
        this.ngOnInit()
      };
    })
  }

  closeDialog(lemploi: Lemploi) {
    this.dataSource.data.push(lemploi);
    this.dataSource.data = [...this.dataSource.data];
  }
}