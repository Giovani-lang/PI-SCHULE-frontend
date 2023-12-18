import { Component, Inject, OnInit } from '@angular/core';
import { ListOptionComponent } from '../list-option/list-option.component';
import { OptionService } from 'src/app/services/option/option.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-option',
  templateUrl: './delete-option.component.html',
  styleUrls: ['./delete-option.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteOptionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListOptionComponent>,
    private service: OptionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteOption(this.data.nom).subscribe(option => {
      this.ngOnInit();
      this.dialogRef.close(option);
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }

}
