<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);

$dis_id = $data[0]["dis_id"];
$quantity = $data[0]["quantity"];
$description = $data[0]["description"];
$date = $data[0]["date"];
$total = $data[0]["total"];

$query = "SELECT quantity From `sample_distribution_p` WHERE dis_id='$dis_id'";
$result = $con->query($query);
$result = $result->fetch_assoc();
$quantityToCut=$result["quantity"];



$query = "UPDATE `sample_distribution_p` SET quantity='$quantity' , description='$description' , dis_date='$date', total_amount='$total' WHERE dis_id='$dis_id' ";
$con->query($query);
// echo json_encode($con->error);


$query = "";
$response = array();
$changedQuery = false;

for ($i = 0; $i < count($data); $i++) {
    $medicineId = $data[$i]['medicine_id'];
    $pack_quantity = intval($data[$i]['quantity']);
    $newQuery = "SELECT quantity , sold_quantity FROM loose_stock_p WHERE medicine_id='$medicineId'";
    $result = $con->query($newQuery);
    // echo json_encode($con->error);
    $result = $result->fetch_assoc();
    $resultQuantity = intval($result['quantity']);
    $resultSoldQuantity = intval($result['sold_quantity']);
    $status = "";
    $newAmount = $resultSoldQuantity + $pack_quantity;
    if ($newAmount >= $resultQuantity) {
        $status = "sold out";
    } else {
        $status = "added";
    }
    if ($pack_quantity <= $resultQuantity) {
        $newAmount = $resultSoldQuantity + $pack_quantity;
        $query = " UPDATE loose_stock_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' ";
        $result = $con->query($query);
        // echo json_encode($con->error);
    } else {
        $changedQuery = true;
        $remainQuantity = $resultQuantity - $resultSoldQuantity;
        $quantityNeededFromMain = $pack_quantity - $remainQuantity;
        $date = date("Y-m-d");
        $query = "UPDATE loose_stock_p SET quantity='$resultQuantity' , status='sold out', finish_date='$date' , sold_quantity='$resultQuantity' WHERE medicine_id='$medicineId' ";
        // $query= "INSERT INTO loose_stock_p values (default,'$medicineId','$resultQuantity','1','$date','sold out','$date','$resultQuantity')";
        $con->query($query);
        // echo json_encode($con->error);


        $newQuery = "SELECT packs_quantity , sold_quantity FROM medicine_information_p WHERE medicine_id='$medicineId'";
        $result = $con->query($newQuery);
        // echo json_encode($con->error);
        $result = $result->fetch_assoc();
        $resultPacksQuantityM = intval($result['packs_quantity']);
        $resultSoldQuantityM = intval($result['sold_quantity']);
        $status = "";
        $newAmount = $resultSoldQuantityM + $quantityNeededFromMain;
        if ($newAmount >= $resultPacksQuantityM) {
            $status = "sold out";
        } else {
            $status = "added";
        }

        $query = " UPDATE medicine_information_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' ";
        $con->query($query);
        // echo json_encode($con->error);
        // $response=array("status"=>true,"modal"=>TRUE,"quantity needed"=>$quantityNeededFromMain,"medicine_id"=>$medicineId);
        $query = "INSERT INTO loose_stock_p values (default,'$medicineId','$quantityNeededFromMain','1','$date','sold out','$date','$quantityNeededFromMain')";
        $con->query($query);
        array_push($response, array("quantity_needed" => $quantityNeededFromMain-$quantityToCut, "medicine_id" => $medicineId));
        // echo json_encode($response);

    }


    // // echo json_encode($con->error);
    // echo json_encode($result);
}
if ($con->error === "" && $changedQuery) {
    // array_unshift($response,array("status"=>true,"modal"=>TRUE));x
    echo json_encode(array("status" => true, "modal" => TRUE, "data" => $response));
} else if ($con->error === "") {
    $response = array("status" => true, "modal" => FALSE);
    echo json_encode($response);
} else {
    $response = array("status" => FALSE, "modal" => FALSE);
    echo json_encode($response);
}
