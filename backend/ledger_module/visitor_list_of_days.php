<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$day_of_the_week=$userData['dayOfTheWeek'];
$visitorId=$userData['visitorId'];





$list=array();

$select_schedule=mysqli_query($con,"SELECT * from ledger_schedule_p where ledger_schedule_p.visitor_id='$visitorId' and ledger_schedule_p.day='$day_of_the_week'");

foreach($select_schedule as $schedule){
    $customer_id=$schedule['customer_id'];


    $select_customer_details=mysqli_query($con,"select * from customer_p where customer_id='$customer_id'");
    $customer_name="";
    $customer_address="";
    foreach($select_customer_details as $custom){
        $customer_name=$custom['customer_name'];
        $customer_address=$custom['address'];
    }


    $new_invices=mysqli_query($con,"select nvl(floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))),0) as total from invoice_p INNER join invoice_medicine_list_p on invoice_medicine_list_p.invoice_id=invoice_p.invoice_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id where invoice_p.customer_id='$customer_id'");









    $new_invoice_total=0;
    
    
    foreach($new_invices as $in){
        $new_invoice_total=$in['total'];
    }
    // Return Item Amount Calculator


$select_return=mysqli_query($con,"select nvl(sum((sell_price-return_price)*return_quantity),0) as total_from_return_medicine from return_medicine_p where customer_id='$customer_id' and return_price <sell_price");

$total_return=0;
foreach($select_return as $sr){
    $total_return=$sr['total_from_return_medicine'];
}



$new_invoice_total=$new_invoice_total+$total_return;

// Return Amount Calculator










    $select_ledger=mysqli_query($con,"select nvl(ledger_recipt_p.recipt_date,0) as ledger_new_paid,nvl(sum(ledger_recipt_p.amount_recieved),0) as total_paid from ledger_recipt_p where customer_id='$customer_id'");
    
    $paid_amount=0;
    $paid_date_of_new=0;
    foreach($select_ledger as $se){
        $paid_amount=$se['total_paid'];
        $paid_date_of_new=$se['ledger_new_paid'];
    }
    
    
    
    
    $select_previous=mysqli_query($con,"select nvl(sum(previous_account.amount),0) as total_previous from previous_account where previous_account.customer_id='$customer_id'");
    
    $total_of_previous=0;
    foreach($select_previous as $to){
    $total_of_previous=$to['total_previous'];
    }
    
    
    $select_ledger_previous=mysqli_query($con,"select nvl(ledger_previous.recipt_date,0) as ledger_previous_date,nvl(sum(ledger_previous.amount_received),0) total_paid_previous from ledger_previous where customer_id='$customer_id'");
    
    $total_paid_of_previous=0;
    $date_of_paid_ledger_previous="";
    foreach($select_ledger_previous as $le){
        $total_paid_of_previous=$le['total_paid_previous'];
        $date_of_paid_ledger_previous=$le['ledger_previous_date'];
    }
    
    
    
    $total_amount_left_with_customer=$new_invoice_total+$total_of_previous-($total_paid_of_previous+$paid_amount);
    
    
    $list[]=array("ledger_id"=>$schedule['ledger_id'],"customer_name"=>$customer_name,"address"=>$customer_address,"remain_amount"=>$total_amount_left_with_customer,);

}

echo json_encode($list);

?>