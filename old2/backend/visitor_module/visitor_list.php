<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');



include "../config.php";
error_reporting(0);
$list=array();
$select=mysqli_query($con,"select * from visitor_p");

foreach($select as $se){
  $list[]=$se;
}

echo json_encode($list);




?>