<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$date=$userData['date'];


$select=mysqli_query($con,"select * from expense_p where expense_date like '$date"."-%"."' order by expense_date desc");
$list=array();
foreach($select as $se){
$list[]=$se;
}

echo json_encode($list);











?>