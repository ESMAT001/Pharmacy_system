<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$date=$userData['date'];


$select_total=mysqli_query($con,"select sum(previous_account.amount) as total from previous_account");
$total_previous=0;
foreach($select_total as $se){
$total_previous=$se['total'];
}


$select_paid=mysqli_query($con,"select sum(ledger_previous.amount_received) as paid from ledger_previous where recipt_date like '$date"."-%"."'");
$paid=0;
foreach($select_paid as $pa){
    $paid=$pa['paid'];
}


$select_left_amout=mysqli_query($con,"select sum(ledger_previous.amount_received) as paid from ledger_previous");
$left_amount=0;

foreach($select_left_amout as $sl){
    $left_amount=$sl['paid'];
}
$total_remain=$total_previous-$left_amount;

echo json_encode(array("total"=>$total_previous,"paid"=>$paid,"remain"=>$total_remain));


?>