<?php
include "../config.php";


$select=mysqli_query($con,"select *,sum(loose_stock_p.quantity)-sum(loose_stock_p.sold_quantity) as 'remain' from loose_stock_p inner join medicine_p on loose_stock_p.medicine_id=medicine_p.medicine_id inner join medicine_information_p on medicine_information_p.medicine_info_id=loose_stock_p.medicine_information_id group by loose_stock_p.loose_stock_id HAVING loose_stock_p.quantity-loose_stock_p.sold_quantity >0 order by loose_stock_id desc");
$list=array();
foreach($select as $s){
$list[]=$s;
}
echo json_encode($list);


?>