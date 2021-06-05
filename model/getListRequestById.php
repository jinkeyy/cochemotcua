<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id = $_REQUEST["id"];
        $sql_query = "SELECT * FROM t_request INNER JOIN t_department ON t_department.id = t_request.phongTiepNhan INNER JOIN t_user ON t_user.id=t_request.id_nguoiGui WHERE id_request = ".$id;
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
    }

?>