<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$date=$userData['date'];


$total_sell=mysqli_query($con,"select sum(ledger_recipt_p.amount_recieved) as total_amount from ledger_recipt_p where ledger_recipt_p.recipt_date='$date'");
$total_sell_money=0;
foreach($total_sell as $to){
$total_sell_money=$to['total_amount'];
}

echo json_encode(array("total_ledger"=>$total_sell_money));








?>