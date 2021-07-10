<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);
$date=$userData['date'];
$visitor_id=$userData['visitorId'];



$select_total_of_all_bills=mysqli_query($con,"select sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100))) as total_of_all_bills from visitor_p INNER JOIN invoice_p on visitor_p.visitor_id=invoice_p.visitor_id INNER JOIN invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id where visitor_p.visitor_id='$visitor_id' and invoice_p.invoice_date LIKE '$date"."-%"."'");
$total=0;
foreach($select_total_of_all_bills as $sa){
 $total=$sa['total_of_all_bills'];
}

echo json_encode(array("total"=>$total));

?>