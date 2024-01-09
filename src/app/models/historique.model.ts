import { Annee } from "./anneeAcademique.model";
import { Student } from "./student.model";

export class Historique {
    id!: number;
    date!: String;
    matricule_etd!: String;
    montant!: number;
    libelle!: String;
    etudiant!: Student;
    anneeAcademique!: Annee;
}