<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$list_of_customer=mysqli_query($con,"select *,customer_p.province_id as province_id_of_customer,province.province_name as province from customer_p  INNER join province on province.province_id=customer_p.province_id order by customer_p.customer_name");
$list=array();

foreach($list_of_customer as $li){
    $customer_id=$li['customer_id'];
    $select_book_page_no=mysqli_query($con,"select book_page_no as page from customer_book_page where customer_id='$customer_id' order by customer_book_page.book_id desc LIMIT 1");
    $book_page_no="";
    foreach($select_book_page_no as $sp){
        $book_page_no=$sp['page'];
    }
    

    $list[]=array("customer_id"=>$li['customer_id'],"customer_name"=>$li['customer_name'],"address"=>$li['address'],"phone_no"=>$li['phone_no'],"province"=>$li['province'],"page_no"=>$book_page_no,"province_id_of_customer"=>$li['province_id_of_customer']);
}

echo json_encode($list);


?>