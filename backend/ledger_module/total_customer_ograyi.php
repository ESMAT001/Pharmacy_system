<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);




$customer_id=$userData['customerId'];



$selecting_customer_list=mysqli_query($con,"select *,sum((invoice_medicine_list_p.sell_price-(invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount/100))*invoice_medicine_list_p.pack_quantity) as invoice_total from customer_p INNER JOIN invoice_p on customer_p.customer_id=invoice_p.customer_id INNER JOIN invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id INNER join ledger_recipt_p on ledger_recipt_p.customer_id=customer_p.customer_id where customer_p.customer_id='$customer_id' GROUP by ledger_recipt_p.recipt_id order by ledger_recipt_p.recipt_id asc");


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



$total_remain_previous=$total_of_previous;

$total_remain_from_new_invoices=$new_invoice_total;


$total_of_previos_and_new_invoices=$total_remain_previous+$total_remain_from_new_invoices;


$ledger_previous=mysqli_query($con,"select * from ledger_previous INNER join customer_p on customer_p.customer_id=ledger_previous.customer_id INNER join visitor_p on visitor_p.visitor_id=ledger_previous.visitor_id where ledger_previous.customer_id='$customer_id'");



$select_customer=mysqli_query($con,"select * from customer_p where customer_id='$customer_id'");

$customer_name="";
$customer_address="";
foreach($select_customer as $sc){
$customer_name=$sc['customer_name'];
$customer_address=$sc['address'];
}







$list=array();


$total_of_invoices=$total_of_previos_and_new_invoices;

foreach($ledger_previous as $lepg){
    $total_remain=$total_of_invoices-$lepg['amount_received'];
    $list[]=array("reciptDate"=>$lepg['recipt_date'],"amount_recieved"=>$lepg['amount_received'],"remain"=>$total_remain,"customer_name"=>$customer_name." " .$customer_address,"visitor"=>$lepg['name']." ".$lepg['last_name'],"total_of_invoices"=>$total_of_invoices);
    $total_of_invoices=$total_of_invoices-$lepg['amount_received'];
}





foreach($selecting_customer_list as $se){
    $total_remain=$total_of_invoices-$se['amount_recieved'];

    $list[]=array("reciptDate"=>$se['recipt_date'],"amount_recieved"=>$se['amount_recieved'],"remain"=>$total_remain,"customer_name"=>$customer_name." " .$customer_address,"visitor"=>$se['name']." ".$se['last_name'],"total_of_invoices"=>$total_of_invoices);
    $total_of_invoices=$total_of_invoices-$se['amount_recieved'];

}
echo json_encode($list);




?>