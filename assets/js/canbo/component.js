let components = {

}
components.infoUser = (dataUser)=>{
    return  `<li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false"
    data-toggle="dropdown" href="#">${dataUser.tenUser}( ${dataUser.quyen})</a>
    <div class="dropdown-menu"><a class="dropdown-item" href="#">Thông tin tài khoản</a><a
        data-toggle="modal" data-target="#form-change-password" class="dropdown-item"
        href="#">Đổi mật khẩu</a>
        <a
        data-toggle="modal" data-target="#form-them-user" class="dropdown-item tao-tai-khoan"
        href="#">Tạo tài khoản</a>
        <a class="dropdown-item " href="#"   data-toggle="modal" data-target='#form-them-flie'>Thêm biểu mẫu</a><a class="dropdown-item btn-logout" href="#">Đăng Xuất</a></div>
    </li>`
}
components.mainLogin = `<div style="width:100%; margin: 0px;background: rgba(108,117,125,0.08);display:flex;justify-content: center;
align-items: center;">
<div class="col-xl-3 offset-xl-0 col-12" style="padding: 0px;">
    <div style="background: #6DBC2F;box-shadow: 0px 0px 2px 0px;height: 250px;border-radius: 3px;">
        <div class="d-flex justify-content-center align-items-center" style="padding: -1px;height: 50px;">
            <h5 style="color: var(--light);">Đăng Nhập Dành Cho Cán Bộ</h5>
        </div>
        <div style="padding: 0px;">
            <form>
                <div class="d-flex justify-content-center" style="margin: 10px;"><input class="form-control" type="text" style="width: 80%;" placeholder="Email" name="email"></div>
                <div class="d-flex justify-content-center" style="margin: 10px;"><input class="form-control" type="password" style="width: 80%;" placeholder="Mật Khẩu" name="password"></div>
                <div class="d-flex justify-content-center align-items-center"><button class="btn btn-warning btn-login-canbo" type="submit">Đăng Nhập</button></div>
            </form>
            <div class="d-flex justify-content-center align-items-center" style="margin: 0px;padding: 0px;height: 40px;"><a href="#">Quên mật khẩu?</a></div>
        </div>
    </div>
</div>
</div>`

