<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";
$select=mysqli_query($con,"select *,medicine_p.medicine_id,medicine_p.product_name,medicine_p.generic_name,medicine_information_p.per_packs,sum(medicine_information_p.packs_quantity)-sum(medicine_information_p.sold_quantity) as 'remain' from medicine_p inner join medicine_information_p on medicine_p.medicine_id=medicine_information_p.medicine_id where medicine_information_p.status='added' or medicine_information_p.status='loose' group by medicine_information_p.medicine_info_id order by medicine_p.product_name");

$list=array();
foreach($select as $se){
    $list[]=$se;
}

echo json_encode($list)

?>