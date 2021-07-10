<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);


$date=$userData['date'];
$select=mysqli_query($con,"select *,customer_p.address as customer_address from ledger_recipt_p INNER JOIN customer_p on customer_p.customer_id=ledger_recipt_p.customer_id INNER JOIN visitor_p on visitor_p.visitor_id=ledger_recipt_p.visitor_id  where recipt_date like '$date"."-%"."' order by recipt_date desc");
$list=array();
foreach($select as $se){
    $list[]=$se;
}
echo json_encode($list);





?>