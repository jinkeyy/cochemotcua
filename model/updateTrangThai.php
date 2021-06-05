<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id = $_REQUEST["id_request"];
        $trangThaiMoi = $_REQUEST["trangThaiMoi"];
        $ghiChuCBMC = $_REQUEST["gcCBMC"];
        $sql_query = "UPDATE t_request SET id_trangThai ='".$trangThaiMoi."',ghiChuCBMC = '".$ghiChuCBMC."'  WHERE id_request = ".$id;
        mysqli_query($connect,$sql_query);
        $data = array();
        try {
            mysqli_query($connect,$sql_query);
            array_push($data,array("notification" => "true"));
            echo json_encode($data,JSON_UNESCAPED_UNICODE);
          }
        catch (Exception $e) {
            array_push($data,array("notification" => "false"));
            echo json_encode($data,JSON_UNESCAPED_UNICODE);
        }
    }
?>