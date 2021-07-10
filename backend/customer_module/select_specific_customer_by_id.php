<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);

$customer_id=$userData['customerId'];



$select_customer_details=mysqli_query($con,"select * from customer_p where customer_id='$customer_id'");
$list=array();
foreach($select_customer_details as $se){
$list=$se;
}

echo json_encode($list);






?>