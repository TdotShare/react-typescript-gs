
export interface GSprofile {
    id: number;
    name: string;
    scholar_id : string;
    gs_university_id : number;
    university_name : string;
    create_at : string;
    update_at : string;
}

export type TAPIdata = {
    bypass: boolean,
    data: Array<GSprofile>,
    status : string
}