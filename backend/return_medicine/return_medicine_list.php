<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$userData = json_decode(file_get_contents("php://input"),true);


$customer_id=$userData['customerId'];

$select=mysqli_query($con,"select * from return_medicine_p inner join medicine_p on medicine_p.medicine_id=return_medicine_p.medicine_id where customer_id='$customer_id'");
$list=array();
foreach($select as $se){
$list[]=$se;
}
echo json_encode($list);


?>