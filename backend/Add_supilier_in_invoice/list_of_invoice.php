<?php


header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$select_invoice_list=mysqli_query($con,"select *,customer_p.address as customer_address,customer_p.phone_no as customer_phone,visitor_p.name as visitor_name,visitor_p.last_name as visitor_lastname from invoice_p inner join customer_p on customer_p.customer_id=invoice_p.customer_id INNER JOIN visitor_p on visitor_p.visitor_id=invoice_p.visitor_id inner join province on province.province_id=customer_p.province_id where invoice_p.supplier_id is null");
$list=array();
foreach($select_invoice_list as $se){
$list[]=$se;
}

echo json_encode($list);











?>