import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListClasseComponent } from '../list-classe/list-classe.component';
import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-delete-classe',
  templateUrl: './delete-classe.component.html',
  styleUrls: ['./delete-classe.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteClasseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListClasseComponent>,
    private service: ClasseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteClasse(this.data.id).subscribe(classe => {
      this.ngOnInit();
      this.dialogRef.close(classe);
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }

}
