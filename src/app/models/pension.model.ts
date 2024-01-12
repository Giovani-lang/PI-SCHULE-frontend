import { Annee } from "./anneeAcademique.model";
import { Student } from "./student.model";

export class Pension {
    id!: number;
    pensionAnnuelle!: number;
    totalPaye!: number;
    statut!: String;
    etudiant!: Student;
    annee_academique!: Annee;
}