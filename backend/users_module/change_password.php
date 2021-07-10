<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$email=$userData['email'];
$new_password=$userData['newPassword'];
$current_password=$userData['currentPassword'];

$current_password_encrypted=md5($current_password);
$new_password_encrypted=md5($new_password);


$select_user=mysqli_query($con,"select count(user_id) as total from users_p where email='$email' and password='$current_password_encrypted'");
$user_count=0;
foreach($select_user as $se){
$user_count=$se['total'];
}
if($user_count>0){

    $update="update users_p set password='$new_password_encrypted' where email='$email' and password='$current_password_encrypted'";
    if($con->query($update)===TRUE){
        echo json_encode(array("status"=>"true"));
    }

}else{
    echo json_encode(array("status"=>"problem"));
}








?>