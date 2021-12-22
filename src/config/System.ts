export const systemConfig  =  {
    //API : process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:8000/api" : "https://mis-ird.rmuti.ac.th/service/gs/api" , 
    API : "https://mis-ird.rmuti.ac.th/service/gs/api" , 
    NameFull : `ระบบดึงข้อมูล Google Scholar`,
    NameInit : `MISIRD - GS`,
    BaseRouter : process.env.NODE_ENV !== 'production' ? "/" : "/gs/admin" 
}
