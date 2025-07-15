<?php
  require_once( "utilities.php" );
//if($_GET[ 'last_id' ]==''){
//   $last_id=0; 
//}
  $last_id = intval( $_GET[ 'last_id' ] );
  $jsonData = postal::getpost($last_id);
  print $jsonData;
?>