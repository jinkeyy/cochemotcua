<?php
    include 'db_connection.php';
        $sql_query = "SELECT COUNT(id_request) AS 'YeuCau' FROM t_request";
        $sql_query1 = "SELECT COUNT(id_request) AS 'YeuCauChuaXuLy' FROM t_request WHERE id_trangThai = 1";
        $sql_query2 = "SELECT COUNT(id_request) AS 'YeuCauDaXuLy' FROM t_request WHERE id_trangThai = 2";
        $sql_query3 = "SELECT COUNT(id_request) AS 'YeuCauBiHuy' FROM t_request WHERE id_trangThai = 3";
        $sql_query4 = "SELECT COUNT(id_request) AS 'YeuCauPB' FROM t_request WHERE id_trangThai = 4 OR id_trangThai = 5 OR id_trangThai = 6 OR id_trangThai = 7 OR id_trangThai = 8";
        $sql_query5 = "SELECT COUNT(id_request) AS 'YeuCauKQPB' FROM t_request WHERE id_trangThai = 9 OR id_trangThai = 10 OR id_trangThai = 11 OR id_trangThai = 12 OR id_trangThai = 13";
        $result = mysqli_query($connect,$sql_query);
        $result1 = mysqli_query($connect,$sql_query1);
        $result2 = mysqli_query($connect,$sql_query2);
        $result3 = mysqli_query($connect,$sql_query3);
        $result4 = mysqli_query($connect,$sql_query4);
        $result5 = mysqli_query($connect,$sql_query5);
        $data = array();
        $temp = array();
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                foreach($row as $key => $value){
                    $temp[$key] = $value;
                };
            }
        }else{
            $temp["YeuCau"]="0";     
        }
        if(mysqli_num_rows($result1) > 0){
            while($row = mysqli_fetch_assoc($result1)){
                foreach($row as $key => $value){
                    $temp[$key] = $value;
                }
            }
        }else{
            $temp["YeuCauChuaXuLy"]="0";     
        }
        if(mysqli_num_rows($result2) > 0){
            while($row = mysqli_fetch_assoc($result2)){
                foreach($row as $key => $value){
                    $temp[$key] = $value;
                }
            }
        }else{
            $temp["YeuCauDaXuLy"]="0";     
        }
        if(mysqli_num_rows($result3) > 0){
            while($row = mysqli_fetch_assoc($result3)){
                foreach($row as $key => $value){
                    $temp[$key] = $value;
                }
            }
        }else{
            $temp["YeuCauBiHuy"]="0";
        }
        if(mysqli_num_rows($result4) > 0){
            while($row = mysqli_fetch_assoc($result4)){
                foreach($row as $key => $value){
                    $temp[$key] = $value;
                }
            }
        }else{
            $temp["YeuCauPB"]="0";  
        }
        if(mysqli_num_rows($result5) > 0){
            while($row = mysqli_fetch_assoc($result5)){
                foreach($row as $key => $value){
                    $temp[$key] = $value;
                }
            
            }
        }else{
            $temp["YeuCauKQPB"]="0";     
        }
        array_push($data,$temp);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>