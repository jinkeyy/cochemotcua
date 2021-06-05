<?php
    include 'db_connection.php';
    $sql_query = "SELECT * FROM t_request INNER JOIN t_department ON t_department.id = t_request.phongTiepNhan INNER JOIN t_user ON t_user.id=t_request.id_nguoiGui WHERE id_trangthai = 9 or id_trangthai = 10 or id_trangthai = 11 or id_trangthai = 12 or id_trangthai = 13";
    $result = mysqli_query($connect,$sql_query);
    $data = array();
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