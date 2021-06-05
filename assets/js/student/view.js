var firebaseConfig = {
    apiKey: "AIzaSyAd0ZOO8nK2x8dtV4bqFmttm5jNfSYDS6Q",
    authDomain: "cochemotcua.firebaseapp.com",
    projectId: "cochemotcua",
    storageBucket: "cochemotcua.appspot.com",
    messagingSenderId: "981144034138",
    appId: "1:981144034138:web:addbef7aa0634185993163",
    measurementId: "G-TLG94ZNHMJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
console.log("hello")
let view = {}
myStorage = window.sessionStorage;
view.setScreen = (className, components) => {
    document.querySelector("." + className).innerHTML = components
}
controller.showListRequest()



view.setScreenFormSend = (list)=>{
    let htmlSelectBp = "";
    for(let item of list){
        htmlSelectBp = htmlSelectBp +`<option idPhongBan = "${item.id}">${item.tenPhongBan}</option>`
    }
    document.querySelector(".select-pb").innerHTML = htmlSelectBp
    controller.getRequestByBp("Công tác sinh viên")
    document.querySelector(".select-pb").addEventListener("change",()=>{

        controller.getRequestByBp(document.querySelector(".select-pb").value)
        


        document.querySelector(".select-ten-don").addEventListener("change",()=>{
            const yeuCauFile = `<a href="${document.querySelector(".select-ten-don")[document.querySelector(".select-ten-don").selectedIndex].getAttribute('url')}">Link tải biểu mẫu</a>`+"<br>"+ document.querySelector(".select-ten-don")[document.querySelector(".select-ten-don").selectedIndex].getAttribute('ghichu')
            document.querySelector(".yeu-cau-bieu-mau").innerHTML = yeuCauFile
        })
    })
}
view.ClickSendRequest = () => {
    document.querySelector(".btn-send-form").addEventListener("click", () => {
        view.setScreen("main", component.mainSendStudent)
        CKEDITOR.replace('editor1');
        controller.showListPB()
        document.querySelector(".btn-send-request").addEventListener("click",()=>{
            if((confirm('Bạn chắc muốn gửi không'))){
                console.log("gửi")
                view.sendRequet()
            }else{
                console.log("không gửi")
            }
            // view.sendRequet()
        })
    })
}

view.setScreenListRequest = async (list)=>{
    let htmlData = "";
    for(let item of list){
        htmlData = htmlData +`<tr idRequest = "${item.id}">
            <td>${item.tenFile}</td>
            <td>${item.tenPhongBan}</td>
            <td><a href="${item.urlFile}">Link </a></td>
        </tr>
        `
    }
    document.querySelector(".list-request").innerHTML = htmlData
    
}
view.setScreenNotLogged = () => {
    view.setScreen("header-student", component.notLogged)
    document.querySelector(".btn-login-submit").addEventListener("click", (e) => {
        e.preventDefault()
        const email = document.getElementsByName("email")[0].value
        const password = document.getElementsByName("password")[0].value
        const data = {
            email: email,
            password: password,
        }
        console.log(data)
        $.ajax({
            type: "POST",
            url: 'http://localhost:80/DemoCCMC/model/loginStudent.php',
            data: data,
            success: (data) => {
                const userData = JSON.parse(data);
                if (userData[0].id) {
                    sessionStorage.setItem('tenUser', userData[0].tenUser);
                    sessionStorage.setItem('id', userData[0].id);
                    view.setScreenLogged(userData[0]);
                    $('#form-login').modal('hide');
                    document.querySelector(".toast-body").innerHTML = `Đăng nhập thành công xin chào ${userData[0].tenUser}!`
                    $('.toast').toast('show')

                } else {
                    alert(userData[0].notification)
                    document.getElementsByName("password")[0].value = ""
                }
            }
        });
    })
}

view.setScreenLogged = (userData) => {
    view.setScreen("header-student", component.logged)
    view.setScreen("name-user", userData.tenUser + "( Sinh Viên)")
    view.ClickSendRequest()
    document.querySelector(".btn-logout").addEventListener("click",()=>{
        sessionStorage.clear();
        location.reload();
    })
}

if (sessionStorage.getItem('tenUser')) {
    const userData = {
        id: sessionStorage.getItem('id'),
        tenUser:sessionStorage.getItem('tenUser'),
    }
    view.setScreenLogged(userData)
}
else {
    console.log("chưa đăng nhập")
    view.setScreenNotLogged()
}
view.sendRequet = ()=>{
    const idNguoiGui = sessionStorage.getItem('id');
    let today = new Date()
    const tgGui =  today.setDate(today.getDate())
    const ghiChuSv = CKEDITOR.instances.editor1.getData();
    let file = document.getElementsByName("file-send")[0].files[0]
    const tenYeuCau = document.querySelector(".select-ten-don").value
    const phongTiepNhan = document.querySelector(".select-pb")[document.querySelector(".select-pb").selectedIndex].getAttribute('idphongban')
    if(idNguoiGui == "" || tenYeuCau == "" || phongTiepNhan == "" || file ){
        const temp = file.name.split(".")
        const typeFile =temp[temp.length-1]
        if(  typeFile == "pdf" ){
            var storage = firebase.storage();
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child('files/'+tgGui+"_"+file.name).put(file)
            const request = {
                idNguoiGui:idNguoiGui,
                tenYeuCau:tenYeuCau,
                tgGui:tgGui,
                ghiChuSv:ghiChuSv,
                urlFile:tgGui+"_"+file.name,
                phongTiepNhan:phongTiepNhan,
            }

            $.ajax({
                type: "POST",
                url: 'http://localhost:80/DemoCCMC/model/createRequest.php',
                data: request,
                success: (data) => {
                    if(JSON.parse(data)[0].notification == "true"){
                        view.setScreen("main",component.mainSudent)
                        controller.showListRequest()
                        let noidung= {
                            noidung:"Yêu cầu "+request.tenYeuCau+" của bạn của bạn đã được gửi đi <br> Hãy đợi cho đến khi có thông bảo mới <br> Nếu có vấn đề xin liên hệ:......"
                        }
                        $.ajax({
                            type: "POST",
                            url: 'http://localhost/DemoCCMC/model/mail.php',
                            data: noidung,
                            success: (data) => {
                                if(data=="true"){
                                    document.querySelector(".toast-body").innerHTML = "Gửi yêu cầu thành công! Kiểm tra mail của bạn."
                                    $('.toast').toast('show')
                                }else{
                                    document.querySelector(".toast-body").innerHTML = "mail của bạn không đúng bạn sẽ không nhận được thông báo"
                                    $('.toast').toast('show')
                                }
                            }
                        });
                    }
                }
            });
        }else{
            alert("Hệ thống hiện tại chỉ nhận file pdf")
    
        }
    }
    else{
        alert("chưa điền đủ thông tin")
    }

}
