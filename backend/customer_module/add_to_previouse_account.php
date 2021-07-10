<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$customer_id=$userData['customerId'];
$amount=$userData['amount'];
$description=$userData['description'];
$today_date=date("Y-m-d");
if(!empty($customer_id) && !empty($amount)){
   $insert="insert into previous_account(previos_account_id,customer_id,amount,entry_date,description) values(null,'$customer_id','$amount','$today_date','$description')";
   if($con->query($insert)){
       echo json_encode(array("status"=>"true"));
   }
}


























?>