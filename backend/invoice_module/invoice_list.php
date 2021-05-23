<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include '../config.php';


$query= "SELECT i.invoice_id, i.book_page_no, i.total_amount,i.invoice_date,i.user_id,c.customer_name,v.name,v.last_name FROM `invoice_p` as i INNER JOIN customer_p as c ON i.customer_id=c.customer_id INNER JOIN visitor_p as v on v.visitor_id= i.visitor_id ORDER BY i.invoice_date";

$result = $con->query($query);
$data=array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($data,array(
        "invoice_id"=>$row["invoice_id"],
        "book_page_no"=>$row["book_page_no"],
        "total_amount"=>$row["total_amount"],
        "invoice_date"=>$row["invoice_date"],
        "user_id"=>$row["user_id"],
        "customer_name"=>$row["customer_name"],
        "name"=>$row["name"],
        "last_name"=>$row["last_name"]
    ));
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
