import { Component, Inject, OnInit } from '@angular/core';
import { ListMatiereComponent } from '../list-matiere/list-matiere.component';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-matiere',
  templateUrl: './delete-matiere.component.html',
  styleUrls: ['./delete-matiere.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteMatiereComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListMatiereComponent>,
    private service: MatiereService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteMatiere(this.data.id).subscribe(matiere => {
      this.ngOnInit();
      this.dialogRef.close(matiere);
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }


}
