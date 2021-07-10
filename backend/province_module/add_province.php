<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$province_name=$userData['provinceName'];

if(!empty($province_name)){

    $insert_into="insert into province(province_id,province_name) values(null,'$province_name')";
    
    if($con->query($insert_into)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));

    }


}








?>