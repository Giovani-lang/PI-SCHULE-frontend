import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FichesService } from 'src/app/services/fiches.service';
import { ListfichesComponent } from '../listfiches/listfiches.component';

@Component({
  selector: 'app-deletefiche',
  standalone: true,
  imports: [CommonModule,MatDialogModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './deletefiche.component.html',
  styleUrls: ['./deletefiche.component.css']
})
export class DeleteficheComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListfichesComponent>,
    private fichesService: FichesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  deletefiche(){
    return this.fichesService.deleteFiche(this.data.id).subscribe(fiches =>{
      this.ngOnInit();
      this.dialogRef.close(fiches);
      this.message.open("fiche supprimée !","Succès", {duration:3000})
    })
  }

}
