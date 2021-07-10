<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);




$select_customers=mysqli_query($con,"select * from customer_p INNER join province on province.province_id=customer_p.province_id WHERE customer_p.province_id <> (SELECT province_id from province where province.province_name='kabul')");

$result=array();

foreach($select_customers as $sp){
    $result[]=$sp;
}

echo json_encode($result);









?>