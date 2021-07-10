<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);




$email=$userData['email'];
if($email==="admin@gmail.com"){
    echo json_encode(array("status"=>"unable"));
}else{
    $delete="delete from users_p where email='$email'";
    if($con->query($delete)){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));
        
    }
}






?>