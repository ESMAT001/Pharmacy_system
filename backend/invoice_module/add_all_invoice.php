<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';

$data=json_decode(file_get_contents("php://input"),true);

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

$customer_id=$data[0]['userId'];
$book_page_no=$data[0]['bookPageNo'];
$user_id=1;
$visitor_id=$data[0]['visitor'];
$status="sold";
$invoice_date=date("Y-m-d");
$total_amount=0;
for ($i=0; $i <count($data) ; $i++) { 
    $total_amount= $total_amount + intval($data[$i]['finalPrice']);
 }


$query="INSERT INTO invoice_p(invoice_id,customer_id,book_page_no,user_id,visitor_id,total_amount,invoice_date,status
) values (default,'$customer_id','$book_page_no','$user_id','$visitor_id','$total_amount','$invoice_date','$status') ";

// invoice_medicine_list_id	medicine_id	pack_quantity	sell_price	discount	invoice_id	status

$changedQuery=false;
 
if($con->query($query)===TRUE){
    $last_id = $con->insert_id;
    $query = "INSERT INTO invoice_medicine_list_p VALUES ";
    $medicineId='';
    $pack_quantity="";
    for ($i=0; $i <count($data) ; $i++) { 
        $medicineId= intval($data[$i]['medicineId']);
        $pack_quantity=$data[$i]['sellQuantity'];
        $sell_price=$data[$i]['sellPrice'];
        $discount= $data[$i]['discount'];
        $status="sold";
        $query .= "(default,'$medicineId','$pack_quantity','$sell_price','$discount','$last_id','$status') ";
        if($i<count($data)-1){
            $query .= " , ";
        }
     }

     $result = $con->query($query);
     // echo json_encode($con->error);

    //  lose STOCK
     $query="";
     $response=array();
     for ($i=0; $i <count($data) ; $i++) { 
        $medicineId= $data[$i]['medicineId'];
        $pack_quantity=intval($data[$i]['sellQuantity']);
        $newQuery= "SELECT quantity , sold_quantity FROM loose_stock_p WHERE medicine_id='$medicineId'";
        $result = $con->query($newQuery);
        // echo json_encode($con->error);
        $result = $result->fetch_assoc();
        $resultQuantity= intval($result['quantity']);
        $resultSoldQuantity= intval($result['sold_quantity']);
        $status="";
        $newAmount= $resultSoldQuantity + $pack_quantity;
        if( $newAmount >= $resultQuantity){
            $status = "sold out";
        }else{
            $status = "added";
        }
        if($pack_quantity <= $resultQuantity){
            $newAmount= $resultSoldQuantity + $pack_quantity;
            $query = " UPDATE loose_stock_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' ";
            $result = $con->query($query);
            // echo json_encode($con->error);
        }else{
            $changedQuery=true;
            $remainQuantity = $resultQuantity - $resultSoldQuantity;
            $quantityNeededFromMain=$pack_quantity-$remainQuantity;
            $date=date("Y-m-d");
            $query= "INSERT INTO loose_stock_p values (default,'$medicineId','$resultQuantity','1','$date','sold out','$date','$resultQuantity')";
            $con->query($query);
            // echo json_encode($con->error);


            $newQuery= "SELECT packs_quantity , sold_quantity FROM medicine_information_p WHERE medicine_id='$medicineId'";
            $result = $con->query($newQuery);
            // echo json_encode($con->error);
            $result = $result->fetch_assoc();
            $resultPacksQuantityM= intval($result['packs_quantity']);
            $resultSoldQuantityM= intval($result['sold_quantity']);
            $status="";
            $newAmount = $resultSoldQuantityM + $quantityNeededFromMain;
            if( $newAmount >= $resultPacksQuantityM){
                $status = "sold out";
            }else{
                $status = "added";
            }

            $query = " UPDATE medicine_information_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' ";
            $con->query($query);
            // echo json_encode($con->error);
            // $response=array("status"=>true,"modal"=>TRUE,"quantity needed"=>$quantityNeededFromMain,"medicine_id"=>$medicineId);
            array_push($response,array("quantity_needed"=>$quantityNeededFromMain,"medicine_id"=>$medicineId));
            // echo json_encode($response);

        }
       
       
        // // echo json_encode($con->error);
        // echo json_encode($result);
     }

    // echo json_encode($response);


    //  $query='';
    //  for ($i=0; $i <count($data) ; $i++) { 
    //     $medicineId= $data[$i]['medicineId'];
    //     $pack_quantity=intval($data[$i]['sellQuantity']);
    //     $newQuery= "SELECT packs_quantity , sold_quantity FROM medicine_information_p WHERE medicine_id='$medicineId'";
    //     $result = $con->query($newQuery);
    //     $result = $result->fetch_assoc();
    //     $resultPacksQuantity= intval($result['packs_quantity']);
    //     $resultSoldQuantity= intval($result['sold_quantity']);
    //     $status="";
    //     $newAmount= $resultSoldQuantity + $pack_quantity;
    //     if( $newAmount >= $resultPacksQuantity){
    //         $status = "sold out";
    //     }else{
    //         $status = "added";
    //     }

    //     $query = " UPDATE medicine_information_p SET status='$status' , sold_quantity='$newAmount' WHERE medicine_id='$medicineId' ";
    //     $result = $con->query($query);
    //     // // echo json_encode($con->error);
    //     // echo json_encode($result);
    //  }
     
    if($con->error==="" && $changedQuery){
        // array_unshift($response,array("status"=>true,"modal"=>TRUE));x
        echo json_encode(array("status"=>true,"modal"=>TRUE,"data"=>$response));
    }else{
        $response=array("status"=>FALSE,"modal"=>FALSE);
        echo json_encode($response);
    }
   
    
}else{
    // echo json_encode($con->error);
    $response=array("status"=>FALSE,"modal"=>FALSE);
    echo json_encode($response);
}



// echo json_encode($query);



?>