<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include "../config.php";


?>

<?php
$userData = json_decode(file_get_contents("php://input"),true);
$list=array();
foreach ($userData as $user) {
	medicineCalculator($user['medicineId'],$user['sellQuantity']);
	
}
$response=array("status"=>"true");
echo json_encode($response);

function medicineCalculator($medicine_id,$sell_quantity){
include "../config.php";
$today_date=date("Y-m-d");
	$select=mysqli_query($con,"select sum(packs_quantity)-sum(sold_quantity) as quantity_medicine from medicine_information_p where  medicine_id='$medicine_id' and status='added'");
	$medicine_quantity_in_stock=0;
	foreach ($select as $s) {
		 $medicine_quantity_in_stock=$s['quantity_medicine'];
	}

	$min_id_and_qunatity=medicine_quantity_finder($medicine_id);
	if(intval($min_id_and_qunatity['quantity'])==$sell_quantity){
		$min_id=$min_id_and_qunatity['min_id'];
		$update_data="update medicine_information_p set sold_quantity=sold_quantity+'$sell_quantity',status='sold out' where medicine_info_id='$min_id'";
		if($con->query($update_data)==TRUE){
			$insert_data="insert into loose_stock_p values(null,'$medicine_id','$sell_quantity',1,'$today_date','added',null,0,'$min_id')";
			if($con->query($insert_data)==TRUE){
			
			}
	
		}
	
	}else{
		$qunatity_for_sell=$sell_quantity;
		
		while($qunatity_for_sell>0){
			$find_medicine_with_id=medicine_quantity_finder($medicine_id);
			$quantity_in_stock=$find_medicine_with_id['quantity'];
			$min_med_id=$find_medicine_with_id['min_id'];
			if($qunatity_for_sell>=$quantity_in_stock){
				$update_data="update medicine_information_p set sold_quantity=sold_quantity+'$quantity_in_stock',status='sold out' where medicine_info_id='$min_med_id'";
				if($con->query($update_data)){

					$insert_data="insert into loose_stock_p values(null,'$medicine_id','$quantity_in_stock',1,'$today_date','added',null,0,'$min_med_id')";
			if($con->query($insert_data)==TRUE){
				$qunatity_for_sell=$qunatity_for_sell-$quantity_in_stock;
			}
					
				}
			}
			else{
				$update_data="update medicine_information_p set sold_quantity=sold_quantity+'$qunatity_for_sell' where medicine_info_id='$min_med_id'";
				if($con->query($update_data)){
					$insert_data="insert into loose_stock_p values(null,'$medicine_id','$qunatity_for_sell',1,'$today_date','added',null,0,'$min_med_id')";
				if($con->query($insert_data)==TRUE){
						$qunatity_for_sell=0;
					}
				}
			}

		}

		
	

	}

	
	
	

}

function medicine_quantity_finder($medicine_id){

include "../config.php";
$select_medicine_id=mysqli_query($con,"select min(medicine_info_id) as min_id,packs_quantity-sold_quantity as remain from medicine_information_p where medicine_id='$medicine_id' and status='added'");

$min_id=0;
$quanity=0;
foreach($select_medicine_id as $se){
	$min_id=$se['min_id'];
	$quanity=$se['remain'];

}

return array("min_id"=>$min_id,"quantity"=>$quanity);

}



?>