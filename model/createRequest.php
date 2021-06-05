<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $tenYeuCau = $_REQUEST["tenYeuCau"];
        $idNguoiGui = $_REQUEST["idNguoiGui"];
        $urlFile = $_REQUEST["urlFile"];
        $tgGui = strval($_REQUEST["tgGui"]);
        $ghiChuSv = $_REQUEST["ghiChuSv"];
        $phongTiepNhan = $_REQUEST["phongTiepNhan"];
        $sql_query= "insert into t_request(tenYeuCau,id_nguoiGui,id_trangThai,tgGui,ghiChuSV,urlFile,phongTiepNhan) values('".$tenYeuCau."','".$idNguoiGui."',1,'".$tgGui."','".$ghiChuSv."','".$urlFile."','".$phongTiepNhan."')";

        $a = array();
        try {
            mysqli_query($connect,$sql_query);
            array_push($a,array("notification" => "true"));
            echo json_encode($a,JSON_UNESCAPED_UNICODE);
          }
        catch (Exception $e) {
            array_push($a,array("notification" => "false"));
            echo json_encode($a,JSON_UNESCAPED_UNICODE);
        }
    }
?>