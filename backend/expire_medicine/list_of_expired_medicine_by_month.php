<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$date=$userData['date'];




$select_all_data=mysqli_query($con,"SELECT * FROM expire_medicines_p INNER join medicine_information_p on medicine_information_p.medicine_info_id=expire_medicines_p.medicine_information_id INNER join medicine_p on medicine_p.medicine_id=expire_medicines_p.medicine_id where expire_medicines_p.transfer_date like '$date"."-%"."'");


$list=array();
foreach($select_all_data as $se){
    $list[]=$se;
}

echo json_encode($list);








?>