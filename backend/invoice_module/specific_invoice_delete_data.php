<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);



$select_loose_stock_id=mysqli_query($con,"select loose_stock_id,pack_quantity from invoice_medicine_list_p where invoice_medicine_list_id='$data'");
$loose_stock_id=0;
$pack_quantity=0;
foreach($select_loose_stock_id as $se){
$loose_stock_id=$se['loose_stock_id'];
$pack_quantity=$se['pack_quantity'];
}

$select_status=mysqli_query($con,"select status from loose_stock_p where loose_stock_id='$loose_stock_id'");
$loose_stock_status="";
foreach($select_status as $se){
$loose_stock_status=$se['status'];
}
if($loose_stock_status==="added"){
    $update_loose_stock="update loose_stock_p set sold_quantity=sold_quantity-'$pack_quantity' where loose_stock_id='$loose_stock_id'";
    if($con->query($update_loose_stock)===TRUE){
        $delete_from_invoice="delete from invoice_medicine_list_p where invoice_medicine_list_id='$data'";
        if($con->query($delete_from_invoice)===TRUE){
            echo json_encode(array("status"=>"true"));
        }
    }

}elseif($loose_stock_status==="sold out"){
    $update_loose_stock="update loose_stock_p set sold_quantity=sold_quantity-'$pack_quantity',status='added' where loose_stock_id='$loose_stock_id'";
    if($con->query($update_loose_stock)===TRUE){
        $delete_from_invoice="delete from invoice_medicine_list_p where invoice_medicine_list_id='$data'";
        if($con->query($delete_from_invoice)===TRUE){
            echo json_encode(array("status"=>"true"));
        }
    } 

}






$con->close();
