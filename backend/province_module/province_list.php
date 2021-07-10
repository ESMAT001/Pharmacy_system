<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$select_province=mysqli_query($con,"select * from province order by province_name");



$result=array();

foreach($select_province as $sp){

    $result[]=$sp;
}

echo json_encode($result);






?>