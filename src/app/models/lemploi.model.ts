import { Classe } from "./classe.model";
import { Matiere } from "./matiere.model";
import { Teacher } from "./teacher.model";

export class Lemploi {
    id!: number;
    classe!: Classe;
    enseignant!: Teacher;
    matiere!: Matiere;
    duree!: number;
    jour!: String;
    debut!: String;
    fin!: String;
}