<?php
  require('functions.php');
  require('connect.php');
  $user = $_POST['user'];

    $sql = "select * from participantes where upper(login) = upper('$user')";

    if($res = mysqli_query($conn,$sql)){
        if(mysqli_num_rows($res)>0){
            RespHttp("usuário já cadastrado",400);
        }else{
            respHttp("Usuário disponível $sql",200);
        }
    }else{
        respHttp("Erro ao tentar buscar o usuário.",400);
    }
?>