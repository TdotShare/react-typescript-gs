
export interface GSindex {
    scholar_id : string;
    reference : number;
    h_index : number;
    iten_index : number;
    reference2016 : number;
    h_index2016 : number;
    iten_index2016 : number;
    fullname: string;
    university_name : string;
    create_at : string;
    update_at : string;
}

export type TAPIdata = {
    bypass: boolean,
    data: Array<GSindex>,
    status : string
}