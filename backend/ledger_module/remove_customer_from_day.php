<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$ledger_id=$userData['ledgerId'];
$sql="delete from ledger_schedule_p where ledger_id='$ledger_id'";
if($con->query($sql)===TRUE){
    echo json_encode(array("status"=>"true"));
}








?>