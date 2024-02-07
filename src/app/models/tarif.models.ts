import { Option } from "./option.model";

export class Tarif {
    id!: number;
    niveau!: String;
    montant!: number;
    options!: Option;
}