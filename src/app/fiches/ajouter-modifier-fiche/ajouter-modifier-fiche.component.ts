import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core.service';
import { FichesService } from 'src/app/fiches.service';


@Component({
  selector: 'app-ajouter-modifier-fiche',
  templateUrl: './ajouter-modifier-fiche.component.html',
  styleUrls: ['./ajouter-modifier-fiche.component.css']
})
export class AjouterModifierFicheComponent implements OnInit {

  fichesForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _fichesService: FichesService,
    private _dialogRef: MatDialogRef<AjouterModifierFicheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.fichesForm = this._fb.group({
      niveau: '',
      enseignant: '',
      matiere: '',
      horaire: '',
      coursTenu: '',
      nomEtudiant: '',
      present: '',
    });
  }

  ngOnInit(): void {
    this.fichesForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.fichesForm.valid) {
      if (this.data) {
        this._fichesService
          .modifierfiche(this.data.id, this.fichesForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Fiche modifiee!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._fichesService.ajouterfiche(this.fichesForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Fiche ajoutee');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

