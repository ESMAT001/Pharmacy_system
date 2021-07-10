<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";




$select_main_stock_quantity=mysqli_query($con,"select sum(medicine_information_p.packs_quantity-medicine_information_p.sold_quantity) as main_stock_quantity from medicine_information_p");

$total_quantity_in_stock=0;
foreach($select_main_stock_quantity as $se){
    $total_quantity_in_stock=$se['main_stock_quantity'];
}

$select_worth=mysqli_query($con,"select sum(medicine_information_p.cost_price*(medicine_information_p.packs_quantity-medicine_information_p.sold_quantity)) as worth from medicine_information_p");
$total_worth_of_stock=0;
foreach($select_worth as $se){
$total_worth_of_stock=$se['worth'];
}


$ledt_in_loose=mysqli_query($con,"SELECT sum(loose_stock_p.quantity-loose_stock_p.sold_quantity) as left_in_loose from loose_stock_p");
$left_in_loose_stock=0;
foreach($ledt_in_loose as $le){
    $left_in_loose_stock=$le['left_in_loose'];
}

$left_in_loose_worth=mysqli_query($con,"SELECT sum(medicine_information_p.cost_price *(loose_stock_p.quantity-loose_stock_p.sold_quantity)) as worth_of_loose from loose_stock_p INNER JOIN medicine_information_p on medicine_information_p.medicine_info_id=loose_stock_p.medicine_information_id");

$worth_of_loose_stock=0;

foreach($left_in_loose_worth as $le){
    $worth_of_loose_stock=$le['worth_of_loose'];
}

echo json_encode(array("quantity_left_in_main_stock"=>$total_quantity_in_stock,"worth_of_main_stock"=>$total_worth_of_stock,"quantity_left_loose_stock"=>$left_in_loose_stock,"worth_of_loose_stock"=>$worth_of_loose_stock));







?>