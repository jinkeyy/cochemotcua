let controller ={}
controller.getListRequest =  (key) =>{
        let kw = key
        if(key=="0"){
            kw = ""
        }
        $.ajax({
        type: "POST",
        url: 'http://localhost/DemoCCMC/model/getListRequestCBMC.php',
        data:{
            key:kw,
        },
        success: (data) => {
            const list=  JSON.parse(data);
            if(list[0].notification){
                view.setScreen("list-request","Không có yêu cầu")
            }else{
                let htmlList = "";
                for(let item of list){
                    if(key=="0"){
                        htmlList = htmlList + components.itemRequest(item,true);
                    }else{
                        htmlList = htmlList + components.itemRequest(item);
                    }
                }
                view.setScreen("list-request",htmlList)
                let listItem = document.getElementsByClassName("item")
                for(let item of listItem){
                    item.addEventListener("click",()=>{
                        view.screenFile(item.getAttribute("urlFile"))
                    })
                }
                let xuly = document.getElementsByClassName("xu-ly")
                for(let item of xuly){
                    item.addEventListener("click",()=>{
                        controller.getListRequestById(item.getAttribute("id_request"),"xuly")
                    })
                }
                controller.hoanThanh(list)
            }

        }
      });
}
controller.getListRequestYCPB =  () =>{
    $.ajax({
    type: "POST",
    url: 'http://localhost/DemoCCMC/model/getlistResquestYCPB.php',
    success: (data) => {
        const list=  JSON.parse(data);
        console.log(list)
        if(list[0].notification){
            view.setScreen("list-request","Không có yêu cầu")
        }else{
            let htmlList = "";
            for(let item of list){
                    htmlList = htmlList + components.itemRequest(item);
            }
            view.setScreen("list-request",htmlList)
            let listItem = document.getElementsByClassName("item")
            for(let item of listItem){
                item.addEventListener("click",()=>{
                    view.screenFile(item.getAttribute("urlFile"))
                })
            }
        }
    }
  });
}
controller.getListRequestKQTV =  () =>{
    $.ajax({
    type: "POST",
    url: 'http://localhost/DemoCCMC/model/getListRequestKQTV.php',
    success: (data) => {
        const list=  JSON.parse(data);
        console.log(list)
        if(list[0].notification){
            view.setScreen("list-request","Không có yêu cầu")
        }else{
            let htmlList = "";
            for(let item of list){
                    htmlList = htmlList + components.itemRequest(item);
            }
            view.setScreen("list-request",htmlList)
            let listItem = document.getElementsByClassName("item")
            for(let item of listItem){
                item.addEventListener("click",()=>{
                    view.screenFile(item.getAttribute("urlFile"))
                })
            }
            controller.hoanThanh(list)
        }
    }
  });
}
controller.getListRequestById = (id,type)=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/DemoCCMC/model/getListRequestById.php',
        data:{
            id:id
        },
        success: (data) => {
            const list=  JSON.parse(data);
            console.log(list)
            switch(type) {
                case "xuly":
                    view.setScreen("list-request",components.formXuLyYeuCau(list))
                    controller.XuLy(list[0])
                  break;
                case "kq":
                    view.setScreen("list-request",components.formHoanThanh(list[0]))
                    document.querySelector(".btn-hoanthanh").addEventListener("click",()=>{
                        if((confirm('GỬI THÔNG BÁO HOÀN THÀNH ĐẾN SINH VIÊN'))){
                            list[0].trangThaiMoi = 2
                            list[0].gcCBMC = list[0].ghiChuCBMC
                            controller.UpdateTrangThai(list[0])
                            let noidung = {
                                noidung:"Đơn của bạn đã hoàn thành<br>Thời gian nhận "+list[0].tgHoanThanh+" tại phòng: "+list[0].tenPhongBan+"<br>Mọi thắc mắc xin liên hệ",
                                nguoinhan:list[0].email
                            }
                            controller.mail(noidung)
                        }
                    })
                  break;
                default:
                  return 0
            }
        }
      });
}
controller.XuLy = (data)=>{
    document.querySelector(".btn-huy-yeu-cau").addEventListener("click",()=>{
        console.log("Không đạt yêu cầu")
        let ghiChuCBMC = document.querySelector(".ghi-chu-cbmc-2").value
        if((confirm('Bạn có chắc YÊU CẦU KHÔNG ĐẠT '))){
            let trangThaiMoi = 3
            data.trangThaiMoi = trangThaiMoi
            data.gcCBMC = ghiChuCBMC
            controller.UpdateTrangThai(data)
            let noidung = {
                noidung:"Đơn của bạn đã bị HỦY<br>Lý do: "+ghiChuCBMC+"<br>Mọi thắc mắc xin liên hệ",
                nguoinhan:data.email
            }
            console.log(noidung.noidung)
            controller.mail(noidung)
        }

    })
    document.querySelector(".btn-dat-yeu-cau").addEventListener("click",()=>{
        console.log("Đạt yêu cầu")
        let ghiChuCBMC = document.querySelector(".ghi-chu-cbmc").value
        if((confirm('Bạn có chắc YÊU CẦU ĐẠT '))){
            data.gcCBMC = ghiChuCBMC
            let trangThaiMoi
            switch(data.phongTiepNhan){
                case "1":
                    trangThaiMoi =  4
                    break;
                case "2":
                    trangThaiMoi =  5
                    break;
                case "3":
                    trangThaiMoi =  6
                    break;    
                case "4":
                    trangThaiMoi =  7
                    break;
                case "5":
                    trangThaiMoi =  8
                    break;
                default:
                  return 0
            }
            data.trangThaiMoi = trangThaiMoi
            controller.UpdateTrangThai(data);
        }else{
            console.log("không gửi")
        }
    })
}
controller.UpdateTrangThai = (data)=>{
    alert("Thành công")
    $.ajax({
        type: "POST",
        url: 'http://localhost/DemoCCMC/model/updateTrangThai.php',
        data: data,
        success: (data) => {
            const list=  JSON.parse(data);
            console.log(list)
            if(list[0].notification == "true"){
                alert("Xử lý thành công")
                 view.onLoadMainCBMC()
            }else{
                alert("Xử lý thất bại")
                view.onLoadMainCBMC()
            }
        }
    });
}
controller.hoanThanh = (data)=>{
    let hoanThanh = document.getElementsByClassName("hoan-thanh")
    for(let item of hoanThanh){
        item.addEventListener("click",()=>{
            controller.getListRequestById(item.getAttribute("id_request"),"kq")
        })
    }
}


