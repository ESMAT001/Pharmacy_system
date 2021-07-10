<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$date=$userData['date'];


$select=mysqli_query($con,"select sum(amount_recieved) as total from ledger_recipt_p where ledger_recipt_p.recipt_date like '$date"."-%"."'");


$total=0;
foreach($select as $se){
$total=$se['total'];
}
echo json_encode(array("total"=>$total));




?>