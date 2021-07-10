<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['invoice_medicine_list_id'];
$returnedQuantity = intval($data['returnedQuantity']);

echo json_encode($id);
echo json_encode($returnedQuantity);

$query = "SELECT * from invoice_medicine_list_p WHERE invoice_medicine_list_id = '$id'";

$result = $con->query($query);
$result = $result->fetch_assoc();
$quantity = $result['pack_quantity'];
$medicine_id = $result['medicine_id'];
$sell_price = $result['sell_price'];
$discount = $result['discount'];
$invoice_id = $result['invoice_id'];
$status = 'sold';

echo json_encode($quantity);
echo json_encode($invoice_id);

if ($returnedQuantity == intval($quantity)) {
    echo json_encode("if");
    $query = "UPDATE 'invoice_medicine_list_p' SET status='returned' WHERE invoice_medicine_list_id = '$id'";
    $con->query($query);
} else if($returnedQuantity <= intval($quantity)) {
    echo json_encode("else if");
    $query = "UPDATE 'invoice_medicine_list_p' SET status='returned' pack_quantity='$returnedQuantity' WHERE invoice_medicine_list_id = '$id'";
    $con->query($query);
    $finalRes = $quantity - $returnedQuantity;
    $query = "INSERT INTO 'invoice_medicine_list_p' VALUES (default,'$medicine_id','$finalRes','$sell_price','$discount','$invoice_id','$status')";
    $con->query($query);
}

$query = "SELECT * FROM `invoice_p` WHERE invoice_id='$invoice_id'";
$resultIn = $con->query($query);
$resultIn = $resultIn->fetch_assoc();

$invoice_date = $resultIn['invoice_date'];

$query = "UPDATE `invoice_p` SET total_amount=total_amount-'$returnedQuantity'  WHERE invoice_id='$invoice_id' ";
$con->query($query);


$query = "SELECT * FROM `loose_stock_p` WHERE  DATE(loose_stock_date)=DATE('$invoice_date') AND medicine_id='$medicine_id'";

$resultIn = $con->query($query);
$resultIn = $resultIn->fetch_assoc();
$medicine_info_id = $resultIn['medicine_information_id'];

$query = "INSERT INTO loose_stock_p VALUES (default,'$medicine_id','$returnedQuantity','1','$invoice_date','added',null,0,'$medicine_info_id')";

$con->query($query);


if ($con->error === "") {
    echo json_encode(array("status" => true));
} else {
    $response = array("status" => FALSE, "error" => $con->error);
    echo json_encode($response);
}

$con->close();
