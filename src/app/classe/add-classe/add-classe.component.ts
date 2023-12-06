import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ListClasseComponent } from '../list-classe/list-classe.component';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { Classe } from 'src/app/models/classe.model';
import { Filiere } from 'src/app/models/filiere.model';
import { Option } from 'src/app/models/option.model';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import { OptionService } from 'src/app/services/option/option.service';


@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
  ]
})
export class AddClasseComponent implements OnInit {
  formulaireAjout = new FormGroup({
    nom: new FormControl('', Validators.required),
    filiere: new FormControl('', Validators.required),
    option: new FormControl('', Validators.required),
    niveau: new FormControl('', Validators.required),
  })

  filieres: Filiere[] = [];
  options: Option[] = [];


  constructor(
    public dialogRef: MatDialogRef<ListClasseComponent>,
    private service: ClasseService,
    private message: MatSnackBar,
    private serviceFil: FiliereService,
    private serviceOpt: OptionService
  ) { }

  ngOnInit(): void {
    this.serviceFil.getAllFiliere().subscribe(filiere => this.filieres = filiere);
    this.serviceOpt.getAllOption().subscribe(option => this.options = option);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const classe = this.formulaireAjout.value as unknown as Classe;
      this.service.addClasse(classe).subscribe((classe) => {
        this.dialogRef.close(classe);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
