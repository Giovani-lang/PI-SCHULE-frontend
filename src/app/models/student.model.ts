import { Annee } from "./anneeAcademique.model";
import { Classe } from "./classe.model";

export class Student {
    id!: number;
    matricule!: String;
    image_url!: String;
    nom!: String;
    dateNaissance!: string;
    prenom!: String;
    email!: String;
    telephone!: String;
    password!: String;
    classe!: Classe;
    niveau!: String;
    role!: String;
    filiere!: String;
    genre!: String;
    option!: String;
    dateInscription!: Date;
    anneeAcademique!: Annee;
}