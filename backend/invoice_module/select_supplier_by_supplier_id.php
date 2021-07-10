<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);

$supplier_id=$userData['supplierId'];

$select=mysqli_query($con,"select * from visitor_p where visitor_id='$supplier_id'");

$list=array();
foreach($select as $li){
    $list=$li;
}
echo json_encode($list)
?>