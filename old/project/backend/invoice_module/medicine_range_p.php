<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data=json_decode(file_get_contents("php://input"), true);



// method: "set",
//       data:{
//         medicine_range_expire:rangeE,
//         medicine_range_quantity:rangeQ
//       }

if($data["method"]=="get"){
    $query="SELECT * FROM `medicine_range_p`";
    $result=$con->query($query);
    $result = $result->fetch_assoc();
    echo json_encode(array("data"=>$result));
}else if($data["method"]=="set"){
    $medicine_range_expire=$data["data"]["medicine_range_expire"];
    $medicine_range_quantity=$data["data"]["medicine_range_quantity"];
    $query="UPDATE `medicine_range_p` set medicine_range_expire='$medicine_range_expire' , medicine_range_quantity='$medicine_range_quantity' ";
    $con->query($query);
    if($con->error!=""){
        echo json_encode(array("status"=>false));
    }else{
        echo json_encode(array("status"=>true));
    }

}