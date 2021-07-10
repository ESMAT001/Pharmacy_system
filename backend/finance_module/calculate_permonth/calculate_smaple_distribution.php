<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$date=$userData['date'];

$select=mysqli_query($con,"SELECT  sum(sample_distribution_p.quantity*medicine_information_p.cost_price) as total from sample_distribution_p INNER JOIN medicine_information_p on medicine_information_p.medicine_info_id=sample_distribution_p.medicine_information_id where sample_distribution_p.dis_date like '$date"."-%"."'");

$total=0;
foreach($select as $se){
    $total=$se['total'];
}

echo json_encode(array("total"=>$total));

?>