<?php
  require('functions.php');
  require('connect.php');

    $sql = "select * from participantes";

    if($res = mysqli_query($conn,$sql)){
    $rows = array();
      while($r = mysqli_fetch_assoc($res)) {
        $rows['users'][] = $r;
      }
      respHttp(json_encode($rows),200);
    }else{
        respHttp("Erro",500);
    }
?>