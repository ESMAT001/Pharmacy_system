<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$userData = json_decode(file_get_contents("php://input"),true);
$customer_name=$userData['customerName'];
$address=$userData['address'];
$phone_no=intval($userData['phone']);
$province=$userData['province'];

include "../config.php";
if(!empty($customer_name)){

$sql="insert into customer_p values(null,'$customer_name','$address','$phone_no','$province',1)";
if($con->query($sql)===TRUE){
    $response=array("status"=>"true");
    echo json_encode($response);
    
}else{
    $response=array("status"=>"false");
    echo json_encode($response);
}
    


}







?>