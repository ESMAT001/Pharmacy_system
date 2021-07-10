<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);

$customer_id=$userData['customerId'];

$total_of_bills=mysqli_query($con,"select nvl(floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))),0) as total from invoice_p INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id where invoice_p.customer_id='$customer_id'");

$total_amount=0;
foreach($total_of_bills as $to){
 $total_amount=$to['total'];
}


$select_paid=mysqli_query($con,"select nvl(sum(ledger_recipt_p.amount_recieved),0) as paid from ledger_recipt_p WHERE customer_id='$customer_id'");

$total_paid=0;
foreach($select_paid as $pa){
    $total_paid=$pa['paid'];
}


$select_return=mysqli_query($con,"select nvl(sum((sell_price-return_price)*return_quantity),0) as total_from_return_medicine from return_medicine_p where customer_id='$customer_id' and return_price <sell_price");

$total_return=0;
foreach($select_return as $sr){
    $total_return=$sr['total_from_return_medicine'];
}










$remain_amount=$total_amount-$total_paid;


echo json_encode(array("total_amount"=>$total_amount,"total_paid"=>$total_paid,"remain_amount"=>$remain_amount,"total_return"=>$total_return));







?>