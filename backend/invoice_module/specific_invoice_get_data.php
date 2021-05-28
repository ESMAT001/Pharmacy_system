<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$id = json_decode(file_get_contents("php://input"), true);


$query = "SELECT ip.medicine_id, p.product_name,ip.invoice_medicine_list_id,ip.pack_quantity,ip.sell_price,ip.discount,ip.status FROM `invoice_medicine_list_p` as ip INNER JOIN `medicine_p` as p on ip.medicine_id=p.medicine_id WHERE invoice_id='$id'";
$result = $con->query($query);
$data = array();
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        array_push($data, $row);
    }
} else {
    echo "0 results";
}

if ($con->error === "") {
    echo json_encode(array("status" => true, "data" => $data));
} else {
    $response = array("status" => FALSE);
    echo json_encode($response);
}

$con->close();
