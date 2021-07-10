<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$userData = json_decode(file_get_contents("php://input"),true);
$customer_name=$userData['customerName'];
$address=$userData['address'];
$phone_no=intval($userData['phone']);
$province=$userData['province'];
$customer_book_page=$userData['customerBookPage'];



include "../config.php";
if(!empty($customer_name)){

$sql="insert into customer_p values(null,'$customer_name','$address','$phone_no','$province',1)";
if($con->query($sql)===TRUE){
    $sql= "SELECT customer_id FROM customer_p WHERE customer_name='$customer_name' AND phone_no='$phone_no'";
    $res= $con->query($sql);
    foreach($res as $r){
        $customer_id=$r['customer_id'];
    }
    $insert_in_book="insert into customer_book_page VALUES(null,'$customer_book_page','$customer_id')";
    if($con->query($insert_in_book)===TRUE){
    $response=array("status"=>"true",'id'=>$customer_id);
    echo json_encode($response);
    }
}else{
    $response=array("status"=>"false");
    echo json_encode($response);
}
    


}







?>