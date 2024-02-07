import { Filiere } from "./filiere.model";
import { Option } from "./option.model";

export class Classe {
    id!: number;
    nom!: String;
    nom_filiere!: Filiere;
    nom_option!: Option;
    niveau!: String;
    tarif!: number;
}