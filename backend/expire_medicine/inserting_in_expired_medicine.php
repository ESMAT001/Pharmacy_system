<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$medicine_info_id=$userData['medicineInfoId'];
$medicine_id=$userData['medicineId'];


$today_date=date("Y-m-d");

$select_quantity=mysqli_query($con,"select sum(packs_quantity-sold_quantity) as remain from medicine_information_p where medicine_info_id='$medicine_info_id'");

$remain_in_stock=0;
foreach($select_quantity as $se){
    $remain_in_stock = $se['remain'];
}


if(!empty($medicine_info_id)){
    $update_medicine_info_table="update medicine_information_p set sold_quantity='$remain_in_stock'+sold_quantity,status='sold out' where medicine_info_id='$medicine_info_id'";
    if($con->query($update_medicine_info_table)===TRUE){
        $insert_in_expire_medicine="insert into expire_medicines_p(expire_id,medicine_information_id,medicine_id,quantity,transfer_date) VALUES(null,'$medicine_info_id','$medicine_id','$remain_in_stock','$today_date')";
        if($con-> query($insert_in_expire_medicine)=== TRUE){
            echo json_encode(array("status"=>"true"));
        }else{
            echo json_encode(array("status"=>"false"));
            
        }
    }else{
        echo json_encode(array("status"=>"Problem In update"));

    }
}


?>