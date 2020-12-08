<?php
  require('functions.php');
  require('connect.php');
  $_POST = json_decode(file_get_contents('php://input'), true);

//   var_dump($_POST['nome'];

//   exit;

  $id=$_POST['id'];
  $nome=$_POST['nome'];
  $telefone=$_POST['telefone'];
  $familia=$_POST['familia'];
  $login=$_POST['login'];
  $password=$_POST['senha'];
  $num_calcado=$_POST['num_calcado'];
  $tam_blusa=$_POST['tam_blusa'];
  $tam_calca=$_POST['tam_calca'];
  $idade=$_POST['idade'];
  $sugestoes=$_POST['sugestoes'];
  
  if($num_calcado == null){
      $num_calcado = 0;
  }
  if($id == null){
    $sql = "insert into participantes(nome,telefone,familia,login,password,num_calcado,tam_blusa,tam_calca,idade,sugestoes)
    values('$nome','$telefone','$familia','$login','$password',$num_calcado,'$tam_blusa','$tam_calca','$idade','$sugestoes')";
  }else{
    $sql = "update participantes set
            nome = '$nome',
            telefone = '$telefone',
            familia = '$familia',
            login = '$login',
            password = '$password',
            num_calcado = '$num_calcado',
            tam_blusa = '$tam_blusa',
            tam_calca = '$tam_calca',
            idade = '$idade',
            sugestoes = '$sugestoes'
            where id = $id";
  }

    if(mysqli_query($conn,$sql)){
        RespHttp("usuário cadastrado/alterado com sucesso",200);
    }else{
        RespHttp("Error: " . $sql . "<br>" . mysqli_error($conn),500);
    }
?>