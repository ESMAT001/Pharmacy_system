<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$dis_id=$userData['disId'];
$description=$userData['description'];
$quantity=$userData['quantity'];
$dis_date=$userData['date'];
$medicine_information_id=$userData['MedicineInformationId'];

if(!empty($dis_id)){
$update_data="update sample_distribution_p set description='$description',dis_date='$dis_date' where dis_id='$dis_id'";
if($con->query($update_data)===TRUE){
$select_quantity_in_table=mysqli_query($con,"select quantity from sample_distribution_p where dis_id='$dis_id'");
$quantity_in_sample=0;
foreach($select_quantity_in_table as $ta){
    $quantity_in_sample=$ta['quantity'];
}

if($quantity_in_sample===$quantity){
$update_data="update sample_distribution_p set description='$description',dis_date='$dis_date' where dis_id='$dis_id'";
if($con->query($update_data)===TRUE){
    echo json_encode(array("status"=>"true"));
}

}elseif($quantity_in_sample>$quantity){

$select_status_medicine=mysqli_query($con,"select status from medicine_information_p where medicine_info_id='$medicine_information_id'");
$status="";
foreach($select_status_medicine as $ta){
$status=$ta['status'];
}
if($status==='added'){
$updated_sold_quantity=$quantity_in_sample-$quantity;
$update_medicine_table="update medicine_information_p set sold_quantity=sold_quantity+'$updated_sold_quantity' where medicine_info_id='$medicine_information_id'";
if($con->query($update_medicine_table)===TRUE){
$update_data="update sample_distribution_p set quantity='$quantity' where dis_id='$dis_id'";
if($con->query($update_data)===TRUE){
    echo json_encode(array("status"=>"true"));
}

}

}elseif($status==='sold out'){
    $updated_sold_quantity=$quantity_in_sample-$quantity;
    $update_medicine_table="update medicine_information_p set sold_quantity=sold_quantity-'$updated_sold_quantity',status='added' where medicine_info_id='$medicine_information_id'";
    if($con->query($update_medicine_table)===TRUE){
    $update_data="update sample_distribution_p set quantity='$quantity' where dis_id='$dis_id'";
    if($con->query($update_data)===TRUE){
        echo json_encode(array("status"=>"true"));
    }
    
    }
}


}elseif($quantity>$quantity_in_sample){

$select_quantity_in_medicne_table=mysqli_query($con,"select packs_quantity-sold_quantity as remain from medicine_information_p where medicine_info_id='$medicine_information_id'");
$qunatity_in_medicine_table=0;
foreach($select_quantity_in_medicne_table as $ta){
    $qunatity_in_medicine_table=$ta['remain'];
}
 
$needed_quantity=$quantity-$quantity_in_sample;


if($needed_quantity>$qunatity_in_medicine_table){
echo json_encode(array("status"=>"out_of_box"));
}elseif($needed_quantity==$qunatity_in_medicine_table){
    
    $update_data_of_medicine="update medicine_information_p set sold_quantity=sold_quantity+'$needed_quantity',status='sold out' where medicine_info_id='$medicine_information_id'";
    if($con->query($update_data_of_medicine)===TRUE){
        $update_sample="update sample_distribution_p set quantity='$quantity' where dis_id='$dis_id'";
        if($con->query($update_sample)===TRUE){
            echo json_encode(array("status"=>"true"));
        }
    }
}elseif($needed_quantity<$qunatity_in_medicine_table){
    $update_medicne_table_info="update medicine_information_p set sold_quantity=sold_quantity+'$needed_quantity' where medicine_info_id='$medicine_information_id'";
    if($con->query($update_medicne_table_info)===TRUE){
        $update_sample="update sample_distribution_p set quantity='$quantity' where dis_id='$dis_id'";
        if($con->query($update_sample)===TRUE){
            echo json_encode(array("status"=>"true"));
        }
    }
}


}



}
}










?>