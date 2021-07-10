<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$date=$userData['date'];

$select_total=mysqli_query($con,"SELECT sum(expire_medicines_p.quantity*medicine_information_p.cost_price) as total,sum(expire_medicines_p.quantity) as quantity from expire_medicines_p INNER join medicine_information_p on expire_medicines_p.medicine_information_id=medicine_information_p.medicine_info_id where expire_medicines_p.transfer_date like '$date"."-%"."'");
$qunatity=0;
$total=0;
foreach($select_total as $se){
    $total=$se['total'];
    $qunatity=$se['quantity'];
}
echo json_encode(array("total"=>$total,"quantity"=>$qunatity));



?>