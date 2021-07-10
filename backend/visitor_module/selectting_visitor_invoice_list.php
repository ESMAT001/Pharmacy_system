<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);
$visitor_id=$userData['visitorId'];

$select_statement="select *,sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100))) as total_of_invoice from visitor_p INNER join invoice_p on visitor_p.visitor_id=invoice_p.visitor_id INNER JOIN customer_p on customer_p.customer_id=invoice_p.customer_id INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id where visitor_p.visitor_id='$visitor_id' and invoice_medicine_list_p.status='sold' GROUP by invoice_medicine_list_p.invoice_id ORDER by invoice_p.invoice_date desc";
$select=mysqli_query($con,$select_statement);
$list=array();
foreach($select as $se){
    $list[]=$se;
}


echo json_encode($list);



?>