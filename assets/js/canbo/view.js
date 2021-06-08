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
  // let file = document.querySelector(".file-request")
  // console.log(file)



let view = {}
view.setScreen = (className, components) => {
  document.querySelector("." + className).innerHTML = components
}
view.screenLogin = () =>{
  view.setScreen("main-canbo",components.mainLogin)
  document.querySelector(".btn-login-canbo").addEventListener("click",(e)=>{
    e.preventDefault()
    const email = document.getElementsByName("email")[0].value
    const password = document.getElementsByName("password")[0].value
    const data = {
        email: email,
        password: password,
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:80/DemoCCMC/model/loginCanBo.php',
        data: data,
        success: (data) => {
            const userData = JSON.parse(data);
            if (userData[0].id) {
                sessionStorage.setItem('tenUser', userData[0].tenUser);
                sessionStorage.setItem('id', userData[0].id);
                sessionStorage.setItem('quyen', userData[0].quyen);
                const dataUser = {
                  id: sessionStorage.getItem('id'),
                  tenUser:sessionStorage.getItem('tenUser'),
                  quyen: sessionStorage.getItem('quyen')
                }
                if(dataUser.quyen == "Cán Bộ Một Cửa"){
                  view.screenCBMC(dataUser)
                }else{
                  console.log("Xin chào cán bộ phòng ban")
                  view.screenCBPB(dataUser)
                }
                // $('#form-login').modal('hide');
                // document.querySelector(".toast-body").innerHTML = `Đăng nhập thành công xin chào ${userData[0].tenUser}!`
                // $('.toast').toast('show')
            } else {
                if(userData[0].notification == "false"){
                  alert("Tài khoản hoặc mật khẩu sai")
                  document.getElementsByName("password")[0].value = ""
                }
            }
        }
    });
  })
}


view.screenChart = ()=>{
  var ctx2 = document.getElementById('myChart2').getContext('2d');
  $.ajax({
    type: "POST",
    url: 'http://localhost/DemoCCMC/model/chart.php',
    success: (data) => {
        const list=  JSON.parse(data)[0];
        view.setScreen("yeu-cau-xu-ly",list.YeuCauChuaXuLy)
        view.setScreen("yeu-cau-tong",list.YeuCau)
        var myChart2 = new Chart(ctx2, {
          type: 'bar',
          data: {
              labels: ['Yêu cầu bị hủy', 'Yêu cầu chưa xử lý', 'Yêu cầu đợi phòng ban duyệt',"Yêu Cầu đã xử lý","Yêu cầu đã có kết quả từ phòng ban"],
              datasets: [{
                  label: 'Thống kê yêu cầu',
                  data: [list.YeuCauBiHuy, list.YeuCauChuaXuLy, list.YeuCauPB,list.YeuCauDaXuLy,list.YeuCauKQPB],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)',
                      'rgba(255, 206, 86, 0.8)',
                      'rgba(25, 206, 16, 0.8)',
                      'rgba(85, 26, 86, 0.8)',
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(25, 206, 16, 1)',
                      'rgba(85, 26, 86, 1)',
                  ],
                  hoverOffset: 4,
                  barPercentage: 1,

              }]
          },
          options: {
            indexAxis: 'y',
          }
      },);
    }
  });

}

view.screenCBMC = (dataUser)=>{

  view.setScreen("info-user",components.infoUser(dataUser))
  view.setScreen("main-canbo",components.mainCBMC)
  view.screenChart()
  document.querySelector(".btn-them-file").addEventListener("click",()=>{
    controller.addFile()
  })
  document.querySelector(".btn-them-user").addEventListener("click",(e)=>{
    e.preventDefault()
    controller.addUser()
  })
  let listItemMenu = document.getElementsByClassName("item-menu")
  resetActiveItem = ()=>{
      for(let item of listItemMenu){
          item.classList.remove("active-item-menu")
      }
  }
  for(let item of listItemMenu){
      item.addEventListener("click",()=>{
          resetActiveItem()
          item.classList.add("active-item-menu")
          document.querySelector(".file-request").innerHTML = `<div>NHẤN BẤT KỲ VÀO YÊU CẦU ĐỂ XEM</div>`
          let get =item.getAttribute("get")
          if(get == '45678' || get == '910111213'){
            switch(get) {
              case "45678":
                  controller.getListRequestYCPB()
                break;
              case "910111213":
                  controller.getListRequestKQTV()
                break;
              default:
                alert("Lỗi")
            }
          }else if(get=="trangchu"){
              view.onLoadMainCBMC()
          }else{
            controller.getListRequest(get)
          }
      })
  }
  document.querySelector(".btn-logout").addEventListener("click",()=>{
    sessionStorage.clear();
    location.reload()
  })
}






