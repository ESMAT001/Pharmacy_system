<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);



$selecting_medicines=mysqli_query($con,"select *,sum(medicine_information_p.packs_quantity-medicine_information_p.sold_quantity) as remain from medicine_p INNER join medicine_information_p on medicine_p.medicine_id=medicine_information_p.medicine_id where medicine_information_p.expire_date<CURRENT_DATE GROUP by medicine_information_p.medicine_info_id HAVING medicine_information_p.packs_quantity >medicine_information_p.sold_quantity");
$list=array();

foreach($selecting_medicines as $se){
    $list[]=$se;
}

echo json_encode($list);






?>