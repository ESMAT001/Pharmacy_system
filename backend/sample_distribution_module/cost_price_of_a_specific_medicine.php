<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$medId = json_decode(file_get_contents("php://input"),true);

$query = "SELECT cost_price FROM `medicine_information_p` WHERE medicine_id='$medId'";
$result = $con->query($query);
$result = $result->fetch_assoc();
$cost_price = $result['cost_price'];

if($con->error !=""){
 echo json_encode($con->error);
}else{
    echo json_encode(array("status"=>true,"cost_price"=>$cost_price));
}
