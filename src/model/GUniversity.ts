
export interface GUniversity {
    id: number;
    name_full: string;
    name_short : string;
    email : string;
    create_at : string;
    update_at : string;
}

export type TAPIdata = {
    bypass: boolean,
    data: Array<GUniversity>,
    status : string
}