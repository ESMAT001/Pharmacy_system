<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$expense_id=$userData['expenseId'];
if(!empty($expense_id)){
    $delete="delete from expense_p where expense_id='$expense_id'";
    if($con->query($delete)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));
    }
}









?>