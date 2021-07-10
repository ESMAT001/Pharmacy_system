<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$visitor_id=$userData['visitorId'];
$paid_amount=$userData['amount'];
$recipt_no=$userData['reciptNo'];
$customer_id=$userData['customerId'];
$date=$userData['date'];






if(!empty($customer_id) && !empty($paid_amount)){
    $insert="insert into ledger_previous values(null,'$visitor_id','$paid_amount','$recipt_no','$customer_id','$date')";
    if($con->query($insert)===TRUE){
        echo json_encode(array("status"=>"true"));
    }
}








?>