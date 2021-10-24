import swal from 'sweetalert';

const actionSuccess = (label : string) => {
    swal("ทำรายการสำเร็จ", label, "success")
}
const actionInfo = (label : string) => {
    swal("การทำรายการมีข้อผิดพลาด", label , "info")
}
const actionError = () => {
    swal("ทำรายการล้มเหลว", 'ฐานข้อมูลอาจเกิดข้อผิดพลาด หรือ สัญญาณอินเตอร์ไม่เสถียร กรุณาติดต่อเจ้าหน้าที่ดูแลระบบ' , "error")
}

const exportedSwal  = {
    actionInfo,
    actionSuccess,
    actionError
};

export default exportedSwal;