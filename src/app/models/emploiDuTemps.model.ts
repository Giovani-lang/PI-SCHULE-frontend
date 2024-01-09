import { Annee } from "./anneeAcademique.model";
import { Classe } from "./classe.model";

export class Emploi {
    id!: number;
    annee_academique!: Annee;
    semestre!: String;
    nom_classe!: Classe;
}