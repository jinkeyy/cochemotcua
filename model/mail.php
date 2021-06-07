<?php
require "../model/PHPMailer/src/PHPMailer.php";
require "../model/PHPMailer/src/Exception.php";
require  "../model/PHPMailer/src/SMTP.php";

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$nguoinhan = $_REQUEST["nguoinhan"];
$noidung = $_REQUEST["noidung"];
try {
    $mail->isSMTP();  
    $mail->CharSet  = "utf-8";
    $mail->Host = 'smtp.gmail.com';  //SMTP servers
    $mail->SMTPAuth = true; // Enable authentication
    $nguoigui = 'taigameorg662@gmail.com';
    $matkhau = 'lienha66';
    $tennguoigui = 'Hệ thống cơ chế một cửa';
    $mail->Username = $nguoigui; // SMTP username
    $mail->Password = $matkhau;   // SMTP password
    $mail->SMTPSecure = 'ssl';  // encryption TLS/SSL 
    $mail->Port = 465;  // port to connect to                
    $mail->setFrom($nguoigui, $tennguoigui ); 
    $to = $nguoinhan;
    $to_name = "Tên người nhận";
    
    $mail->addAddress($to, $to_name); //mail và tên người nhận  
    $mail->isHTML(true);  // Set email format to HTML
    $mail->Subject = 'Gửi thư từ Hệ Thống Cơ Chế Một cửa';      
    $noidungthu = $noidung ;
    $mail->Body = $noidungthu;
    $mail->smtpConnect( array(
        "ssl" => array(
            "verify_peer" => false,
            "verify_peer_name" => false,
            "allow_self_signed" => true
        )
    ));
    $mail->send();
    echo 'true';
} catch (Exception $e) {
    echo 'false';
}