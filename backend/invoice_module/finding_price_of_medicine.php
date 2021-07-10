<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$medicine_id=$data['medicineId'];


if(!empty($medicine_id)){


    $select_price=mysqli_query($con,"select sale_price from sale_price_of_medicine where medicine_id='$medicine_id'");

    $sale_price=0;
    foreach($select_price as $sp){
    $sale_price=$sp['sale_price'];
    }
    
    echo json_encode(array("sale_price"=>$sale_price));
    


}



?>