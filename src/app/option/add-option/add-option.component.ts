import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListOptionComponent } from '../list-option/list-option.component';
import { OptionService } from 'src/app/services/option/option.service';
import { Option } from 'src/app/models/option.model';


@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css'],
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

export class AddOptionComponent implements OnInit {
  fomulaireAjout = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<ListOptionComponent>,
    private service: OptionService,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addFiliere() {
    if (this.fomulaireAjout.status === 'VALID') {
      this.service.addOption(this.fomulaireAjout.value as unknown as Option).subscribe((option) => {
        this.dialogRef.close(option);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
