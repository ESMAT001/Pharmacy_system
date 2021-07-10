<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$date=$userData['date'];
$total_sell=mysqli_query($con,"select sum(expense_p.amount) as total_expense from expense_p where expense_p.expense_date='$date'");
$total_sell_money=0;
foreach($total_sell as $to){
$total_sell_money=$to['total_expense'];
}

echo json_encode(array("total_expense"=>$total_sell_money));












?>