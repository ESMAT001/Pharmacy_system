<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$customer_id=$userData['customerId'];

if(!empty($customer_id)){


$select_customer_invoices=mysqli_query($con,"select * from invoice_p INNER join customer_p on customer_p.customer_id=invoice_p.customer_id where invoice_p.customer_id='$customer_id' order by invoice_p.invoice_id desc");
$invoice_lists=array();

foreach($select_customer_invoices as $so){

$invoice_id=$so['invoice_id'];
$invoice_date=$so['invoice_date'];
$visitor_id=$so['visitor_id'];
$supplier_id=$so['supplier_id'];




$select_total_sale_amount=mysqli_query($con,"select nvl(floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))),0) as total from invoice_medicine_list_p where invoice_id='$invoice_id'");

$total_of_invoice=0;

foreach($select_total_sale_amount as $st){
    $total_of_invoice=$st['total'];
}

$select_invoice_items=mysqli_query($con,"select * from invoice_medicine_list_p where invoice_medicine_list_p.invoice_id='$invoice_id'");

$advantage_in_invoice=0;
$disadvantage_in_invoice=0;

foreach($select_invoice_items as $si){
    $invoice_medicine_list_id=$si['invoice_medicine_list_id'];
    $sale_pack_quantity_of_selected=$si['pack_quantity'];

    $find_sell_price=mysqli_query($con,"select nvl(((invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100))),0) as sale_price from invoice_medicine_list_p where invoice_medicine_list_p.invoice_medicine_list_id='$invoice_medicine_list_id'");
    $sale_price=0;
    foreach($find_sell_price as $fo){

        $sale_price=$fo['sale_price'];
    }


    $cost_price=0;

    $select_cost_price=mysqli_query($con,"select medicine_information_p.cost_price as cost from invoice_medicine_list_p INNER join loose_stock_p on loose_stock_p.loose_stock_id=invoice_medicine_list_p.loose_stock_id INNER join medicine_information_p on loose_stock_p.medicine_information_id=medicine_information_p.medicine_info_id where invoice_medicine_list_p.invoice_medicine_list_id='$invoice_medicine_list_id'");
    foreach($select_cost_price as $cp){

        $cost_price=$cp['cost'];
    }

if($sale_price ===$cost_price){
    

}

else if($sale_price > $cost_price){
    

    $profit_price=$sale_price-$cost_price;
    $total_profit=$profit_price*$sale_pack_quantity_of_selected;
    $advantage_in_invoice=$advantage_in_invoice+$total_profit;

}else{
$total_profit=$cost_price-$sale_price;

$total_pure_profit=$total_profit*$sale_pack_quantity_of_selected;
$disadvantage_in_invoice=$disadvantage_in_invoice+$total_pure_profit;

}


}

$invoice_lists[]=array("invoice_id"=>$invoice_id,"total_of_invoice"=>$total_of_invoice,"advantage"=>$advantage_in_invoice,"disadvantage"=>$disadvantage_in_invoice,"visitor_id"=>$visitor_id,"supplier_id"=>$supplier_id,"invoice_date"=>$invoice_date);





}




echo json_encode($invoice_lists);





}









?>