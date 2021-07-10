<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$query = "SELECT * FROM `sample_distribution_p`";

$select_sample=mysqli_query($con,$query);
$list=array();
foreach($select_sample as $se){
    $list[]=$se;
}

echo json_encode($list)

?>