<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";
$userData = json_decode(file_get_contents("php://input"),true);



$visitor_id=$userData['visitorId'];


$select_visitor=mysqli_query($con,"select * from visitor_p where visitor_id='$visitor_id'");
$list=array();
foreach($select_visitor as $se){
    $list=$se;
}
echo json_encode($list);







?>