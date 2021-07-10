<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$select_medicine=mysqli_query($con,"select *,medicine_p.medicine_id as real_id from medicine_p left outer join sale_price_of_medicine on sale_price_of_medicine.medicine_id=medicine_p.medicine_id");

$result=array();
foreach($select_medicine as $sa){
    $result[]=$sa;
}

echo json_encode($result);



?>