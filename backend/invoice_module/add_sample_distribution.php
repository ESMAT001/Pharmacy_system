<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);
//start of sample distribution
// dis_id	description	medicine_id	quantity	dis_date	total_amount

// description,
// medicine_name: medInfo[1],
// medicine_id: medInfo[0],
// quantity: medicineQuantity,
// finalPrice: costPriceValue,


for ($i = 0; $i < count($data); $i++) {
    $medicineId = $data[$i]['medicine_id'];
    $quantity = intval($data[$i]['quantity']);
    $description = $data[$i]["description"];
    $total_amount = $data[$i]["finalPrice"];
    $dis_date = date("Y-m-d");
    $query = "INSERT INTO `sample_distribution_p` VALUES (default,'$description','$medicineId','$quantity','$dis_date','$total_amount',null)";
    $con->query($query);
    $last_id = $con->insert_id;



    $query = "";
    $response = array();
    $changedQuery = false;

    $medicineId = $data[$i]['medicine_id'];
    $pack_quantity = intval($data[$i]['quantity']);
    $newQuery = "SELECT quantity , sold_quantity FROM loose_stock_p WHERE medicine_id='$medicineId' AND status='added'";
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
    if ($newAmount <= $resultQuantity) {

        $newQuery = "SELECT packs_quantity , sold_quantity,medicine_info_id FROM medicine_information_p WHERE medicine_id='$medicineId' AND status='added' ORDER BY `medicine_info_id` ASC ";
        $result = $con->query($newQuery);
        $row = $result->fetch_assoc();
        $medInfoId = $row['medicine_info_id'];

        $newAmount = $resultSoldQuantity + $pack_quantity;
        $query = " UPDATE loose_stock_p SET status='$status', medicine_information_id='$medInfoId' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' AND status='added'";
        $result = $con->query($query);


        $query = "UPDATE sample_distribution_p set medicine_information_id='$medInfoId' WHERE dis_id='$last_id'";
        $con->query($query);


        // echo json_encode($con->error);
    } else {
        $changedQuery = true;
        $remainQuantity = $resultQuantity - $resultSoldQuantity;

        $quantityNeededFromMain = $pack_quantity - $remainQuantity;

        $quantityNeededFromMainForEndResult = $quantityNeededFromMain;

        $date = date("Y-m-d");
        $query = "UPDATE loose_stock_p SET quantity='$resultQuantity' , status='sold out', finish_date='$date' , sold_quantity='$resultQuantity' WHERE medicine_id='$medicineId' AND status='added' ";
        // $query= "INSERT INTO loose_stock_p values (default,'$medicineId','$resultQuantity','1','$date','sold out','$date','$resultQuantity')";
        $con->query($query);
        // echo json_encode($con->error);



        $newQuery = "SELECT packs_quantity , sold_quantity, medicine_info_id FROM medicine_information_p WHERE medicine_id='$medicineId' AND status='added' ORDER BY `medicine_info_id` ASC ";
        $result = $con->query($newQuery);
        // echo json_encode($con->error);
        $medInfoId = "";
        while ($row = $result->fetch_assoc()) {
            $resultPacksQuantityM = intval($row['packs_quantity']);
            $resultSoldQuantityM = intval($row['sold_quantity']);
            $newAmountM = $resultPacksQuantityM - $resultSoldQuantityM;
            if ($newAmountM >= $quantityNeededFromMain) {
                $medInfoId = $row['medicine_info_id'];
                $status = "";
                $newAmount = $resultSoldQuantityM + $quantityNeededFromMain;
                if ($newAmount >= $resultPacksQuantityM) {
                    $status = "sold out";
                } else {
                    $status = "added";
                }

                $query = " UPDATE medicine_information_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' AND medicine_info_id='$medInfoId' ";
                $con->query($query);

                $query = "INSERT INTO loose_stock_p values (default,'$medicineId','$quantityNeededFromMain','1','$date','sold out','$date','$quantityNeededFromMain','$medInfoId')";
                $con->query($query);
                break;
            } else {
                $medInfoId = $row['medicine_info_id'];

                $newAmountNew = $quantityNeededFromMain - $newAmountM;
                // $quantityNeededFromMain = $quantityNeededFromMain - $newAmountM;
                $valueToBeInserted = $quantityNeededFromMain - $newAmountNew;
                $status = "sold out";

                if ($newAmount >= $valueToBeInserted) {
                    $status = "sold out";
                } else {
                    $status = "added";
                }
                $query = " UPDATE medicine_information_p SET status='$status' , sold_quantity=sold_quantity+'$valueToBeInserted' WHERE medicine_id='$medicineId' AND medicine_info_id='$medInfoId' ";
                $con->query($query);

                $query = "INSERT INTO loose_stock_p values (default,'$medicineId','$valueToBeInserted','1','$date','sold out','$date','$valueToBeInserted','$medInfoId')";
                $con->query($query);


                $quantityNeededFromMain = $quantityNeededFromMain - $valueToBeInserted;
            }
        }
        $query = "UPDATE sample_distribution_p set medicine_information_id='$medInfoId' WHERE dis_id='$last_id'";
        $con->query($query);
        // echo json_encode($con->error);
        // $response=array("status"=>true,"modal"=>TRUE,"quantity needed"=>$quantityNeededFromMain,"medicine_id"=>$medicineId);

        array_push($response, array("quantity_needed" => $quantityNeededFromMainForEndResult, "medicine_id" => $medicineId));
        // echo json_encode($response);

    }


    // // echo json_encode($con->error);
    // echo json_encode($result);

}


