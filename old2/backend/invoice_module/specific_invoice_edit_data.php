<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);


// invoice_medicine_list_id:el.invoice_medicine_list_id,
//                                 pack_quantity:packQuantityRef.current.value,
//                                 sell_price:sellPriceRef.current.value,
//                                 discount:
$invoice_medicine_list_id=$data["invoice_medicine_list_id"];
$pack_quantity=$data["pack_quantity"];
$sell_price=$data["sell_price"];
$discount=$data["discount"];

$query="UPDATE `invoice_medicine_list_p` SET pack_quantity='$pack_quantity' , sell_price='$sell_price' , discount='$discount' WHERE invoice_medicine_list_id='$invoice_medicine_list_id' ";
$con->query($query);
// echo json_encode($con->error);

if ($con->error === "") {
    echo json_encode(array("status" => true));
} else {
    $response = array("status" => FALSE);
    echo json_encode($response);
}

$con->close();
