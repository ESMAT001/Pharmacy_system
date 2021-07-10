<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);



$sale_price=$userData['salePrice'];

$medicine_id=$userData['medicineId'];

if(!empty($medicine_id)){


    $select_medicine_is_in_table=mysqli_query($con,"select nvl(count(*),0) as availiable from sale_price_of_medicine where medicine_id='$medicine_id'");


    $count=0;
    
    foreach($select_medicine_is_in_table as $sp){
        $count=$sp['availiable'];
    }
    
    
    if($count==0){
    
        $insert_in_table="insert into sale_price_of_medicine(sale_id,medicine_id,sale_price) values (null,'$medicine_id','$sale_price')";
        
        if($con->query($insert_in_table)===TRUE){
            echo json_encode(array("status"=>"true"));
        }else{
            echo json_encode(array("status"=>"insert probelm"));
    
        }
    
    }else{
        $update_table="update sale_price_of_medicine set sale_price='$sale_price' where medicine_id='$medicine_id'";
        if($con->query($update_table)===TRUE){
    
            echo json_encode(array("status"=>"true"));
        }else{
            echo json_encode(array("status"=>"update problem"));
    
        }
    
    }


}







?>