<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$ids = json_decode(file_get_contents("php://input"),true);

include "../config.php";
$data=array();
for ($i=0; $i < count($ids); $i++) { 
    $medId=intval($ids[$i]);
    $query="SELECT product_name FROM `medicine_p` WHERE medicine_id='$medId'";
    $result = $con->query($query);
    $result = $result->fetch_assoc();
    $productName= $result['product_name'];
    array_push($data,array("product_name"=>$productName,"medicine_id"=>$medId));
}


echo json_encode(array("status"=>true,"data"=>$data));




?>