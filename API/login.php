<?php
  require('functions.php');
  require('connect.php');

if (!isset($_SERVER['PHP_AUTH_USER'])) {
    RespHttp("",200);
} else {
    $user = strtoupper($_SERVER['PHP_AUTH_USER']);
    $pass = $_SERVER['PHP_AUTH_PW'];

    $sql = "select * from participantes where ((upper(nome) = '$user') or (telefone = '$user')) and password = '$pass'";

    if($res = mysqli_query($conn,$sql)){
        if(mysqli_num_rows($res)>0){
            RespHttp("Sucesso $user com senha $pass",200);
        }else{
            respHttp("Nenhum usuário encontrado",401);
        }
    }else{
        respHttp("Erro ao tentar buscar o usuário.",400);
    }
}
?>