<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data["method"] == "expire_date") {
    $query = "SELECT p.expire_date as 'expire_date' ,mp.product_name as 'name' FROM `medicine_information_p` as p INNER JOIN `medicine_p` as mp on p.medicine_id = mp.medicine_id WHERE DATE(p.expire_date) <= DATE(DATE_ADD(now(), INTERVAL (select medicine_range_expire from `medicine_range_p`) MONTH))";
    $result = $con->query($query);
    $resData = array();
    while ($row = $result->fetch_assoc()) {
        array_push($resData, $row);
    }
    echo json_encode(array("data" => $resData));
} else if ($data["method"] == "quantity") {
    $query = "SELECT (p.packs_quantity-p.sold_quantity) as 'quantity',p.entry_date as 'entry_date' , mp.product_name as 'name' FROM `medicine_information_p` as p INNER JOIN medicine_p as mp ON p.medicine_id=mp.medicine_id WHERE (p.packs_quantity-p.sold_quantity)<(select medicine_range_quantity from `medicine_range_p`)";
    $result = $con->query($query);
    $resData = array();
    while ($row = $result->fetch_assoc()) {
        array_push($resData, $row);
    }
    echo json_encode(array("data" => $resData));
}
