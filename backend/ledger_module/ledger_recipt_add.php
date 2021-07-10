<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$visitor_id=$userData['visitorId'];
$recipt_no=$userData['reciptNo'];
$amount=$userData['amount'];
$customer_id=$userData['customerId'];
$previous_balance=$userData['previous_balance'];
$date=$userData['date'];
$new_invoices=$userData['new_invoices'];
$previous_balance_converted=intval($previous_balance);
if(!empty($visitor_id) && !empty($date) && !empty($amount) && !empty($recipt_no) && !empty($customer_id)){



if($previous_balance==0){
    $sql="insert into ledger_recipt_p values(null,'$visitor_id','$amount','$recipt_no','$customer_id','$date')";
    if($con->query($sql)){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"false"));
    
    }
}else if($previous_balance >0){


if($amount>$previous_balance_converted){

    $resultofcalculate=$amount-$previous_balance_converted;
while($amount >0){
if($amount>$previous_balance_converted){
    $insert="insert into ledger_previous values(null,'$visitor_id','$previous_balance_converted','$recipt_no','$customer_id','$date')";
    if($con->query($insert)===TRUE){
        $amount=$amount-$previous_balance;

    }
}else{
    $sql="insert into ledger_recipt_p values(null,'$visitor_id','$amount','$recipt_no','$customer_id','$date')";
    if($con->query($sql)===TRUE){
    $amount=0;
}
}


}

echo json_encode(array("status"=>"true"));



}else if($previous_balance>$amount){
    $insert="insert into ledger_previous values(null,'$visitor_id','$amount','$recipt_no','$customer_id','$date')";
    if($con->query($insert)===TRUE){
        echo json_encode(array("status"=>"true"));
    }
}


}













}







?>
