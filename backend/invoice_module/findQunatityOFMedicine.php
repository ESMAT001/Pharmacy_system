<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$userData = json_decode(file_get_contents("php://input"), true);

$medicine_id = $userData['medicineId'];
include "../config.php";

$remian_medicine = mysqli_query($con, "SELECT sum(packs_quantity)-sum(sold_quantity) as " . "remain" . " FROM `medicine_information_p` WHERE medicine_id='$medicine_id' and status='added'");
$remian_medicine_loose = mysqli_query($con, "SELECT sum(quantity)-sum(sold_quantity) as " . "remain" . " FROM `loose_stock_p` WHERE medicine_id='$medicine_id' AND status='added' ");
foreach ($remian_medicine as $re) {
    $remain = intval($re['remain']);
}
foreach ($remian_medicine_loose as $rel) {
    $remain += intval($rel['remain']);
}


$response = array("status" => "true", "remain" => $remain, "medicine_id" => $medicine_id);
echo json_encode($response);
