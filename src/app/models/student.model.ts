import { Annee } from "./anneeAcademique.model";

export class Student {
    id!: number;
    matricule!: String;
    image_url!: String;
    nom!: String;
    dateNaissance!: Date;
    prenom!: String;
    email!: String;
    telephone!: String;
    password!: String;
    classe!: String;
    niveau!: String;
    role!: String;
    filiere!: String;
    genre!: String;
    option!: String;
    dateInscription!: Date;
    anneeAcademique!: Annee;
}