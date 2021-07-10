<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$dis_id = json_decode(file_get_contents("php://input"), true);
$select_quantity_sample_distribution=mysqli_query($con,"select quantity,medicine_information_id from sample_distribution_p where dis_id='$dis_id'");

$total_dtribute_qunatity=0;
$medicine_info_id=0;
foreach($select_quantity_sample_distribution as $sa){
$total_dtribute_qunatity=$sa['quantity'];
$medicine_info_id=$sa['medicine_information_id'];
}
$select_status=mysqli_query($con,"select status from medicine_information_p where medicine_info_id='$medicine_info_id'");
$status="";
foreach($select_status as $s2){
    $status=$s2['status'];
}

if($status==='added'){
    $update_medicine_information="update medicine_information_p set sold_quantity=sold_quantity-'$total_dtribute_qunatity' where medicine_info_id='$medicine_info_id'";
    if($con->query($update_medicine_information)===TRUE){
$delete_query= "DELETE FROM `sample_distribution_p` WHERE dis_id='$dis_id' ";
if($con->query($delete_query)===TRUE){
    echo json_encode(array("status"=>true));
}
    }
}elseif($status==='sold out'){
    $update_medicine_information="update medicine_information_p set sold_quantity=sold_quantity-'$total_dtribute_qunatity',status='added' where medicine_info_id='$medicine_info_id'";
    if($con->query($update_medicine_information)===TRUE){
    $delete_query= "DELETE FROM `sample_distribution_p` WHERE dis_id='$dis_id' ";
    if($con->query($delete_query)===TRUE){
    echo json_encode(array("status"=>true));
}
    }
}



$con->close();