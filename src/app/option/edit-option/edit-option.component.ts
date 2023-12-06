import { Component, Inject, OnInit } from '@angular/core';
import { Option } from 'src/app/models/option.model';
import { ListOptionComponent } from '../list-option/list-option.component';
import { OptionService } from 'src/app/services/option/option.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class EditOptionComponent implements OnInit {
  fomulaireModif = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<ListOptionComponent>,
    private service: OptionService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.fomulaireModif.controls['nom'].setValue(this.editData.nom)
    }
  }

  editFiliere() {
    if (this.fomulaireModif.status === 'VALID') {
      this.service.editOption(this.fomulaireModif.value as unknown as Option, this.editData.id).subscribe((option) => {
        this.dialogRef.close(option);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
