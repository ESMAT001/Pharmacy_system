<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$select=mysqli_query($con,"SELECT *,customer_p.address as customer_address,province.province_name as customer_province from customer_p INNER join ledger_previous on customer_p.customer_id=ledger_previous.customer_id inner join visitor_p on visitor_p.visitor_id=ledger_previous.visitor_id INNER join province on province.province_id=customer_p.province_id order by ledger_previous.recipt_date desc");
$list=array();
foreach($select as $se){
$list[]=$se;
}

echo json_encode($list);






?>