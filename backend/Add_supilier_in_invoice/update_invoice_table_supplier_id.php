<?php


header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);

$invoice_id=$userData['invoiceId'];
$visitor_id=$userData['visitorId'];

if(!empty($visitor_id)){

$update="update invoice_p set supplier_id='$visitor_id' where invoice_id='$invoice_id'";
if($con->query($update)===TRUE){
    echo json_encode(array("status"=>"true"));
}else{
    echo json_encode(array("status"=>"false"));

}

}



?>


