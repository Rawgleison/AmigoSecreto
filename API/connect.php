<?php
$user = "raulguer_db";
$password = "pereira2021";
$host = "raul.guerreirossuplementos.com.br";
$banco = "raulguer_amigo_secreto";

// $user = "root";
// $password = "";
// $host = "localhost";
// $banco = "amigo_secreto";

$conn = mysqli_connect("$host", "$user", "$password","$banco") or RespHttp("Erro: Problemas de conexão ao servidor. ".mysqli_connect_error(),500);
$conn->set_charset("utf8");

?>
