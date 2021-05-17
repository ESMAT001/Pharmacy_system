<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

$data = json_decode(file_get_contents("php://input"),true);
$email=$data['email'];
$password=$data['password'];
$password_encrypted=md5($password);


include "../config.php";
$users=mysqli_query($con,"select * from users_p where email='$email' and password='$password_encrypted'");
if(mysqli_num_rows($users)>0){
    $response_message=array("status"=>"true");
    echo json_encode($response_message);
}else{
    $response_message=array("status"=>"false");
    echo json_encode($response_message);
}


?>