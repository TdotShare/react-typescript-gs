interface User {
    id: number;
    card_id: string;
    title : string;
    firstname : string;
    username : string;
    surname : string;
    email : string;
    nickname : string;
    gender : number;
    position : string;
    role : number;
    token : string;
}

export type TAPIdata = {
    bypass: boolean,
    data: User,
    status : string
}