<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Header,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include "../config.php";

$userData = json_decode(file_get_contents("php://input"),true);
$email=$userData['email'];
$password=$userData['password'];

if(!empty($email)){


    $select_count_of_users="select count(user_id) as total from users_p where email='$email'";
    $query=mysqli_query($con,$select_count_of_users);
    $count_user=0;
    foreach($query as $se){
        $count_user= $se['total'];
    }
    if($count_user>0){
    echo json_encode(array("status"=>"exist"));


    }else{
        $password_ecrypt=md5($password);
        $insert="insert into users_p values(null,'$email','$password_ecrypt','added')";
        if($con->query($insert)){
            echo json_encode(array("status"=>"true"));
        }else{
            echo json_encode(array("status"=>"false"));

        }

    }
  
}













?>