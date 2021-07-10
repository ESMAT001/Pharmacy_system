<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);
$visitorId=$userData['visitorId'];
$date=$userData['date'];



$select_data=mysqli_query($con,"select sum(ledger_previous.amount_received) as total from ledger_previous where visitor_id='$visitorId' and ledger_previous.recipt_date like '$date"."-%"."'");

$total_paid=0;
foreach($select_data as $se){
$total_paid=$se['total'];
} 

echo json_encode(array("total"=>$total_paid));









?>