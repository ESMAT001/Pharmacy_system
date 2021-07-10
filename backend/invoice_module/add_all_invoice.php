<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';
error_reporting(0);

$data = json_decode(file_get_contents("php://input"), true);

// foreach ($data as $key) {
//    $query."(default,".$key['user_id'].",)";
// }
// bookPageNo:bookPageNo,
// userId:userId,
// medicineName: medInfo[0],
// medicineId: medInfo[1],
// sellQuantity: sellQuantity,
// sellPrice: sellPrice,
// discount: discount,
// finalPrice: finalPrice

$customer_id = $data[0]['userId'];
$book_page_no = $data[0]['bookPageNo'];
$user_id = 1;
$visitor_id = $data[0]['visitor'];
$status = "sold";
$invoice_date = date("Y-m-d");
$total_amount = 0;



if (!empty($customer_id)) {
    for ($i = 0; $i < count($data); $i++) {
        $total_amount = $total_amount + intval($data[$i]['sellQuantity']);
    }


    $query = "INSERT INTO invoice_p(invoice_id,customer_id,book_page_no,user_id,visitor_id,total_amount,invoice_date,status
) values (default,'$customer_id','$book_page_no','$user_id','$visitor_id','$total_amount','$invoice_date','$status') ";

    // invoice_medicine_list_id	medicine_id	pack_quantity	sell_price	discount	invoice_id	status

    $changedQuery = false;
    $response = array();


    // start new/////////////////////////////////////////////////
    $invoice_ids = array();
    if ($con->query($query) === TRUE) { //start of new
        $last_id = $con->insert_id;


        //  lose STOCK
        $query = "";

        for ($i = 0; $i < count($data); $i++) {
            $medicineId = $data[$i]['medicineId'];
            $medicineInfoId = $data[$i]['medicineInfoId'];

            $pack_quantity = intval($data[$i]['sellQuantity']);

            $newQuery = "SELECT loose_stock_id,quantity , sold_quantity FROM loose_stock_p WHERE medicine_id='$medicineId' AND status='added' AND medicine_information_id = '$medicineInfoId' ";
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

                $newQuery = "SELECT packs_quantity , sold_quantity, medicine_info_id FROM medicine_information_p WHERE medicine_id='$medicineId' AND status='added'  AND medicine_info_id = '$medicineInfoId' ORDER BY `medicine_info_id` ASC ";
                $result = $con->query($newQuery);
                $row = $result->fetch_assoc();
                $medInfoId = $row['medicine_info_id'];


                $newAmount = $resultSoldQuantity + $pack_quantity;
                $query = "UPDATE loose_stock_p SET status='$status' ,medicine_information_id='$medInfoId', sold_quantity='$newAmount' WHERE medicine_id='$medicineId' AND status='added' ";
                $result = $con->query($query);
                // echo json_encode($con->error);


                //NEW PART
                $query = "INSERT INTO invoice_medicine_list_p VALUES ";
                $sell_price = $data[$i]['sellPrice'];
                $discount = $data[$i]['discount'];
                $query .= "(default,'$medicineId','$newAmount','$sell_price','$discount','$last_id','sold',LAST_INSERT_ID()) ";
                $result = $con->query($query);
                //END NEWPART 




            } else {
                $changedQuery = true;
                $remainQuantity = $resultQuantity - $resultSoldQuantity;
                $quantityNeededFromMain = $pack_quantity - $remainQuantity;
                $quantityNeededFromMainForEndResult = $quantityNeededFromMain;
                $date = date("Y-m-d");
                $query = "UPDATE loose_stock_p SET quantity='$resultQuantity' , status='sold out', finish_date='$date' , sold_quantity='$resultQuantity' WHERE medicine_id='$medicineId' AND status='added' AND medicine_information_id = '$medicineInfoId'";
                // $query= "INSERT INTO loose_stock_p values (default,'$medicineId','$resultQuantity','1','$date','sold out','$date','$resultQuantity')";
                $con->query($query);
                // echo json_encode($con->error);


                $newQuery = "SELECT packs_quantity , sold_quantity , medicine_info_id FROM medicine_information_p WHERE medicine_id='$medicineId' AND status='added' AND medicine_info_id = '$medicineInfoId' ORDER BY `medicine_info_id` ASC ";
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


                        //NEW PART
                        $last_loose_stock_id =  $con->insert_id;
                        $query = "INSERT INTO invoice_medicine_list_p VALUES ";
                        $sell_price = $data[$i]['sellPrice'];
                        $discount = $data[$i]['discount'];
                        $query .= "(default,'$medicineId','$quantityNeededFromMain','$sell_price','$discount','$last_id','sold','$last_loose_stock_id') ";
                        $result = $con->query($query);
                        //END NEWPART 


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

                        //NEW PART
                        $last_loose_stock_id =  $con->insert_id;
                        $query = "INSERT INTO invoice_medicine_list_p VALUES ";
                        $sell_price = $data[$i]['sellPrice'];
                        $discount = $data[$i]['discount'];
                        $query .= "(default,'$medicineId','$valueToBeInserted','$sell_price','$discount','$last_id','sold','$last_loose_stock_id') ";
                        $con->query($query);
                        //END NEWPART 


                        $quantityNeededFromMain = $quantityNeededFromMain - $valueToBeInserted;
                    }
                }



                array_push($response, array("quantity_needed" => $quantityNeededFromMainForEndResult, "medicine_id" => $medicineId));
                // echo json_encode($response);

            }

            //start new part/////////////////////////////////////////////////


            //   $query2 = "SELECT loose_stock_id FROM `loose_stock_p` WHERE medicine_id='$medicineId' order by loose_stock_id desc";
            //   $result = $con->query($query2);
            //   $result = $result->fetch_assoc();
            //   $loose_stock_id = $result['loose_stock_id'];
            //   $extra_id = $invoice_ids[$i];
            //   $extraQuery = "UPDATE invoice_medicine_list_p SET loose_stock_id='$loose_stock_id' WHERE invoice_medicine_list_id='$extra_id'";
            //   $con->query($extraQuery);


            //end new part/////////////////////////////////////////////////////







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
            $response = array("status" => FALSE, "modal" => FALSE, "error" => $con->error);
            echo json_encode($response);
        }
    } else {
        // echo json_encode("hello");
        $response = array("status" => FALSE, "modal" => FALSE);
        echo json_encode($response);
    }
}
$con->close();


// echo json_encode($query);
