<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);



$customer_id=$userData['customerId'];

$select_total=mysqli_query($con,"select sum(previous_account.amount) as total from previous_account where customer_id='$customer_id'");
$total_previous=0;
foreach($select_total as $se){
$total_previous=$se['total'];
}


$select_paid=mysqli_query($con,"select sum(ledger_previous.amount_received) as paid from ledger_previous where customer_id='$customer_id'");
$paid=0;
foreach($select_paid as $pa){
    $paid=$pa['paid'];
}

echo json_encode(array("total"=>$total_previous,"paid"=>$paid,"remain"=>$total_previous-$paid));


?>