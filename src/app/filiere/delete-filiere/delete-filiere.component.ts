import { Component, Inject, OnInit } from '@angular/core';
import { ListFiliereComponent } from '../list-filiere/list-filiere.component';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-filiere',
  templateUrl: './delete-filiere.component.html',
  styleUrls: ['./delete-filiere.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteFiliereComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListFiliereComponent>,
    private service: FiliereService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteFiliere(this.data.nom).subscribe(filiere => {
      this.ngOnInit();
      this.dialogRef.close(filiere);
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }

}
