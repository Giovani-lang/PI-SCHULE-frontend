import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fiches } from 'src/app/models/fiches';
import { FichesService } from 'src/app/services/fiches.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListfichesComponent } from '../listfiches/listfiches.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker/datepicker-base';


@Component({
  selector: 'app-addfiche',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatFormFieldModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './addfiche.component.html',
  styleUrls: ['./addfiche.component.css']
})
export class AddficheComponent implements OnInit {

  fiches!: Fiches;

  matiere: string[] = [
  ];

  session: string[] = [
    'Tenue',
    'Non-tenue'
  ] 
  
  dateFilter = (date: { getDay: () => any; }) => {
    const day = date.getDay();
    return day !== 0 && day !== 6
  }
  myDatePicker!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  

  formulaireAjoutFiche = new FormGroup({ 
    niveau: new FormControl('',[Validators.required]),
    enseignant: new FormControl('',[Validators.required]),
    matiere: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    horaire: new FormControl('',[Validators.required]),
    session: new FormControl('',[Validators.required]),
    etudiant: new FormControl('',[Validators.required]),
    present: new FormControl('',[Validators.required]),
  })
  
  constructor(
    private service: FichesService,
    public dialogRef: MatDialogRef<ListfichesComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,//
    private message: MatSnackBar,
    private matiereService: MatiereService,
  ) {}

  ngOnInit(): void {
    this.matiereService.getAllMatiere()
    .subscribe(data => this.matiere);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formulaireAjoutFiche.status === 'VALID') {
      const fiches = this.formulaireAjoutFiche.value as unknown as Fiches;
      this.service.addFiche(fiches).subscribe((fiches) => {
        this.dialogRef.close(fiches);
        this.message.open(" Fiche enregistrée !", "succès", { duration: 2000 })
      });
    }
  }
}
