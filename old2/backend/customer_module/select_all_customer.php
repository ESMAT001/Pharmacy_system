<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$list_of_customer=mysqli_query($con,"select * from customer_p order by customer_name");
$list=array();
foreach($list_of_customer as $li){
    $list[]=$li;
}

echo json_encode($list);


?>