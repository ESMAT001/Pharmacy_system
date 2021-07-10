<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$userData = json_decode(file_get_contents("php://input"),true);
$name=$userData['name'];
$last_name=$userData['lastName'];
$phone=$userData['phone'];
$address=$userData['address'];
$province=$userData['province'];


include "../config.php";

if(!empty($name)){
$sql="insert into visitor_p values(null,'$name','$last_name','$phone','$address','$province')";
if($con->query($sql)===TRUE){
    $response_message=array("status"=>"true");
    echo json_encode($response_message);
   
}else{
    $response_message=array("status"=>"false");
    echo json_encode($response_message);
   
}


}






?>