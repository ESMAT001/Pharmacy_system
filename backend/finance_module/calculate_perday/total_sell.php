<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$date=$userData['date'];
$total_sell=mysqli_query($con,"select floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))) as total_sell from invoice_p INNER JOIN invoice_medicine_list_p on invoice_p.invoice_id=invoice_medicine_list_p.invoice_id where invoice_p.invoice_date='$date'");
$total_sell_money=0;
foreach($total_sell as $to){
$total_sell_money=$to['total_sell'];
}

echo json_encode(array("total_sell"=>$total_sell_money));






?>