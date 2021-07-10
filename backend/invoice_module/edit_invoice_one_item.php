<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$invoice_information_id=$userData['invoiceInformationMedicineId'];
$discount=$userData['discount'];
$pack_quanity=$userData['packQuantity'];
$sell_price=$userData['sellPrice'];

$total_medicine_ordered=0;
$select_medicine_qunatity=mysqli_query($con,"select pack_quantity as quantity  from invoice_medicine_list_p where invoice_medicine_list_p.invoice_medicine_list_id='$invoice_information_id'");
foreach($select_medicine_qunatity as $to){
    $total_medicine_ordered=$to['quantity'];
}

if($pack_quanity===$total_medicine_ordered){
    $update_when_equal_quantity="update invoice_medicine_list_p set sell_price='$sell_price',discount='$discount' where invoice_medicine_list_id='$invoice_information_id'";
    if($con->query($update_when_equal_quantity)===TRUE){
        echo json_encode(array("status"=>"true"));
    }
}elseif($pack_quanity<$total_medicine_ordered){
$loose_stock_id=0;
$select_loose=mysqli_query($con,"select loose_stock_id from invoice_medicine_list_p where invoice_medicine_list_id='$invoice_information_id'");
foreach($select_loose as $se){
$loose_stock_id=$se['loose_stock_id'];

}
$select_status=mysqli_query($con,"select status from loose_stock_p where loose_stock_id='$loose_stock_id'");
$status="";
foreach($select_status as $se){
    $status=$se['status'];
}

if($status==="added"){
    $sold_qunantity_update=$total_medicine_ordered-$pack_quanity;
$update_loose_stock="update loose_stock_p set sold_quantity=sold_quantity-'$sold_qunantity_update' where loose_stock_id='$loose_stock_id'";
if($con->query($update_loose_stock)===TRUE){
$update_invoice_medicine_list="update invoice_medicine_list_p set pack_quantity='$pack_quanity',sell_price='$sell_price',discount='$discount' where invoice_medicine_list_id='$invoice_information_id'";
if($con->query($update_invoice_medicine_list)===TRUE){
    echo json_encode(array("status"=>"true"));
}

}

}elseif($status==="sold out"){

    $sold_qunantity_update=$total_medicine_ordered-$pack_quanity;
$update_loose_stock="update loose_stock_p set sold_quantity=sold_quantity-'$sold_qunantity_update',status='added' where loose_stock_id='$loose_stock_id'";
if($con->query($update_loose_stock)===TRUE){
$update_invoice_medicine_list="update invoice_medicine_list_p set pack_quantity='$pack_quanity',sell_price='$sell_price',discount='$discount' where invoice_medicine_list_id='$invoice_information_id'";
if($con->query($update_invoice_medicine_list)===TRUE){
    echo json_encode(array("status"=>"true"));
}

}

}



}elseif($pack_quanity>$total_medicine_ordered){
   echo json_encode(array("status"=>"out_of_qunatity"));
}







?>