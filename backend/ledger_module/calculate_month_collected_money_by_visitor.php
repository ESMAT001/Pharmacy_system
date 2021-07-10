<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$date=$userData['date'];

$visitor_id=$userData['visitorId'];


$select_by_month=mysqli_query($con,"select sum(ledger_recipt_p.amount_recieved) as total from ledger_recipt_p where visitor_id='$visitor_id' and recipt_date like '$date"."-%"."'");


$total_amount=0;
foreach($select_by_month as $to){
$total_amount=$to['total'];
}
echo json_encode(array("total"=>$total_amount));



?>