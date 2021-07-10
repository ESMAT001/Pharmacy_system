<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$province_id=$userData['provinceId'];
$province_name=$userData['provinceName'];

if(!empty($province_id)){
    $update_province="update province set province_name='$province_name' where province_id='$province_id'";

    if($con->query($update_province)===TRUE){
    
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));
    
    }

}









?>