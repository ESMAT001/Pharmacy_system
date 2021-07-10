<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$province=$data['province'];


$medicine_list=mysqli_query($con,"select invoice_medicine_list_p.medicine_id,medicine_p.product_name,medicine_p.generic_name,sum(pack_quantity) as total_sold_a from invoice_medicine_list_p INNER JOIN medicine_p ON medicine_p.medicine_id=invoice_medicine_list_p.medicine_id INNER join invoice_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id INNER join province on province.province_id=customer_p.province_id WHERE customer_p.province_id='$province' GROUP by invoice_medicine_list_p.medicine_id order by total_sold_a desc");


$list=array();

foreach($medicine_list as $me){
    $list[]=$me;
}

echo json_encode($list);









?>