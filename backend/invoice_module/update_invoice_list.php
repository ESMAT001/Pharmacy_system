<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);
$visitor_id=$userData['visitorId'];
$book_page_no=$userData['bookPageNo'];
$invoice_id=$userData['invoiceId'];
$invoice_date=$userData['invoiceDate'];
$supplier_id=$userData['supplierId'];




if(!empty($invoice_id)){
    $update="update invoice_p set book_page_no='$book_page_no',visitor_id='$visitor_id',invoice_date='$invoice_date',supplier_id='$supplier_id' where invoice_id='$invoice_id'";
if($con->query($update)===TRUE){
   echo json_encode(array("status"=>"true"));
}else{
    echo json_encode(array("status"=>"false"));
}

}


?>