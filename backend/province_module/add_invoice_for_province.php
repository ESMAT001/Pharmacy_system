<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";
$today_date=date("Y-m-d");

$userData = json_decode(file_get_contents("php://input"),true);




if(!empty($userData)){

    $customer_id=0;
foreach($userData as $ua){
$customer_id=$ua['customerid'];

}


$invoice_id=insert_into_invoice_table($customer_id);

$result=further_operation($userData,$invoice_id);

if($result===TRUE){
    echo json_encode(array("status"=>"true"));
}else{

    echo json_encode(array("status"=>"false"));

}


}



function further_operation($data,$invoice_id){
    foreach($data as $da){
       insert_and_update_operation($da,$invoice_id);
    }

    return TRUE;

}

function insert_and_update_operation($data,$invoice_id){
include "../config.php";
$today_date=date("Y-m-d");

$medicine_id=intval($data['medicineId']);
$sell_quantity=intval($data['sellQuantity']);
$sell_price=intval($data['sellPrice']);
$discount=intval($data['discount']);


$new_invoice_id=intval($invoice_id);
   

    while($sell_quantity >0){
        $data_from_medicine_finder=main_stock_quantity_finder($medicine_id);
            $medicine_info_id=intval($data_from_medicine_finder[0]);
            $quantity_remain=intval($data_from_medicine_finder[1]);

            if($sell_quantity===$quantity_remain){
                $update_medicine_info="update medicine_information_p set sold_quantity=sold_quantity+'$sell_quantity',status='sold out' where medicine_info_id='$medicine_info_id'";

                if($con->query($update_medicine_info)===TRUE){
                    
                    $insert_in_loose_stock="insert into loose_stock_p values(null,'$medicine_id','$sell_quantity',1,'$today_date','sold out','$today_date','$sell_quantity','$medicine_info_id')";
                    if($con->query($insert_in_loose_stock)===TRUE){
                        $select_loose_id=mysqli_query($con,"select max(loose_stock_p.loose_stock_id) as loose_id from loose_stock_p where medicine_id='$medicine_id'");
                        $loose_stock_id=0;
                        foreach($select_loose_id as $sep){
                            $loose_stock_id=$sep['loose_id'];
                        }
                        if($loose_stock_id > 0){
                        $insert_in_invoice_information="insert into invoice_medicine_list_p values(null,'$medicine_id','$sell_quantity','$sell_price','$discount','$new_invoice_id','sold','$loose_stock_id')";
                        if($con->query($insert_in_invoice_information)){
                        $sell_quantity=$sell_quantity-$quantity_remain;

                    }
                        }

                }
                    
                }
            }
                else if($sell_quantity>$quantity_remain){
                    $update_medicine_info="update medicine_information_p set sold_quantity=sold_quantity+'$quantity_remain',status='sold out' where medicine_info_id='$medicine_info_id'";

                if($con->query($update_medicine_info)===TRUE){
                    
                    $insert_in_loose_stock="insert into loose_stock_p values(null,'$medicine_id','$quantity_remain',1,'$today_date','sold out','$today_date','$quantity_remain','$medicine_info_id')";
                    if($con->query($insert_in_loose_stock)===TRUE){
                        $select_loose_id=mysqli_query($con,"select max(loose_stock_p.loose_stock_id) as loose_id from loose_stock_p where medicine_id='$medicine_id'");
                        $loose_stock_id=0;
                        foreach($select_loose_id as $sep){
                            $loose_stock_id=$sep['loose_id'];
                        }
                        if($loose_stock_id > 0){
                        $insert_in_invoice_information="insert into invoice_medicine_list_p values(null,'$medicine_id','$quantity_remain','$sell_price','$discount','$new_invoice_id','sold','$loose_stock_id')";
                        if($con->query($insert_in_invoice_information)){
                        $sell_quantity=$sell_quantity-$quantity_remain;

                    }
                        }

                }
                    
                }

                }

                else if($sell_quantity<$quantity_remain){
                    $update_medicine_info="update medicine_information_p set sold_quantity=sold_quantity+'$sell_quantity' where medicine_info_id='$medicine_info_id'";

                if($con->query($update_medicine_info)===TRUE){
                    
                    $insert_in_loose_stock="insert into loose_stock_p values(null,'$medicine_id','$sell_quantity',1,'$today_date','sold out','$today_date','$sell_quantity','$medicine_info_id')";
                    if($con->query($insert_in_loose_stock)===TRUE){
                        $select_loose_id=mysqli_query($con,"select max(loose_stock_p.loose_stock_id) as loose_id from loose_stock_p where medicine_id='$medicine_id'");
                        $loose_stock_id=0;
                        foreach($select_loose_id as $sep){
                            $loose_stock_id=$sep['loose_id'];
                        }
                        if($loose_stock_id > 0){
                        $insert_in_invoice_information="insert into invoice_medicine_list_p values(null,'$medicine_id','$sell_quantity','$sell_price','$discount','$new_invoice_id','sold','$loose_stock_id')";
                        if($con->query($insert_in_invoice_information)){
                        $sell_quantity=0;

                    }
                        }

                }
                    
                }

                }













    }


    
}


function main_stock_quantity_finder($medicine_id){
    include "../config.php";

    $select_from_stock=mysqli_query($con,"select min(medicine_info_id) as id,(packs_quantity-sold_quantity) as remain from medicine_information_p where medicine_id='$medicine_id' and STATUS='added'");

$medicine_info_id=0;
$quantity_in_stock=0;

foreach($select_from_stock as $sf){
    $medicine_info_id=$sf['id'];
    $quantity_in_stock=$sf['remain'];
}

return array($medicine_info_id,$quantity_in_stock);
}


function insert_into_invoice_table($customer_id){
    include "../config.php";
    $today_date=date("Y-m-d");
    $insert_into="insert into invoice_p(invoice_id,customer_id,invoice_date) values(null,'$customer_id','$today_date')";
  
if($con->query($insert_into)===TRUE){

    $select_customer=mysqli_query($con,"select invoice_id from invoice_p where invoice_p.customer_id='$customer_id' order by invoice_p.invoice_id desc limit 1");
    $invoice_id=0;
    foreach($select_customer as $sp){
        $invoice_id=$sp['invoice_id'];
    }

    return $invoice_id;

}


}









?>