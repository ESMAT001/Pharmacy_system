<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$userData = json_decode(file_get_contents("php://input"),true);
$medicine_id=$userData['medicineID'];
$batch_no=$userData['batchNo'];
$converted_mfg=strtotime($userData['mfgDate']);
$mfg_date=date('Y-m-d',$converted_mfg);
$converted_exp_date=strtotime($userData['expDate']);
$exp_date=date('Y-m-d',$converted_exp_date);
$pack_quantity=intval($userData['packQuantity']);
$per_pack=$userData['perPack'];
$cost_price=intval($userData['costPrice']);
$today_date=date("Y-m-d");


$insert_medicine_info_inner="insert into medicine_information_p values (null,'$batch_no','$mfg_date','$exp_date','$cost_price','$today_date','$pack_quantity','$per_pack','$medicine_id','added',0)";
            
        if($con->query($insert_medicine_info_inner) === TRUE){
            $response_message=array("status"=>"true");
            echo json_encode($response_message);
        }else{
            $response_message=array("status"=>"falseInner","medicine_id"=>$medicine_id_found,"mfg-date"=>$mfg_date);
            echo json_encode($response_message);
        }



?>