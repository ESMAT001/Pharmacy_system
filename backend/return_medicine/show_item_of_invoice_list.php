<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$userData = json_decode(file_get_contents("php://input"),true);

$invoice_medicine_list_id=$userData['invoiceMedicineListId'];


$select_all=mysqli_query($con,"select *,sum(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)) as sell_price_after_discount from invoice_medicine_list_p INNER JOIN invoice_p on invoice_p.invoice_id=invoice_medicine_list_p.invoice_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id inner join medicine_p on medicine_p.medicine_id=invoice_medicine_list_p.medicine_id where invoice_medicine_list_p.invoice_medicine_list_id='$invoice_medicine_list_id'");

$result=array();

foreach($select_all as $se){

$result=$se;
}


echo json_encode($result);








?>