//end of sample distribution



if ($con->error === "" && $changedQuery) {
    // array_unshift($response,array("status"=>true,"modal"=>TRUE));x
    echo json_encode(array("status" => true, "modal" => TRUE, "data" => $response));
} else if ($con->error === "") {
    $response = array("status" => true, "modal" => FALSE);
    echo json_encode($response);
} else {
    $response = array("status" => FALSE, "modal" => FALSE,"error"=>$con->error);
    echo json_encode($response);
}
$con->close();

//         $newQuery = "SELECT packs_quantity , sold_quantity FROM medicine_information_p WHERE medicine_id='$medicineId' ";
//         $result = $con->query($newQuery);
//         // echo json_encode($con->error);
//         $result = $result->fetch_assoc();
//         $resultPacksQuantityM = intval($result['packs_quantity']);
//         $resultSoldQuantityM = intval($result['sold_quantity']);
//         $status = "";
//         $newAmount = $resultSoldQuantityM + $quantityNeededFromMain;
//         if ($newAmount >= $resultPacksQuantityM) {
//             $status = "sold out";
//         } else {
//             $status = "added";
//         }

//         $query = " UPDATE medicine_information_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' ";
//         $con->query($query);
//         // echo json_encode($con->error);
//         // $response=array("status"=>true,"modal"=>TRUE,"quantity needed"=>$quantityNeededFromMain,"medicine_id"=>$medicineId);
//         $query = "INSERT INTO loose_stock_p values (default,'$medicineId','$quantityNeededFromMain','1','$date','sold out','$date','$quantityNeededFromMain')";
//         $con->query($query);
//         array_push($response, array("quantity_needed" => $quantityNeededFromMain, "medicine_id" => $medicineId));
//         // echo json_encode($response);

//     }


//     // // echo json_encode($con->error);
//     // echo json_encode($result);
// }
// if ($con->error === "" && $changedQuery) {
//     // array_unshift($response,array("status"=>true,"modal"=>TRUE));x
//     echo json_encode(array("status" => true, "modal" => TRUE, "data" => $response));
// } else if ($con->error === "") {
//     $response = array("status" => true, "modal" => FALSE);
//     echo json_encode($response);
// } else {
//     $response = array("status" => FALSE, "modal" => FALSE);
//     echo json_encode($response);
// }
