<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$invoice_medicine_list_id = json_decode(file_get_contents("php://input"), true);


$query = "DELETE FROM `invoice_medicine_list_p` WHERE invoice_medicine_list_id='$invoice_medicine_list_id' ";
$con->query($query);
// echo json_encode($con->error);

if ($con->error === "") {
    echo json_encode(array("status" => true));
} else {
    $response = array("status" => FALSE);
    echo json_encode($response);
}

$con->close();
