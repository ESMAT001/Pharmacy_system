<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$customer_id=$userData['customerId'];
$book_page_no=$userData['bookPageNo'];


if(!empty($customer_id) && !empty($book_page_no)){
    $insert_to_table="insert into customer_book_page values(null,'$book_page_no','$customer_id')";
    if($con->query($insert_to_table)===TRUE){
        echo json_encode(array("status"=>"true"));
    }else{
        echo json_encode(array("status"=>"not inserted"));
    }


}














?>