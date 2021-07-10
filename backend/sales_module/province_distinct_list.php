<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$select_province=mysqli_query($con,"select DISTINCT(province) from customer_p");

$result=array();
foreach($select_province as $sp){
$result[]=$sp;
}
echo json_encode($result);









?>