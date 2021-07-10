<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$recipt_id=$userData['reciptId'];

if(!empty($recipt_id)){
    $delete="delete from ledger_recipt_p where recipt_id='$recipt_id'";
    if($con->query($delete)){
        echo json_encode(array("status"=>"true"));
    }
}





?>