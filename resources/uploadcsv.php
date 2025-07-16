<?php


require_once 'utilities.php';


$RunQuery = new QueryControllers();
$SecurityQuery = new Security(); 

if (empty($_FILES['filer']['name'])) {
   $errorMSG= "EMPTY FIELD";
} else {
    $cv = $_FILES['filer']['name'];
  
}
if(!empty($cv)){
// $file_to_attach = $_FILES['filer']['tmp_name'];
    

 $file = $_FILES["filer"]["tmp_name"];
 $file_open = fopen($file,"r");
 while(($csv = fgetcsv($file_open, 1000, ",")) !== false)
 {
     
   $columns[] = 'client_id';
   $columns[] = 'user_id';
   $columns[] = 'client_name';
   $columns[] = 'card_branch';
   $columns[] = 'acc';
   $columns[] = 'upload_date';
     
     
   $values[] =$csv[0];
   $values[] =$_SESSION['ccc_username'];
   $values[] =$csv[1];
   $values[] =$csv[2];
   $values[] =$csv[3];
   $values[] = date('Y-m-d H:i:s',STRTOTIME(date('h:i:sa')));
    
$InsertQuery = $RunQuery->InsertData('card_transfers',$columns,$values);
 }
    if ($InsertQuery ===true){
    $errorMSG= "YOUR CARDS WERE UPLOADED  SUCCESSFULLY";
     $error_msg=[0,$errorMSG];
      echo json_encode($error_msg);
//        echo'<script>swal({
//                         title: "SUCCESS",
//                         text:"FILE PROCESSED SUCCESSFULLY",
//                         type: "success"
//                         });
//                    </script>
//                    
//                    
//                    
//                    ';
    }else {
           $errorMSG=  "Upload Failed  ".$InsertQuery;
     $error_msg=[1,$errorMSG];
      echo json_encode($error_msg);
    }
}
else {
   $errorMSG=  "Upload Failed CSV EMPTY " ;
     $error_msg=[1,$errorMSG];
      echo json_encode($error_msg);
//echo'<script>swal({
//                         title: "FAILED",
//                         text:"FILE WASN"T PROCESSED,
//                         type: "error"
//                         });
//                    </script>
//                    
//                    
//                    
//                    ';
                    }
?>