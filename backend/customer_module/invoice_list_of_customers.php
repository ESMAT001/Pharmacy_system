<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$customer_id=$userData['customerId'];

$total_money_sql=mysqli_query($con,"select sum(ledger_recipt_p.amount_recieved) as total from ledger_recipt_p INNER JOIN customer_p on customer_p.customer_id=ledger_recipt_p.customer_id where customer_p.customer_id='$customer_id'");
$total_money_received_from_ledger=0;
foreach($total_money_sql as $to){
$total_money_received_from_ledger=$to['total'];
}

$list_of_invoices=mysqli_query($con,"select *,customer_p.address as customer_address,province.province_name as customer_province,visitor_p.name as visitor_name,visitor_p.last_name as visitor_last_name,sum((invoice_medicine_list_p.sell_price-(invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount/100))*invoice_medicine_list_p.pack_quantity) as invoice_total from customer_p INNER JOIN invoice_p on customer_p.customer_id=invoice_p.customer_id INNER JOIN invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id INNER join province on province.province_id=customer_p.province_id where customer_p.customer_id='$customer_id' GROUP by invoice_p.invoice_id");


$result=array();

foreach($list_of_invoices as $li){
    if($total_money_received_from_ledger>=$li['invoice_total']){
        $result[]=array("invoice_id"=>$li['invoice_id'],"customer_name"=>$li['customer_name'],"customer_address"=>$li['customer_address'],"book_page_no"=>$li['book_page_no'],"visitor_name"=>$li['visitor_name'],"visitor_lastname"=>$li['visitor_last_name'],"total_invoice"=>$li['invoice_total'],"remain"=>0,"paid_amount"=>$li['invoice_total'],"customer_province"=>$li['customer_province']);
        $total_money_received_from_ledger=($total_money_received_from_ledger-$li['invoice_total']);
    }elseif($total_money_received_from_ledger<$li['invoice_total']){
        $result[]=array("invoice_id"=>$li['invoice_id'],"customer_name"=>$li['customer_name'],"customer_address"=>$li['customer_address'],"book_page_no"=>$li['book_page_no'],"visitor_name"=>$li['visitor_name'],"visitor_lastname"=>$li['visitor_last_name'],"total_invoice"=>$li['invoice_total'],"remain"=>($li['invoice_total']-$total_money_received_from_ledger),"paid_amount"=>$total_money_received_from_ledger,"customer_province"=>$li['customer_province']);
        
            $total_money_received_from_ledger=0;
        
        
    
    }


}




echo json_encode($result);





?>