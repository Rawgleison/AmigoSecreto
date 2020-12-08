<?php
function RespHttp($msg, $cod){
  require('headers.php');
  http_response_code($cod);
  die(json_encode($msg));
}
?>