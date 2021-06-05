let component = {}
component.mainSudent = `<div class="col-xl-12 col-sm-12" data-aos="fade-left">
<div class="bootstrap_datatables">
  <div class="container-fluid py-5">
    <header class="text-center text-black">
      <h3 class="">Danh sách biểu mẫu</h3>
    </header>
    <div class="row py-5">
      <div class="col-lg-12 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <div class="table-responsive">
              <table id="list-request" style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Loại Biểu Mẫu</th>
                    <th>Phòng Xử Lý</th>
                    <th>Tải Xuống</th>
                  </tr>
                </thead>
                <tbody class="list-request">
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
component.mainSendStudent = `
<div class="col" style="padding: 0px;">
    <div>
        <div class="d-flex d-xl-flex justify-content-center align-items-center" style="height: 50px;">
            <h4>Khởi tạo yêu cầu</h4>
        </div>
        <div class="row" style="margin: 1px;">
            <div class="col" style="padding: 0px 15px;">
                <div>
                    <div>
                        <form class="form-horizontal">
                            <div style="display: flex;justify-content: space-between;">
                                <div class="form-group">
                                    <label for="sel1">Phòng:</label>
                                    <select class="form-control select-pb" id="sel1" style="width: 80%">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="sel1">Biểu Mẫu:</label>
                                    <select class="form-control select-ten-don" id="sel1" style="width: 80%">

                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="sel3">Ghi chú:</label>
                                <textarea name="editor1" id="editor1" rows="8" cols="60" id="sel3" >
    </textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col" style="padding: 0xp 15px;">
                <div>
                    <div style="box-shadow: 1px 1px 3px;padding: 10px;border-radius: 2px;">
                        <h6>Yêu cầu của biểu mẫu:</h6>
                        <p class="yeu-cau-bieu-mau">- Đơn xin bảo lưu mẫu 12<br>- Xác nhận&nbsp;</p>
                    </div>
                </div>
                <div style="margin: 5px 0px;">
                    <div><label><strong>Tải Lên Biểu Mãu Bạn Cần Gửi:</strong></label>
                        <div><input type="file" name="file-send"</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div style="margin: 15px 0px;">
    <div style="padding: 0px 15px;"><button class="btn btn-primary btn-send-request" type="button"
            style="width: 160px;height: 50px;">Xác Nhận Gửi</button></div>
</div>
</div>`;
component.notLogged  = `<div class="container"><a class="navbar-brand font_hunre" href="" color="font_hunre"  style=" font-size: 1.5vw;"><img
src="assets/img/480px-HUNRE_Logo.png" style="width: 50px;" /> Hệ Thống Hỗ Trợ Quản Lý Cơ Chế Một Cửa
</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle
navigation</span><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="navcol-1">
<ul class="navbar-nav ml-auto">
<li class="nav-item"><button class="btn btn-primary btn-login btn-header " type="button" data-toggle="modal"
    data-target="#form-login">Đăng Nhập</button></li>
</ul>
</div>
</div>`
component.logged = `<div class="container"><a class="navbar-brand font_hunre" href="" color="font_hunre" style=" font-size: 1.5vw;"><img
src="assets/img/480px-HUNRE_Logo.png" style="width: 50px;" /> Hệ Thống Hỗ Trợ Quản Lý Cơ Chế Một Cửa
</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle
navigation</span><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="navcol-1">
<ul class="navbar-nav ml-auto">
<li class="nav-item"><button class="btn btn-primary btn-send-form btn-header " type="button">Gửi Biểu
    Mẫu</button></li>
<li class="nav-item dropdown"><a class="dropdown-toggle nav-link name-user" aria-expanded="false"
    data-toggle="dropdown" href="#">Tài Khoản</a>
  <div class="dropdown-menu"><a class="dropdown-item" href="#">Thông tin tài khoản</a><a data-toggle="modal"
      data-target="#form-change-password" class="dropdown-item" href="#">Đổi mật khẩu</a><a
      class="dropdown-item btn-logout" href="#">Đăng Xuất</a></div>
</li>
</ul>
</div>
</div>`