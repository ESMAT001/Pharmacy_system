<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$userData = json_decode(file_get_contents("php://input"),true);
$product_name=$userData['productName'];
$generic_name=$userData['genericName'];
$batch_no=$userData['batchNo'];
$converted_mfg=strtotime($userData['mfgDate']);
$mfg_date=date('Y-m-d',$converted_mfg);
$converted_exp_date=strtotime($userData['expDate']);
$exp_date=date('Y-m-d',$converted_exp_date);
$pack_quantity=intval($userData['packQuantity']);
$per_pack=$userData['perPack'];
$cost_price=intval($userData['costPrice']);
$today_date=date("Y-m-d");

if(!empty($product_name) && !empty($generic_name)){
try{
    $con=mysqli_connect("localhost","root","","pharmacy");
    $sql="insert into medicine_p values (null,'$product_name','$generic_name',1)";
    $stmt=$con->prepare($sql);
    if($stmt->execute()){
        $select_id="select medicine_id from medicine_p where product_name='$product_name' and generic_name='$generic_name' limit 1";
        $id=mysqli_query($con,$select_id);
        foreach($id as $e){
            $medicine_id_found=$e['medicine_id'];
           
      

           
        }
        $insert_medicine_info_inner="insert into medicine_information_p values (null,'$batch_no','$mfg_date','$exp_date','$cost_price','$today_date','$pack_quantity','$per_pack','$medicine_id_found','added',0)";
            
        if($con->query($insert_medicine_info_inner) === TRUE){
            $response_message=array("status"=>"true");
            echo json_encode($response_message);
        }else{
            $response_message=array("status"=>"falseInner","medicine_id"=>$medicine_id_found,"mfg-date"=>$mfg_date);
            echo json_encode($response_message);
        }
       
    }else{
        $response_message=array("status"=>"false");
    echo json_encode($response_message);
    }
   
    $stmt->close();
    $con->close();
}catch(Exception $e){
    
}

}

?>

      