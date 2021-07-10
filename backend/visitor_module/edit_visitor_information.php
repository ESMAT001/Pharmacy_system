<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);
$visitor_name=$userData['visitorName'];
$visitor_last_name=$userData['visitorLastName'];
$visitor_phone_no=$userData['phoneNo'];
$visitor_id=$userData['visitorId'];
$visitor_address=$userData['address'];
$visitor_province=$userData['province'];


if(!empty($visitor_id)){

    $update_visitor="update visitor_p set name='$visitor_name',last_name='$visitor_last_name',phone_no='$visitor_phone_no',address='$visitor_address',province='$visitor_province' where visitor_id='$visitor_id'";
    if($con->query($update_visitor)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));

    }


}





?>