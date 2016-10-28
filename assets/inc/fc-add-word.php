<?php
/* 
 * File Name: fc-login.php
 * Date: 23 Oct 16
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

$newlearner = filter_input(INPUT_POST, 'txtNewLearner', FILTER_SANITIZE_STRING);
$password1 = filter_input(INPUT_POST, 'txtPassword1', FILTER_SANITIZE_STRING);
$password2 = filter_input(INPUT_POST, 'txtPassword2', FILTER_SANITIZE_STRING);

if ($newlearner && $password1 && $password2) {
  
  
  $sql = "INSERT INTO fc_learners (learner, learner_pass) VALUES ('$newlearner', '$password1')";
  $result = $mySqli->handleQuery($sql);
  
  if ($result) {
    $arr_response['success'] = true;
  } else {
    $arr_response['success'] = false;
  }
} else {
  $arr_response['success'] = 'incorrect';
  
}

// Encode arrays
$json = json_encode($arr_response);
echo $json;
exit();  