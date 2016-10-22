<?php
/* 
 * File Name: fc-login.php
 * Date: 22 Oct 16
 * Programmer: Jaymes Young-Liebgott
 */

require 'db-constants.php';
require '..//classes/database.php';

// Set content ype to json
header('content-type: application/json; charset=utf-8');

// Databse connection
$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$mySqli->getConnection();
  
$arr_response = [];

//print_r($_POST);
//exit();

$user = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

if ($user) {
  // Verbs
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  $sql = "SELECT  learner, learner_pass FROM fc_learners WHERE learner = '{$user}'";
  $result = $mySqli->handleQuery($sql);
  
  if($result->num_rows) {
    $row = $result->fetch_assoc();
    
    // Verify password
    if ($row['learner_pass'] === $password) {
        $arr_response['success'] = 'true';
    }
    
    
  } else {
    $arr_response['success'] = 'false';
  }


  // Encode arrays
  $json = json_encode($arr_response);
  echo $json;
  exit();  
  
} else {
  
  $arr_response['success'] = 'false';

  // Encode arrays
  $json = json_encode($arr_response);
  echo $json;
  exit();
}
