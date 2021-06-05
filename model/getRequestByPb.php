<?php
    include 'db_connection.php';
    $key = $_REQUEST["key"];
    $sql_query= 'SELECT t_file.id,tenFile,urlFile,ghiChu,t_department.tenPhongBan FROM t_file INNER JOIN t_department ON t_file.id_phongban = t_department.id where tenPhongBan = "'.$key.'"';
    $result = mysqli_query($connect,$sql_query);
    $data = array();
    if(mysqli_num_rows($result) > 0){
        while($r=mysqli_fetch_array($result)){
            array_push($data,array("id" => $r["id"] ,"tenFile" => $r["tenFile"],"urlFile" =>  $r["urlFile"],"ghiChu" => $r["ghiChu"],"tenPhongBan"=>$r["tenPhongBan"]));
            
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }else{
        array_push($data,array("notification" => "null" ));
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
?>