<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $tenFile = $_REQUEST["tenFile"];
        $ghiChuFile = $_REQUEST["ghiChuFile"];
        $urlFile = $_REQUEST["urlFile"];
        $phongBan = $_REQUEST["idPhongBan"];
        $sql_query= "insert into t_file(tenFile,urlFile,ghiChu,id_phongban) values('".$tenFile."','".$urlFile."','".$ghiChuFile."',".$phongBan.")";
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