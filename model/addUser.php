<?php
    include 'db_connection.php';
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $ma = $_REQUEST["maUser"];
        $tenUser = $_REQUEST["tenUser"];
        $email = $_REQUEST["emailUser"];
        $matKhau = $_REQUEST["matKhauUser"];
        $quyen = $_REQUEST["quyenUser"];
        $sql_query= "insert into t_user(ma,tenUser,email,matKhau,quyen) values('".$ma."','".$tenUser."','".$email."','".$matKhau."','".$quyen."')";

        $a = array();
        $sql_check = "SELECT * FROM t_user WHERE ma = '".$ma."'";
        $check = mysqli_query($connect,$sql_check);
        $sql_check1 = "SELECT * FROM t_user WHERE email = '".$email."'";
        $check1 = mysqli_query($connect,$sql_check1);
        if(mysqli_num_rows($check1) > 0){
            array_push($a,array("notification" => "trung"));
            echo json_encode($a,JSON_UNESCAPED_UNICODE);
        }else{
            if(mysqli_num_rows($check) > 0){
                array_push($a,array("notification" => "trung"));
                echo json_encode($a,JSON_UNESCAPED_UNICODE);
            }else{
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
        }

    }
?>