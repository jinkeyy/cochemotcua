<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $email = $_REQUEST["email"];
        $password = $_REQUEST["password"];
        $sql_query= "select * from t_user where email='".$email."' AND matKhau='".$password."'";
        $result = mysqli_query($connect,$sql_query);
        $a = array();
        if(mysqli_num_rows($result) == 1){
            $r = mysqli_fetch_array($result);
            if($r["quyen"]!="Sinh Viên"){
                array_push($a,array("id" => $r["id"] ,"tenUser" => $r["tenUser"],"quyen" => $r["quyen"]));
                echo json_encode($a,JSON_UNESCAPED_UNICODE);
            }else{
                array_push($a,array("notification" => "false"));
                echo json_encode($a,JSON_UNESCAPED_UNICODE);
            }
        }else{
            array_push($a,array("notification" => "false"));
            echo json_encode($a,JSON_UNESCAPED_UNICODE);
        }
    }
?>