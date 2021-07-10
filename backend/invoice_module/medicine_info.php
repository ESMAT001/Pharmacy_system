<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


$userData = json_decode(file_get_contents("php://input"), true);

$medicine_id = $userData['medicineId'];
include "../config.php";

$newQuery = "SELECT batch_no , medicine_info_id from `medicine_information_p` WHERE medicine_id='$medicine_id' and status='added'";
// $newQuery = "SELECT * from `medicine_information_p`";
$batchNums = $con->query($newQuery);
$medicines = array();
if ($batchNums->num_rows > 0) {
    // output data of each row
    while ($row = $batchNums->fetch_assoc()) {
        $tempMedicineInfoId = $row["medicine_info_id"];
        $remain = 0;
        // $remian_medicine = mysqli_query($con, );

        $newQuery = "SELECT sum(packs_quantity)-sum(sold_quantity) as remain FROM `medicine_information_p` WHERE medicine_id='$medicine_id' and status='added' and medicine_info_id=' $tempMedicineInfoId' ";
        $result1 = $con->query($newQuery);

        while ($tempRow=$result1->fetch_assoc()) {
            $remain += intval($tempRow['remain']);
        }

        $newQuery =  "SELECT sum(quantity)-sum(sold_quantity) as remain FROM `loose_stock_p` WHERE medicine_id='$medicine_id' AND status='added' and medicine_information_id=' $tempMedicineInfoId' ";
        $result2 = $con->query($newQuery);

        while ($tempRow=$result2->fetch_assoc()) {
            $remain += intval($tempRow['remain']);
        }

        $newQuery = "SELECT *  FROM `medicine_information_p` as mip inner join medicine_p as mp on mip.medicine_id = mp.medicine_id  WHERE mip.medicine_id='$medicine_id' and mip.status='added' and mip.medicine_info_id=' $tempMedicineInfoId'";
        $result = $con->query($newQuery);
        // echo json_encode($con->error);
        $result = $result->fetch_assoc();
        array_push(
            $medicines,
            array(
                'remain' => $remain,
                'medInfo' => $result,
            )
        );
    }
}



// foreach ($batchNums as $batchNum) {
//    
// }


$response = array("status" => true, "medData" => $medicines, "medicine_id" => $medicine_id);
// $response = array("status" => "true", "medData" => $batchNums);
echo json_encode($response);
