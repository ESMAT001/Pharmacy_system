<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$province=$data['province'];


$select_table=mysqli_query($con,"select *,customer_p.address as customer_address,province.province_name as customer_province,nvl(floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))),0) as total_purchase from customer_p INNER join invoice_p on invoice_p.customer_id=customer_p.customer_id INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join province on province.province_id=customer_p.province_id where customer_p.province_id='$province' GROUP by customer_p.customer_id order by total_purchase desc");

$result=array();
foreach($select_table as $st){
$result[]=$st;
}


echo json_encode($result);








?>