<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$date=$userData['date'];

$select_total=mysqli_query($con,"select sum(cost_price*packs_quantity) as total from medicine_information_p where medicine_information_p.entry_date like '$date"."%"."'");
$total=0;
foreach($select_total as $to){
 $total=$to['total'];
}
echo json_encode(array("total_bo"=>$total));













?>