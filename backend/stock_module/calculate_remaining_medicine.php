<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$userData = json_decode(file_get_contents("php://input"),true);
$medicine_id=$userData['medicineId'];


$medicine_quantity=mysqli_query($con,"select sum(packs_quantity)-sold_quantity as remain from medicine_information_p where medicine_id='$medicine_id'");


foreach($medicine_quantity as $m){
 $medicine_quantity=$m['remain'];
}
$response=array("status"=>"true" ,"remain"=>$medicine_quantity,"medicineid"=>$medicine_id);
echo json_encode($response);
?>