<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$date=$userData['date'];



$select_medicine_list=mysqli_query($con,"SELECT invoice_medicine_list_p.sell_price as sell_price, invoice_medicine_list_p.pack_quantity as sold_quantity,medicine_information_p.cost_price as cost_price,invoice_medicine_list_p.discount as discount  from invoice_medicine_list_p INNER join loose_stock_p on loose_stock_p.loose_stock_id=invoice_medicine_list_p.loose_stock_id inner join medicine_information_p on medicine_information_p.medicine_info_id=loose_stock_p.medicine_information_id INNER join invoice_p on invoice_p.invoice_id=invoice_medicine_list_p.invoice_id where invoice_medicine_list_p.sell_price >= medicine_information_p.cost_price and invoice_p.invoice_date='$date'");

$list=array();
$total=0;
foreach($select_medicine_list as $se){


if($se['discount']===0){
$total+=(($se['sell_price']*$se['sold_quantity'])-($se['cost_price']*$se['sold_quantity']));
}else{

$total+=((($se['sell_price']-($se['sell_price']*$se['discount']/100))*$se['sold_quantity'])-($se['cost_price']*$se['sold_quantity']));


}


}
echo json_encode(array("total"=>$total));





?>