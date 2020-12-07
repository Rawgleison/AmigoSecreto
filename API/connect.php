<?php
$user = "root";
$password = "";
$host = "localhost";
$banco = "amigo_secreto";

$conn = mysqli_connect("$host", "$user", "$password","$banco") or die("Erro: Problemas de conexão ao servidor. Aguarde alguns minutos e tente novamente.");

?>
