<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);



$customer_id=$userData['customerId'];


$select_customer_previous=mysqli_query($con,"select sum(amount) as total from previous_account where customer_id='$customer_id'");

$previous_amount=0;
foreach($select_customer_previous as $pe){
    $previous_amount=$pe['total'];
}

$select_payments=mysqli_query($con,"select sum(ledger_previous.amount_received) as paid from ledger_previous where customer_id='$customer_id'");

$paid_amount=0;
foreach($select_payments as $se){
    $paid_amount=$se['paid'];
}

echo json_encode(array("remain"=>$previous_amount-$paid_amount))

?>