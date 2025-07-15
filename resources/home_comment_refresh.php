<?php
  require_once( "utilities.php" );
//if($_GET[ 'last_id' ]==''){
//   $last_id=0; 
//}
  $post_id = intval( $_GET[ 'post_id' ] );
  $limi = intval( $_GET[ 'limi' ] );
  $jsonData = postal::gethomecomments($post_id,$limi);
  print $jsonData;
?>