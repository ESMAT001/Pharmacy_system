<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);
$current_password=$userData['currentPassword'];
$new_password=$userData['newPassword'];

$current_password_encrypted=md5($current_password);
$new_password_encrypted=md5($new_password);


$count=mysqli_query($con,"select count(password) as count_password from users_p where password='$current_password_encrypted' and email='admin@gmail.com'");
$counter=0;
foreach($count as $co){
$counter=$co['count_password'];
}

if($counter>0){
    $update_user="update users_p set password='$new_password_encrypted' where email='admin@gmail.com' and password='$current_password_encrypted'";
    if($con->query($update_user)==TRUE){
    echo json_encode(array("status"=>"true"));

    }
}else{
    echo json_encode(array("status"=>"false"));
}








?>