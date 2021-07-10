<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$received_amount=$userData['receivedAmount'];
$recipt_date=$userData['reciptDate'];
$recipt_id=$userData['reciptId'];
$recipt_no=$userData['reciptNo'];


if(!empty($recipt_id)){
    $update="update ledger_recipt_p set recipt_no='$recipt_no',amount_recieved='$received_amount',recipt_date='$recipt_date' where recipt_id='$recipt_id'";
    if($con->query($update)){
        echo json_encode(array("status"=>"true"));
    }
}
















?>