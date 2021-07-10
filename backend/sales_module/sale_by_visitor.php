<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);



$select_table=mysqli_query($con,"select *,floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))) as total_of_sale from invoice_p INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id GROUP by visitor_p.name order by total_of_sale desc");

$list=array();
foreach($select_table as $st){
$list[]=$st;
}
echo json_encode($list);











?>