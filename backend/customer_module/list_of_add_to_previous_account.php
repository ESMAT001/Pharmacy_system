<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$select=mysqli_query($con,"select *,province.province_name as province,sum(previous_account.amount) as total_of_all from previous_account INNER join customer_p on customer_p.customer_id=previous_account.customer_id INNER join province on province.province_id=customer_p.province_id group by previous_account.customer_id order by previos_account_id desc");
$list=array();

foreach($select as $se){
    $customer_id_for_remaind=$se['customer_id'];
    $total_of_previous=$se['total_of_all'];
    $total_paid=0;

    $select_payment=mysqli_query($con,"select nvl(sum(ledger_previous.amount_received),0) as total_paid from ledger_previous WHERE customer_id='$customer_id_for_remaind'");
    foreach($select_payment as $sp){
        $total_paid=$sp['total_paid'];
    }

    $total_remain_after_calculate=$total_of_previous-$total_paid;





$list[]=array(
    "previos_account_id"=>$se['previos_account_id'],"customer_id"=>$se['customer_id'],"amount"=>$se['amount'],"entry_date"=>$se['entry_date'],"description"=>$se['description'],"customer_name"=>$se['customer_name'],"address"=>$se['address'],"phone_no"=>$se['phone_no'],"province"=>$se['province'],"user_id"=>$se['user_id'],"total_of_all"=>$se['total_of_all'],"total_paid_amount_from_previous"=>$total_paid,"total_remain_after_calculate"=>$total_remain_after_calculate,
);
}

echo json_encode($list);






?>