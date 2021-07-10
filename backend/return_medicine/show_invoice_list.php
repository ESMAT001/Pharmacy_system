<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
$userData = json_decode(file_get_contents("php://input"),true);

$invoice_id=$userData['invoiceId'];
include "../config.php";




$select_data=mysqli_query($con,"select * from invoice_medicine_list_p INNER join medicine_p on medicine_p.medicine_id=invoice_medicine_list_p.medicine_id INNER join invoice_p on invoice_p.invoice_id=invoice_medicine_list_p.invoice_id where invoice_medicine_list_p.invoice_id='$invoice_id'");

$list=array();
foreach($select_data as $se){
    $list[]=$se;
}



echo json_encode($list)



?>