components.itemRequest = (data,quaHan = false)=>{
    let today = new Date();
    
    let tgGui = new Date(Number(data.tgGui));
    let date = tgGui.getHours()+":"+tgGui.getMinutes()+"p - "+tgGui.getDate()+"/"+(tgGui.getMonth()*1+1)+"/"+tgGui.getFullYear()
    
    let tgDuKien = new Date(tgGui.setDate(tgGui.getDate() + 5))
 

    DateFiff = (d1, d2)=>{
        let t2 = d2.getTime();
        let t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }
    let tgHan = DateFiff(today,tgDuKien)
    // console.log(tgHan)
    const tenDon = data.tenYeuCau
    const nguoiGui = data.tenUser
    let status
    let xuly =""
    if(data.id_trangThai==1){
        xuly = `<a href="#" class="xu-ly" id_request='${data.id_request}'>Xử Lý</a>`
    }
    if(tgHan> 0){
        status = ` <p
        style="font-size: 10px;background: var(--primary);border-radius: 3px;padding: 3px;color: var(--light);">Còn 
        ${tgHan} ngày để hoàn thành</p>`
        if(quaHan){
            return ""
        }
    }else{
        if(quaHan && data.id_trangThai == 3){
            return ""
        }
        status = ` <p
        style="font-size: 10px;background: red;border-radius: 3px;padding: 3px;color: var(--light);">
        Quá hạn</p>`
    }
    if(data.id_trangThai == 4 || data.id_trangThai == 5 || data.id_trangThai == 6 || data.id_trangThai == 7 || data.id_trangThai == 8){
        status = status + ` <p
        style="font-size: 10px;background:#E0C3FC;border-radius: 3px;padding: 3px;color: var(--light);">Đã gửi lên phòng ${data.tenPhongBan}</p>`
    }else if(data.id_trangThai == 9 || data.id_trangThai == 10 || data.id_trangThai == 11 || data.id_trangThai == 12 || data.id_trangThai == 13){
        status = status+` <p
        style="font-size: 10px;background: #FBAB7E;border-radius: 3px;padding: 3px;color: var(--light);">Phòng ${data.tenPhongBan} trả về kết quả</p>`
        xuly = `<a href="#" class="hoan-thanh" id_request='${data.id_request}'>Thông báo tới sinh viên</a>`
    }else if(data.id_trangThai == 3){
        status =` <p
        style="font-size: 10px;background: black;border-radius: 3px;padding: 3px;color: var(--light);">
        Yêu cầu không đạt yêu cầu</p>`
    }else if(data.id_trangThai == 2){
        status =` <p
        style="font-size: 10px;background: #6DBC2F;border-radius: 3px;padding: 3px;color: var(--light);">
        Hoàn Thành</p>`
    }
    return `<div class="item" style="box-shadow: 2px 2px 6px;padding: 10px;border-radius: 5px;margin: 15px 0px;" idTrangThai='${data.id_trangThai}' urlFile='${data.urlFile}'>
    <div class="d-flex justify-content-between align-items-center">
        <h6>Yêu Cầu Từ:&nbsp;<span>${nguoiGui}</span></h6>
        <div style="height: 21px;">
           ${status}
        </div>
    </div>
    <div>
        <p style="text-overflow: ellipsis;"><strong>Đơn:&nbsp;</strong> ${tenDon}</p>
    </div>
    <div class="d-flex justify-content-between">
        <div>
            <p>${date}</p>
        </div>
        <div>${xuly}</div>
    </div>
    </div>`
}
components.mainCBMC = `<div class="col-xl-2" style="border-right: 2px solid var(--success) ;">
<div style="padding: 15px 0px;">
    <h5>Quản Lí Yêu Cầu</h5>
    <ul class="list-unstyled">
        <li class="item-menu active-item-menu" get="trangchu">Trang Chủ</li>
        <li class="item-menu" get="">Tất Cả Yêu Cầu</li>
        <li class="item-menu" get="1">Yêu Cầu Gửi Đến</li>
        <li class="item-menu" get="910111213">Kết Quả Trả Về</li>
        <li class="item-menu" get="2">Yêu Cầu Đã Xử Lý</li>
    </ul>
</div>
<div style="padding: 15px 0px;">
    <h5>Sinh Viên</h5>
    <ul class="list-unstyled">
        <li class="item-menu"><strong>Tất Cả Yêu Cầu Từ Sinh Viên</strong></li>
        <li style="padding: 5px;">Tình Trạng Yêu Cầu<ul class="list-unstyled"
                style="border-left: 2px solid var(--gray) ;">
                <li class="item-menu" get="45678">Yêu Cầu Đã Được Gửi Tới Các Phòng Ban Liên Quan</li>
                <li class="item-menu" get="3">Yêu Cầu Không Được Duyệt</li>
                <li class="item-menu" get="0">Yêu Cầu Quá Hạn</li>
            </ul>
        </li>
    </ul>
</div>
<div style="padding: 15px 0px;">
    <h5>Phòng Ban</h5>
    <ul class="list-unstyled">
        <li style="padding: 5px;"><strong>Kết Quả Từ Các Phòng Ban</strong>
            <ul class="list-unstyled" style="border-left: 2px solid var(--gray) ;">
                <li class="item-menu" get="9">Công Tác Sinh Viên</li>
                <li class="item-menu" get="10">Đào Tạo</li>
                <li class="item-menu" get="11">Cơ Sở Vật Chất</li>
                <li class="item-menu" get="12">Tài Chính Kế Toán</li>
                <li class="item-menu" get="13">Y Tế</li>
            </ul>
        </li>
    </ul>
</div>
</div>
<div class="col">
<div class="row" style="height: 100%;">
    <div class="col main-col-1" style="border-right: 2px dashed var(--success);overflow-y: scroll;height: 900px;">
        <div class="list-request">
        <div style="margin: 20px 0px;">
        <div style="background: linear-gradient(-62deg, var(--teal), var(--cyan)), var(--blue);">
            <h4 style="font-size: 21px;color: rgb(255,255,255);padding: 33px;">Xin chào chúc một ngày làm việc vui vẻ !!!</h4>
        </div>
        <div>
            <div>
                <p><strong>Thống kê:</strong></p>
            </div>
            <div style="height: 100px;box-shadow: 0px 0px 5px rgba(108,117,125,0.4);margin: 15px 0px;">
                <h1 class="d-flex justify-content-center align-items-center yeu-cau-tong" style="color: var(--purple);">40</h1>
                <p class="d-flex justify-content-center">YÊU CẦU</p>
            </div>
            <div style="height: 100px;box-shadow: 0px 0px 5px rgba(108,117,125,0.4);margin: 15px 0px;">
                <h1 class="d-flex justify-content-center align-items-center yeu-cau-xu-ly" style="color: var(--blue);">20</h1>
                <p class="d-flex justify-content-center">YÊU CẦU CẦN XỶ LÝ</p>
            </div>
            
        </div>
    </div>
        </div>
    </div>
    <div class="col main-col-2" style="height: 900px;">
        <div style="height: 100%;" class="file-request">
        <canvas id="myChart2" style="width:100%" height="400"></canvas>
        </div>
    </div>
</div>
</div>`
components.formXuLyYeuCau = (data) =>{
    let ghiChu =data[0].ghiChuSV
    return `<div style="margin: 20px 0px;">
    <div>
        <div>
            <h6>Yêu cầu của: ${data[0].tenUser}( <span style=" font-style: italic;">${data[0].tenYeuCau}-${data[0].tenPhongBan}</span>)</h6>
        </div>
    </div>
    <div style="margin: 20px 0px;">
        <div>
            <h6>Ghi chú( sinh viên):</h6>
            <div style="padding: 5px;background: rgb(255,255,255);border-radius: 5px;box-shadow: 2px 2px 2px rgba(33,37,41,0.4);height: 150px;">
                    ${ghiChu} 
            </div>
        </div>
    </div>
    <div>
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item"><a class="nav-link active" href="#datyeucau" data-toggle="tab"><strong>Đạt Yêu Cầu</strong></a></li>
            <li class="nav-item"><a class="nav-link" href="#khongdatyeucau" data-toggle="tab"><strong>Không Đạt Yêu Cầu</strong></a></li>
        </ul>
        <div class="tab-content">
            <div id="datyeucau" class="container tab-pane active">
                <div style="margin: 15px 0px;">
                    <h6>Ghi chú thêm:&nbsp;</h6><textarea class="ghi-chu-cbmc" style="width: 100%;height: 100px;border-radius: 6px;border: 1px solid var(--teal) ;"></textarea>
                </div>
                <div><button class="btn btn-success btn-dat-yeu-cau" type="button">Biểu Mẫu Đạt Yêu Cầu</button></div>
            </div>
            <div id="khongdatyeucau" class="container tab-pane fade">
                <div style="margin: 15px 0px;">
                    <h6>Ghi chú thêm:&nbsp;</h6><textarea class="ghi-chu-cbmc-2" style="width: 100%;height: 100px;border-radius: 6px;border: 1px solid var(--pink) ;"></textarea>
                </div>
                <div><button class="btn btn-danger btn-huy-yeu-cau" type="button">Biểu Mẫu Đạt Yêu Cầu</button></div>
            </div>
        </div>
    </div>
</div>`
}
components.formHoanThanh = (data)=>{
    return `<div style="margin: 20px 0px;">
    <div>
    <div>
        <h6>Yêu cầu của: ${data.tenUser}( <span style=" font-style: italic;">${data.tenYeuCau}-${data.tenPhongBan}</span>)</h6>
    </div>
    </div>
    <div>
        <div>
            <h6>Ghi chú( Cán Bộ Phòng ${data.tenPhongBan}):</h6>
            <p
                style="padding: 5px;background: rgb(255,255,255);border-radius: 5px;box-shadow: 2px 2px 2px rgba(33,37,41,0.4);height: 150px;">
                ${data.ghiChuCBPB}</p>
        </div>
    </div>
    <div><button class="btn btn-success btn-hoanthanh" type="button">Thông Báo Tới Sinh Viên</button></div>
</div>`
}
components.mainCBPB = ()=>{  
    return `<div class="container-fluid py-5">
    <header class="text-center text-black">
      <h3 class="title-room">Phòng Đào Tạo</h3>
    </header>
    <div class="row py-5">
      <div class="col-12 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <div class="table-responsive">
              <table id="yeu-cau-can-bo-phong-ban" style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Thời Hạn Yêu Cầu</th>
                    <th>Tên Đơn</th>
                    <th>Nội Dung</th>
                    <th>Người Gửi</th>      
                    <th>Xử Lý</th>        
                  </tr>
                </thead>
                <tbody class="list-yeu-cau-pb">

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>`
}
components.formXuLyCBPB = (data)=>{
   
    return `<div class="col col-xl-6 col-sm-2"
    style="height: 900px;border-style: none;border-right: 2px dashed var(--success) ;">
    <div style="margin: 20px 0px;padding: 0px 15px;">
        <div>
            <div>
                <h6>Ghi chú( sinh viên):</h6>
                <p
                    style="background: rgb(255,255,255);border-radius: 5px;box-shadow: 2px 2px 2px rgba(33,37,41,0.4);border-style: dashed;border-color: var(--gray-dark);padding: 5px;height: 150px;">
                    ${data.ghiChuSV}</p>
            </div>
        </div>
        <div>
            <div>
                <h6>Ghi chú( cán bộ một của):</h6>
                <p
                    style="background: rgb(255,255,255);border-radius: 5px;box-shadow: 2px 2px 2px rgba(33,37,41,0.4);border: 3px dashed var(--warning);padding: 5px;height: 150px;">
                    ${data.ghiChuCBMC}</p>
            </div>
        </div>
        <div style="margin: 15px 0px;">
            <h6>Ghi chú thêm:&nbsp;</h6><textarea
                style="width: 100%;height: 100px;border-radius: 6px;border: 1px solid var(--teal) ;" class="ghi-chu-cbpb"></textarea>
        </div>
        <div style="margin: 15px 0px;">
            <h6>Hẹn ngày sinh viên nhận:&nbsp;</h6>
            <div class="d-flex">
                <input class="form-control"  name="date-cbpb" type="date"></div>
        </div>
        <div class="d-flex justify-content-between"><button class="btn btn-success btn-hoanthanh" type="button">Gửi Kết
                Quả Đến Cán Bộ Một Cửa</button><button class="btn btn-danger btn-exit" type="button">Thoát</button>
        </div>
    </div>
</div>
<div class="col col-xl-6 col-sm-10" style="height: 900px;padding: 0px 15px;">
    <div style="height: 100%;" class='file-request'>

    </div>
</div>`
}