<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$customer_id=$userData['customerId'];

if(!empty($customer_id)){


$select_revieved_from_ledger=mysqli_query($con,"SELECT nvl(sum(ledger_recipt_p.amount_recieved),0) as total_received from ledger_recipt_p where ledger_recipt_p.customer_id='$customer_id'");

$received_amount_from_ledger=0;
foreach($select_revieved_from_ledger as $le){

$received_amount_from_ledger=$le['total_received'];
}



$new_invices=mysqli_query($con,"select nvl(floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))),0) as total from invoice_p INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id where invoice_p.customer_id='$customer_id'");

$new_invoice_total=0;

foreach($new_invices as $in){
    $new_invoice_total=$in['total'];
}


 
$select_previous=mysqli_query($con,"select nvl(sum(previous_account.amount),0) as total_previous from previous_account where previous_account.customer_id='$customer_id'");
    
$total_of_previous=0;
foreach($select_previous as $to){
$total_of_previous=$to['total_previous'];
}

$select_ledger_previous=mysqli_query($con,"select nvl(ledger_previous.recipt_date,0) as ledger_previous_date,nvl(sum(ledger_previous.amount_received),0) total_paid_previous from ledger_previous where customer_id='$customer_id'");
    
$total_paid_of_previous=0;
$date_of_paid_ledger_previous="";
foreach($select_ledger_previous as $le){
    $total_paid_of_previous=$le['total_paid_previous'];
    $date_of_paid_ledger_previous=$le['ledger_previous_date'];
}














$total_remain_previous=$total_of_previous-$total_paid_of_previous;

$total_remain_from_new_invoices=$new_invoice_total-$received_amount_from_ledger;


$total_of_previos_and_new_invoices=$total_remain_previous+$total_remain_from_new_invoices;

echo json_encode(array("previous_balance"=>$total_remain_previous,"new_invoices"=>$total_remain_from_new_invoices,"total_of_both"=>$total_of_previos_and_new_invoices));



}



?>