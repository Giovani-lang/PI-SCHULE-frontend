import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListLemploiComponent } from '../list-lemploi/list-lemploi.component';
import { LemploiService } from 'src/app/services/lemploi/lemploi.service';

@Component({
  selector: 'app-delete-lemploi',
  templateUrl: './delete-lemploi.component.html',
  styleUrls: ['./delete-lemploi.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteLemploiComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListLemploiComponent>,
    private service: LemploiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.service.getAllByClasse(this.data.classe.nom).subscribe()
  }

  delete() {
    return this.service.deleteL(this.data.id).subscribe(student => {
      this.dialogRef.close(student);
      this.ngOnInit();
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }

}
