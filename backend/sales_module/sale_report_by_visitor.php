<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$visitor_id=$data['visitorId'];

$select_from_visitor=mysqli_query($con,"select *,customer_p.address as customer_address,province.province_name as customer_province,floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))) as total_of_sale from invoice_p INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id INNER JOIN medicine_p on medicine_p.medicine_id=invoice_medicine_list_p.medicine_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id INNER join province on province.province_id=customer_p.province_id where visitor_p.visitor_id='$visitor_id' GROUP by invoice_medicine_list_p.invoice_medicine_list_id order by total_of_sale desc");

$list=array();
foreach($select_from_visitor as $sf){
$list[]=$sf;

}


echo json_encode($list)


?>