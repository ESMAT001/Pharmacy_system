<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$description=$userData['description'];
$amount=$userData['amount'];
$today_date = date("Y-m-d");
if(!empty($description) && !empty($amount)){
    $insert = "insert into expense_p values ('$description','$amount','$today_date',1,null)";
    if($con->query($insert)){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));

    }


}





?>