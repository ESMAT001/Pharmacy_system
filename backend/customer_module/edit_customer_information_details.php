<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$customer_id=$userData['customerId'];
$customer_name=$userData['customerName'];
$customer_phone_no=$userData['phoneNo'];
$address=$userData['address'];
$province=$userData['province'];

if(!empty($customer_id)){
    $update_data="update customer_p set customer_name='$customer_name',address='$address',phone_no='$customer_phone_no',province_id='$province' where customer_id='$customer_id'";
    if($con->query($update_data)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));
        
    }
}











?>