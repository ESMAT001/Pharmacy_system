<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
include "../config.php";


$userData = json_decode(file_get_contents("php://input"),true);
$return_quantity=$userData['returnQuantity'];
$return_price=$userData['returnPrice'];
$customer_id=$userData['customerId'];
$cost_price=$userData['costPrice'];
$packs_quantity_in_invoice=$userData['packQuantityfromInvoice'];
$invoice_medicine_list_id=$userData['invoiceMedicineListId'];
$medicineId=$userData['medicineId'];
$loose_stock_id=$userData['looseStockId'];
$today=date("Y-m-d");
if(!empty($return_quantity)&& !empty($return_price)){
    $insert_in_return="insert into return_medicine_p values(null,'$medicineId','$invoice_medicine_list_id','$return_quantity','$cost_price','$customer_id','$today','$return_price')";
    if($con->query($insert_in_return)===TRUE){
        $update_invoice_list_table="update invoice_medicine_list_p set pack_quantity=pack_quantity-'$return_quantity' where invoice_medicine_list_id='$invoice_medicine_list_id'";
        if($con->query($update_invoice_list_table)===TRUE){
            $select=mysqli_query($con,"select medicine_information_id,loose_stock_date from loose_stock_p where loose_stock_id=(select loose_stock_id from invoice_medicine_list_p where invoice_medicine_list_id='$invoice_medicine_list_id')");
            $date_of_stock="";
            $medicine_information_id=0;
            foreach($select as $se){
                $date_of_stock=$se['loose_stock_date'];
                $medicine_information_id=$se['medicine_information_id'];
            }
            $insert_in_loose_stock="insert into loose_stock_p values(null,'$medicineId','$return_quantity',1,'$date_of_stock','added',null,0,'$medicine_information_id')";
            if($con->query($insert_in_loose_stock)===TRUE){
                echo json_encode(array("status"=>"true"));
            }else{
                echo json_encode(array("status"=>"false"));

            }


        }else{
    echo json_encode(array("status"=>"update invoice_information_p"));

        }
    }else{
    echo json_encode(array("status"=>"insert in return table"));

    }

}else{
    echo json_encode(array("status"=>"not empty check"));
}




?>