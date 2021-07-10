<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$medicine_id=$data['medicineId'];


$select_all_medicine=mysqli_query($con,"select *,province.province_name as customer_province,customer_p.address customer_address,visitor_p.province as visitor_povince from invoice_medicine_list_p INNER join invoice_p  on invoice_p.invoice_id=invoice_medicine_list_p.invoice_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id INNER join medicine_p on medicine_p.medicine_id=invoice_medicine_list_p.medicine_id INNER join province on province.province_id=customer_p.province_id where invoice_medicine_list_p.medicine_id='$medicine_id' GROUP by customer_p.customer_name order by invoice_medicine_list_p.pack_quantity desc");

$result=array();
foreach($select_all_medicine as $sa){
    $result[]=$sa;
}


echo json_encode($result);








?>