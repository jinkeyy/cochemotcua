<?php
    include 'db_connection.php';
    $sql_query= 'SELECT * FROM t_department';    
    $result = mysqli_query($connect,$sql_query);
    $data = array();
    if(mysqli_num_rows($result) > 1){
        while($r=mysqli_fetch_array($result)){
            array_push($data,array("id" => $r["id"] ,"tenPhongBan" => $r["tenPhongBan"]));  
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }else{
        array_push($data,array("notification" => "Không có bản ghi nào" ));
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
?>