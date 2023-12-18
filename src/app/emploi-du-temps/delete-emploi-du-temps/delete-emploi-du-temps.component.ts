import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListEmploiDuTempsComponent } from '../list-emploi-du-temps/list-emploi-du-temps.component';
import { EmploiDutempsService } from 'src/app/services/emploiDutemps/emploi-dutemps.service';

@Component({
  selector: 'app-delete-emploi-du-temps',
  templateUrl: './delete-emploi-du-temps.component.html',
  styleUrls: ['./delete-emploi-du-temps.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteEmploiDuTempsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListEmploiDuTempsComponent>,
    private service: EmploiDutempsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteEmploi(this.data.id).subscribe(emploi => {
      this.ngOnInit();
      this.dialogRef.close(emploi);
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }

}
