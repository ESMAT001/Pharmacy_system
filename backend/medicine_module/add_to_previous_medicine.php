<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";
error_reporting(0);


$data=mysqli_query($con,"select * from medicine_p");
$list=array();
foreach($data as $da){
    array_push($list[$da['medicine_id']]= $da['product_name']);
    
  
}

echo json_encode($list);





?>