<?php
  require('functions.php');
  require('connect.php');

  $_POST = json_decode(file_get_contents('php://input'), true);


if (!isset($_POST['user'])) {
    RespHttp("ERROR: Usuário não passado",200);
} else
 {
    $user = strtoupper($_POST['user']);
    $pass = $_POST['pass'];

    $sql = "select * from participantes where upper(login) = '$user' and password = '$pass'";

    if($res = mysqli_query($conn,$sql)){
        if(mysqli_num_rows($res)>0){
            $r = mysqli_fetch_assoc($res);
            RespHttp($r,200);
        }else{
            respHttp("Nenhum usuário encontrado ".$sql,401);
        }
    }else{
        respHttp("Erro ao tentar buscar o usuário.",500);
    }
}

?>