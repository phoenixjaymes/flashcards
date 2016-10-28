<?php
/* 
 * File Name: fc-login.php
 * Date: 22 Oct 16
 * Programmer: Jaymes Young-Liebgott
 */

require 'db-constants.php';
require '../classes/database.php';

// Set content ype to json
header('content-type: application/json; charset=utf-8');

// Databse connection
$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$mySqli->getConnection();
  
$arr_response = [];

$learner = filter_input(INPUT_POST, 'learner', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Get row count from db
$sql = "SELECT  count(*) AS cnt FROM fc_learners";
$result = $mySqli->handleQuery($sql);
$row = $result->fetch_assoc();

// Send register as success if there are not rows in db and exit
if ($row['cnt'] === '0') {
  $arr_response['success'] = 'register';
  // Encode arrays
  $json = json_encode($arr_response);
  echo $json;
  exit();  
}

// Check for learner
if (!$learner || !$password) {
  $arr_response['success'] = 'incorrect';
} elseif ($learner && $password) {
  
  $sql = "SELECT  learner, learner_pass FROM fc_learners WHERE learner = '{$learner}'";
  $result = $mySqli->handleQuery($sql);
  
  if($result->num_rows) {
    $row = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $row['learner_pass'])) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = 'match';
    }
    
  } else {
    $arr_response['success'] = 'match';
  }

} else {
  $arr_response['success'] = false;
}

// Encode arrays
$json = json_encode($arr_response);
echo $json;
exit();  