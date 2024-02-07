import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Tarif } from 'src/app/models/tarif.models';
import { EditTarifComponent } from '../edit-tarif/edit-tarif.component';
import { AddTarifComponent } from '../add-tarif/add-tarif.component';
import { TarifService } from 'src/app/services/tarif/tarif.service';

@Component({
  selector: 'app-list-tarif',
  templateUrl: './list-tarif.component.html',
  styleUrls: ['./list-tarif.component.css'],
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
    RouterModule,
    CommonModule
  ]
})
export class ListTarifComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Tarif>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tarifs: Tarif[] = [];
  groupedArry: Map<any, any> = new Map();


  constructor(public dialog: MatDialog, public service: TarifService) {
    this.dataSource = new MatTableDataSource<Tarif>([]);

  }

  ngOnInit(): void {
    this.service.getAllTarifs().subscribe(tarif => {
      this.tarifs = tarif

      const groupedObjects = tarif.reduce((acc, obj) => {
        const group = acc.get(obj.options.nom);
        if (!group) {
          // Si le groupe n'existe pas encore, créez-le et associez-le au jour
          acc.set(obj.options.nom, [obj]);
        }
        else {
          // Si le groupe existe déjà, assurez-vous qu'il est initialisé comme un tableau
          if (!Array.isArray(group)) {
            acc.set(obj.options.nom, [group, obj]);
          } else {
            group.push(obj);
          }
        }
        return acc;
      }, new Map());
      this.groupedArry = groupedObjects;
      // Convertir la Map en un tableau plat
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
    this.dialog.open(AddTarifComponent, {
      width: '380px',
    }).afterClosed().subscribe((options) => {
      if (options) {
        this.closeDialog(options);
        this.ngOnInit();
      };
    })
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditTarifComponent, {
      width: '380px',
      data: row
    }).afterClosed().subscribe((options) => {
      if (options) {
        this.closeDialog(options);
        this.ngOnInit()
      };
    })
  }

  closeDialog(tarifs: Tarif) {
    this.dataSource.data.push(tarifs);
    this.dataSource.data = [...this.dataSource.data];
  }

}
