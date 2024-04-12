export class Articolo {
    id!: string;
    titolo: string;
    testo: string;
    categoria: string;
    autore: string;                     //(id autore => ricavare nomePenna)
    dataCreazione: Date | string;
    dataModifica?: Date | string;

    constructor(art: Partial<Articolo>) {
        this.titolo = art.titolo ? art.titolo : '';
        this.testo = art.testo ? art.testo : '';
        this.categoria = art.categoria ? art.categoria : '';
        this.autore = art.autore ? art.autore : '';
        this.dataCreazione = art.dataCreazione ? art.dataCreazione : '';
        this.dataModifica = art.dataModifica ? art.dataModifica : '';
    }
}