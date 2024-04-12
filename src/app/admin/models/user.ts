export class User {
    id!: string;
    username: string;
    password: string;
    nomePenna?: string;                // (presente per 'Scrittore')
    ruolo: 'Lettore' | 'Scrittore' | 'Admin';

    constructor(usr: Partial<User>){
        this.username = usr.username ? usr.username : '';
        this.password = usr.password ? usr.password : '';
        this.ruolo = usr.ruolo ? usr.ruolo : 'Lettore';
        this.nomePenna = usr.nomePenna ? usr.nomePenna : usr.username;
    }
}