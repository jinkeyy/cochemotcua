<?php
    include 'db_connection.php';
    $key = "1";
    if(isset($_REQUEST["key"])){
        if($_REQUEST["key"]==""){
            $key = "1";
        }else{
            $key = "id_trangThai = ".$_REQUEST["key"];
        }
    }
    $sql_query = "SELECT * FROM t_request INNER JOIN t_department ON t_department.id = t_request.phongTiepNhan INNER JOIN t_user ON t_user.id=t_request.id_nguoiGui WHERE ".$key;
    $result = mysqli_query($connect,$sql_query);
    $data = array();
    // if(mysqli_num_rows($result) > 0){
    //     while($r=mysqli_fetch_array($result)){
    //         array_push($data,array("id" => $r["id"] ,"tenFile" => $r["tenFile"],"urlFile" =>  $r["urlFile"],"ghiChu" => $r["ghiChu"],"tenPhongBan"=>$r["tenPhongBan"]));
    //     }
    //     echo json_encode($data,JSON_UNESCAPED_UNICODE);
    // }else{
    //     array_push($data,array("notification" => "Không có bản ghi nào" ));
    //     echo json_encode($data,JSON_UNESCAPED_UNICODE);
    // }
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $temp = array();
            foreach($row as $key => $value){
            $temp[$key] = $value;
            }
            array_push($data,$temp);
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }else{
        array_push($data,array("notification" => "Không có bản ghi nào" ));
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

?>