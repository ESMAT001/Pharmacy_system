<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$invoice_id=$userData['invoiceId'];

if(!empty($invoice_id)){

    
$select_invoice_items=mysqli_query($con,"select * from invoice_medicine_list_p INNER join medicine_p on medicine_p.medicine_id=invoice_medicine_list_p.medicine_id where invoice_medicine_list_p.invoice_id='$invoice_id'");
$result=array();
foreach($select_invoice_items as $si){

    $advantage_in_invoice=0;
    $disadvantage_in_invoice=0;

    $medicine_name=$si['product_name'];
    $generic_name=$si['generic_name'];
    $discount=$si['discount'];
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


if($cost_price===$sale_price){

}else if($sale_price > $cost_price){
    $total_profit=$sale_price-$cost_price;
    $total_pure_profit=$total_profit*$sale_pack_quantity_of_selected;
    $advantage_in_invoice=$total_pure_profit;

}else{

$total_loss=$cost_price-$sale_price;
$total_pure_loss=$total_loss*$sale_pack_quantity_of_selected;
$disadvantage_in_invoice=$total_pure_loss;

}


$result[]=array("product_name"=>$medicine_name,"generic_name"=>$generic_name,"sell_pack_quantity"=>$sale_pack_quantity_of_selected,"invoice_id"=>$invoice_id,"cost_price"=>$cost_price,"sell_price"=>$sale_price,"profit"=>$advantage_in_invoice,"loss"=>$disadvantage_in_invoice);



}



echo json_encode($result);








}














?>