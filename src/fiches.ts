import { Matiere } from "./matiere.model";
import { Student } from "./student.model";
import { Teacher } from "./teacher.model";

export class Fiches{
    id!:number;
    enseignant!: Teacher;
    matiere!: Matiere;
    date!:Date;
    horaire!: number;
    session!: String;
    etudiant!: Student;
    present!: String
}