controller.getListRequestCBPB = (get)=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/DemoCCMC/model/getListRequestCBMC.php',
        data:{
            key:get,
        },
        success: (data) => {
            const list=  JSON.parse(data);
            console.log(list)
            if(list[0].notification){
                view.setScreen("list-request","Không có yêu cầu")
            }else{
                let htmlList = "";
                for(let item of list){
                        let today = new Date();
                        let tgGui = new Date(Number(item.tgGui));
                        let tgDuKien = new Date(tgGui.setDate(tgGui.getDate() + 2))
                        DateFiff = (d1, d2)=>{
                            let t2 = d2.getTime();
                            let t1 = d1.getTime();
                            return parseInt((t2-t1)/(24*3600*1000));
                        }
                        let tgHan = DateFiff(today,tgDuKien)
                        let status = ""
                        if(tgHan>0){
                            status = `<p>Còn ${tgHan} ngày</p>`
                        }else{
                            status ="<p style='color:red'>QUÁ HẠN</p>"
                        }
                        htmlList = htmlList + `<tr>
                        <td>${status}</td>
                        <td>${item.tenYeuCau}</td>
                        <td>${item.ghiChuSV}</td>
                        <td>${item.tenUser}- ${item.ma}</td>
                        <td><a href="#" class="xu-ly" id_request="${item.id_request}">Xử Lý</a></td>
                      </tr>`;
                }
                document.querySelector(".list-yeu-cau-pb").innerHTML = htmlList
                tableCBPB()
                let xuLy =  document.getElementsByClassName("xu-ly")
                for(let item of xuLy){
                    item.addEventListener("click",()=>{
                        console.log(item.getAttribute("id_request"))
                    })
                }
            }
        }
    })
}
controller.mail =(noidung)=>{
    $.ajax({
        type: "POST",
        url: 'http://localhost/DemoCCMC/model/mail.php',
        data: noidung,
        success: (data) => {
            if(data=="true"){
                alert("Thông báo tới sinh viên thành công")
            }else{
                alert("Thông báo tới sinh viên thất bại")
            }
        }
    });
}
controller.addFile = ()=>{
    const tenFile = document.getElementsByName("ten-file")[0].value
    const file = document.getElementsByName("file-tai-len")[0].files[0]
    const ghiChuFile = document.getElementsByName("ghi-chu-file")[0].value
    const idPhongBan = document.getElementsByName("combo-phong-ban")[0].value

    if(tenFile != "" && idPhongBan!="" && file != undefined ){
        const temp = file.name.split(".")
        const typeFile =temp[temp.length-1]
        if(  typeFile == "pdf" || typeFile =="doc" ||typeFile =="docx"){
            var storage = firebase.storage();
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child('files/'+tenFile+"_"+file.name).put(file)
            firebase.storage().ref().child('files/'+tenFile+"_"+file.name).getDownloadURL()
            .then((url) => {
                let data ={
                    tenFile: tenFile,
                    ghiChuFile: ghiChuFile,
                    idPhongBan:idPhongBan,
                    urlFile:url,
                }
                console.log(data)
                $.ajax({
                    type: "POST",
                    url: 'http://localhost:80/DemoCCMC/model/addFile.php',
                    data: data,
                    success: (data) => {
                        if(JSON.parse(data)[0].notification == "true"){
                            alert("thành công");
                            $('#form-them-flie').modal('hide');
                        }else{
                            alert("thất bại")
                        }
                    }
                });
            }) .catch((error) => {
                alert("lỗi "+error)
            });

        }else{
            alert("Hệ thống chỉ nhận file định dạng PDF,DOC,DOCX")
        }
    }else{
        alert("chưa điền đủ thông tin")
    }
}