view.getListRequestCBPB = (get)=>{
  $.ajax({
      type: "POST",
      url: 'http://localhost/DemoCCMC/model/getListRequestCBMC.php',
      data:{
          key:get,
      },
      success: (data) => {
          const list=  JSON.parse(data);
          if(list[0].notification){
              view.setScreen("list-yeu-cau-pb",`<tr><td colspan='5'>Không có yêu cầu nào</td></tr>`)
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
                    document.querySelector(".list-yeu-cau-pb").innerHTML = htmlList
                    tableCBPB()
                    let xuLy =  document.getElementsByClassName("xu-ly")
                    for(let i of xuLy){
                        i.addEventListener("click",()=>{
                            view.setScreen("main-canbo",components.formXuLyCBPB(item))
                            view.screenFile(item.urlFile)
                            document.querySelector(".btn-hoanthanh").addEventListener("click",()=>{
                              if((confirm('HOÀN THÀNH ĐƠN ? '))){
                                let date = document.getElementsByName("date-cbpb")[0].value
                                let today = new Date()
                                let ngayHen = new Date(date)
                                item.date = date
                                if(ngayHen>today){
                                    let ghiChuCBPB = document.querySelector(".ghi-chu-cbpb").value
                                    date = ngayHen.getDate()+"/"+(ngayHen.getMonth()+1)+"/"+ngayHen.getFullYear()
                                    item.date = date
                                    item.gcCBPB = ghiChuCBPB
                                    switch(sessionStorage.getItem('quyen')){
                                      case "Công tác sinh viên":
                                          item.trangThaiMoi = 9
                                        break;
                                      case "Đào tạo":
                                          item.trangThaiMoi = 10
                                        break;
                                      case "Cơ sở vật chất":
                                          item.trangThaiMoi = 11
                                        break;
                                      case "Tài chính":
                                          item.trangThaiMoi = 12
                                        break;
                                      case "Y tế":
                                          item.trangThaiMoi = 13
                                        break;
                                      default:
                                        alert("Lỗi")
                                    }
                                    $.ajax({
                                      type: "POST",
                                      url: 'http://localhost/DemoCCMC/model/updateTrangThaiCBPB.php',
                                      data: item,
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
                                }else{
                                  alert("Ngày hẹn không được trước ngày hiện tại")
                                }

                              }
                           })
                            document.querySelector(".btn-exit").addEventListener("click",()=>{
                               view.onLoadMainCBMC()
                            })
                        })
                    }
              }

          }
      }
  })
}

























view.screenCBPB =  (dataUser)=>{
  view.setScreen("info-user",components.infoUser(dataUser))
  view.setScreen("main-canbo",components.mainCBPB())
  view.setScreen("title-room","Phòng "+sessionStorage.getItem('quyen'))
  document.querySelector(".tao-tai-khoan").style = "display:none"
  console.log(sessionStorage.getItem('quyen'))
  switch(sessionStorage.getItem('quyen')){
    case "Công tác sinh viên":
        view.getListRequestCBPB(4)
      break;
    case "Đào tạo":
        view.getListRequestCBPB(5)
      break;
    case "Cơ sở vật chất":
        view.getListRequestCBPB(6)
      break;
    case "Tài chính":
        view.getListRequestCBPB(7)
      break;
    case "Y tế":
        view.getListRequestCBPB(8)
      break;
    default:
      alert("Lỗi")
  }
  document.querySelector(".btn-logout").addEventListener("click",()=>{
    sessionStorage.clear();
    location.reload()
  })
}
view.onLoadMainCBMC = ()=>{
  if (sessionStorage.getItem('tenUser')) {
    console.log("đã đăng nhập")
    const dataUser = {
        id: sessionStorage.getItem('id'),
        tenUser:sessionStorage.getItem('tenUser'),
        quyen: sessionStorage.getItem('quyen')
    }
    if(dataUser.quyen == "Cán Bộ Một Cửa"){
      view.screenCBMC(dataUser)
    }else{
      view.screenCBPB(dataUser)
    }
  }
  else {
    console.log("chưa đăng nhập")
    view.screenLogin()
  }
}
view.onLoadMainCBMC()
view.screenFile = (urlFile)=>{
  let file = document.querySelector(".file-request")
  firebase.storage().ref().child('files/'+urlFile).getDownloadURL()
  .then((url) => {
    file.innerHTML = `<iframe src='${url}' width='100%' height='100%' frameborder='0'>
     </iframe>`
  })
  .catch((error) => {
    })
}