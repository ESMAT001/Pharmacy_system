<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);



$select_list=mysqli_query($con,"SELECT email,user_id from users_p");
$list=array();
foreach($select_list as $se){
    $list[]=$se;
}
echo json_encode($list);









?>