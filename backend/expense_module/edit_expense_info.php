<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$expense_id=$userData['expense_id'];
$description=$userData['description'];
$expense_amount=$userData['expenseAmount'];
$expense_date=$userData['expenseDate'];

if(!empty($expense_id)){
    $update_expense="update expense_p set description='$description',amount='$expense_amount',expense_date='$expense_date' where expense_id='$expense_id'";
    if($con->query($update_expense)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));
        
    }
}





?>