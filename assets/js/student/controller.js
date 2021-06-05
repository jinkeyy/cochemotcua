let controller = {

}
controller.showListRequest = (key = "")=>{
    $.ajax({
        type: "GET",
        url: 'http://localhost/DemoCCMC/model/listRequestStudent.php',
        data: key,
        success: (data) => {
            const list = JSON.parse(data);
            view.setScreenListRequest(list)
            tableListRequest()
        }
    });
}
controller.showListPB = ()=>{
    $.ajax({
        type: "GET",
        url: 'http://localhost/DemoCCMC/model/listPB.php',
        success: (data) => {
            const list = JSON.parse(data);
            view.setScreenFormSend(list)
        }
    });
}
controller.getRequestByBp = (key)=>{
    $.ajax({
        type: "GET",
        url: 'http://localhost/DemoCCMC/model/getRequestByPb.php?key='+key,
        data: key,
        success: (data) => {
            const list = JSON.parse(data);
            if(list[0].notification){
                alert("phòng này chưa hỗ trợ biểu mẫu nào")
                document.querySelector(".select-ten-don").innerHTML = ""
                document.querySelector(".yeu-cau-bieu-mau").innerHTML = ""
            }else{
                let htmlSelectTenFile = "";
                for(let item of list){
                    htmlSelectTenFile = htmlSelectTenFile +`<option idFile = "${item.id}" ghiChu="${item.ghiChu}" url="${item.urlFile}">${item.tenFile}</option>`
                }
                document.querySelector(".select-ten-don").innerHTML = htmlSelectTenFile
                const yeuCauFile = `<a href="${document.querySelector(".select-ten-don")[0].getAttribute('url')}">Link tải biểu mẫu</a>`+"<br>"+ document.querySelector(".select-ten-don")[0].getAttribute('ghichu')
                document.querySelector(".yeu-cau-bieu-mau").innerHTML = yeuCauFile
            }
        }
    });
}
// controller.mail = (data)=>{
//     $.ajax({
//         type: "POST",
//         url: 'http://localhost/DemoCCMC/model/mail.php',
//         data: data,
//         success: (data) => {
//             if(data=="true"){
                
//             }
//         }
//     });
// }