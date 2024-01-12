import { Annee } from "./anneeAcademique.model";
import { Student } from "./student.model";

export class Historique {
    id!: number;
    date!: String;
    matricule_etd!: Student;
    montant!: number;
    libelle!: String;
    etudiant!: Student;
    anneeAcademique!: Annee;
}