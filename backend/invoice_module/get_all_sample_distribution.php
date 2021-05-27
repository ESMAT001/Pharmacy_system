<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";


$query = "SELECT * FROM `sample_distribution_p`";

$result = $con->query($query);

$array=array();
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        array_push($array,$row);
    }
    echo json_encode(array("status"=>true,"data"=>$array));
} else {
    echo json_encode(array("status"=>true));
}


