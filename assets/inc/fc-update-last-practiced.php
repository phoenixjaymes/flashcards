<?php
/* 
 * File Name: fc-update-last-practiced.php
 * Date: 08 Jan 16
 * Programmer: Jaymes Young-Liebgott
 */

require 'db-constants.php';
require '../classes/database.php';
require 'fc-utilities.php';

// Set content ype to json
header('content-type: application/json; charset=utf-8');

// Databse connection
$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
  $isConnected = $mySqli->getConnection();

// Set linkId if connected
 $isConnected ? $linkId = $mySqli->getLink() : $linkId = false;
 
 /*
  * mysqli->real escape string should be added to class
  */
 
 
$arr_response = [];
$date = date('Y-m-d');
$pos = filter_input(INPUT_POST, 'pos', FILTER_SANITIZE_STRING);

//print_r($_POST);
//exit();


//
if ($pos && $pos === 'adjective') {
  // Sanitize input
  $ids = filter_input(INPUT_POST, 'ids', FILTER_SANITIZE_STRING);
  
  // Escape input
  $ids_safe = $linkId->real_escape_string($ids);
   
  // Check of empty values
  if (!$ids_safe) {
    $arr_response['success'] = 'incorrect';
  } else {
         
    $sql = "UPDATE fc_german_adjectives"
      . " SET last_practiced = '$date' "
      . " WHERE id IN ($ids_safe)";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = 'updated';
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'noun') {
  // Sanitize input
  $ids = filter_input(INPUT_POST, 'ids', FILTER_SANITIZE_STRING);
  
  // Escape input
  $ids_safe = $linkId->real_escape_string($ids);
  
  if (!$ids_safe) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {

    $sql = "UPDATE fc_german_nouns"
      . " SET last_practiced = '$date' "
      . " WHERE id IN ($ids_safe)";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = 'updated';
      
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
    
} elseif ($pos && $pos === 'phrase') {
  // Sainitize input
  $ids = filter_input(INPUT_POST, 'ids', FILTER_SANITIZE_STRING);
  
  // Escape input
  $ids_safe = $linkId->real_escape_string($ids);
  
  if (!$ids_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {

    $sql = "UPDATE fc_german_phrases"
      . " SET last_practiced = '$date' "
      . " WHERE id IN ($ids_safe)";
 
    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = 'updated';
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'verb') {
  // Sanitize input
  $ids = filter_input(INPUT_POST, 'ids', FILTER_SANITIZE_STRING);
  
  // Escape input
  $ids_safe = $linkId->real_escape_string($ids);
  
  
  if (!$id_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    
    $sql = "UPDATE fc_german_verbs"
      . " SET last_practiced = '$date' "
      . " WHERE id IN ($ids_safe)";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = 'updated';
    } else {
      $arr_response['success'] = false;
    }
  }
 
  send_data($arr_response);
  
} else {
  $arr_response['success'] = 'incorrect';
  send_data($arr_response);
}