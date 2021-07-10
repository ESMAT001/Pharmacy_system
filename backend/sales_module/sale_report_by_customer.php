<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);


$customer_id=$data['customerId'];

$select_table=mysqli_query($con,"select *,customer_p.address as customer_address,province.province_name as customer_province,nvl(floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))),0) as total_purchase from customer_p INNER join invoice_p on invoice_p.customer_id=customer_p.customer_id INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER JOIN medicine_p on medicine_p.medicine_id=invoice_medicine_list_p.medicine_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id INNER JOIN province on province.province_id=customer_p.province_id where customer_p.customer_id='$customer_id' GROUP by invoice_medicine_list_p.invoice_medicine_list_id order by total_purchase desc");

$list=array();
foreach($select_table as $sat){
    $list[]=$sat;
}


echo json_encode($list);











?>