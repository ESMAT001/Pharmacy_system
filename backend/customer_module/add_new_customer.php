<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$customer_name=$userData['customerName'];
$customer_address=$userData['customerAddress'];
$customer_phone=$userData['customerPhone'];
$province_id=$userData['provinceId'];


if(!empty($customer_name) && !empty($province_id)){

    $insert_to_customer_table="insert into customer_p(customer_id,customer_name,address,phone_no,province_id,user_id) values(null,'$customer_name','$customer_address','$customer_phone','$province_id',1)";

    if($con->query($insert_to_customer_table)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{

        echo json_encode(array("status"=>"false"));

    }





}








?>