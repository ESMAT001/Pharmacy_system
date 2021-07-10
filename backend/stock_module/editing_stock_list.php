<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$medicine_info_id=$userData['medicineInfoId'];
$product_name=$userData['productName'];
$generic_name=$userData['genericName'];
$batch_no=$userData['batchNo'];
$pack_quantity=$userData['packQuantity'];
$mfg_date=$userData['mfgDate'];
$expire_date=$userData['expireDate'];
$cost_price=$userData['costPrice'];
$per_pack=$userData['perPacks'];
$entry_date_to_stock=$userData['entryDateToStock'];
$medicine_id=$userData['medicineId'];

if(!empty($medicine_info_id)){
    $update_medicine_p_table="update medicine_p set product_name='$product_name',generic_name='$generic_name' where medicine_id='$medicine_id'";
    if($con->query($update_medicine_p_table)===TRUE){
        $update_medicine_information_p_some_part="update medicine_information_p set batch_no='$batch_no',mfg_date='$mfg_date',expire_date='$expire_date',cost_price='$cost_price',entry_date='$entry_date_to_stock',per_packs='$per_pack' where medicine_info_id='$medicine_info_id'";
        if($con->query($update_medicine_information_p_some_part)){
                $select_quantity_from_medicine_information= mysqli_query($con,"select sold_quantity from medicine_information_p where medicine_info_id='$medicine_info_id'");
                $sold_quantity_from_table=0;
                foreach($select_quantity_from_medicine_information as $mf){
                    $sold_quantity_from_table=$mf['sold_quantity'];
                }

                if($pack_quantity>=$sold_quantity_from_table){
                        $update_medicne_pack_quantity="update medicine_information_p set packs_quantity='$pack_quantity' where medicine_info_id='$medicine_info_id'";
                        if($con->query($update_medicne_pack_quantity)===TRUE){
                            echo json_encode(array("status"=>"true"));
                        }
                }elseif($pack_quantity<$sold_quantity_from_table){
                    echo json_encode(array("status"=>"less_quantity"));
                }

         }


    }
}










?>