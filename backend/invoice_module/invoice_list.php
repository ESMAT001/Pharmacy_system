<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';


$query= "select *,province.province_name as real_province,floor(sum(invoice_medicine_list_p.pack_quantity*(invoice_medicine_list_p.sell_price-((invoice_medicine_list_p.sell_price*invoice_medicine_list_p.discount)/100)))) as total from invoice_p INNER join invoice_medicine_list_p on invoice_p.invoice_id=invoice_medicine_list_p.invoice_id INNER join customer_p on customer_p.customer_id=invoice_p.customer_id INNER join visitor_p on visitor_p.visitor_id=invoice_p.visitor_id INNER join province on province.province_id=customer_p.province_id group by invoice_p.invoice_id desc";

$result = $con->query($query);
$data=array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    // array_push($data,array(
    //     "invoice_id"=>$row["invoice_id"],
    //     "book_page_no"=>$row["book_page_no"],
    //     "total_amount"=>$row["total_amount"],
    //     "invoice_date"=>$row["invoice_date"],
    //     "user_id"=>$row["user_id"],
    //     "customer_name"=>$row["customer_name"],
    //     "name"=>$row["name"],
    //     "last_name"=>$row["last_name"]
    // ));
    array_push($data,$row);
  }
} else {
  echo "0 results";
}

if($con->error===""){
    echo json_encode(array("status"=>true,"data"=>$data));
}else{
    $response=array("status"=>FALSE);
    echo json_encode($response);
}

$con->close();
