<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$id = json_decode(file_get_contents("php://input"), true);


$query = "DELETE FROM `invoice_medicine_list_p` WHERE invoice_id='$id'";
$con->query($query);

$query = "DELETE FROM `invoice_p` WHERE invoice_id='$id'";
$con->query($query);

if ($con->error == "") {
    echo json_encode(array("status" => true));
} else {
    echo json_encode(array("status" => false, "error" => $con->error));
}
