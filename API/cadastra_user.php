<?php
  require('functions.php');
  require('connect.php');
  $_POST = json_decode(file_get_contents('php://input'), true);

//   var_dump($_POST['nome'];

//   exit;

  $nome=$_POST['nome'];
  $telefone=$_POST['fone'];
  $familia=$_POST['familia'];
  $login=$_POST['login'];
  $password=$_POST['senha'];
  $num_calcado=$_POST['numCalcado'];
  $tam_blusa=$_POST['tamBlusa'];
  $tam_calca=$_POST['numCalca'];
  $sugestoes=$_POST['sugestoes'];

    $sql = "insert into participantes(nome,telefone,familia,login,password,num_calcado,tam_blusa,tam_calca,sugestoes)
    values('$nome','$telefone','$familia','$login','$password',$num_calcado,'$tam_blusa','$tam_calca','$sugestoes')";

    if(mysqli_query($conn,$sql)){
        RespHttp("usuário cadastrado com sucesso",200);
    }else{
        RespHttp("Error: " . $sql . "<br>" . mysqli_error($conn),500);
    }
?>