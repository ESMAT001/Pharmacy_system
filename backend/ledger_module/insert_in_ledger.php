<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$visitor_id=$userData['visitorId'];
$day=$userData['day'];
$customerId=$userData['customerId'];


$insert="insert into ledger_schedule_p values(null,'$customerId','$day','$visitor_id')";
if($con->query($insert)===TRUE){
    echo json_encode(array("status"=>"true"));
}










?>