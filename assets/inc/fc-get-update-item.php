<?php
/* 
 * File Name: fc-get-update-item.php
 * Date: 21 Dec 16
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
 
 
$arr_word = [];
$arr_response = [];
$date = date('Y-m-d');

$pos_get = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);
$pos_post = filter_input(INPUT_POST, 'pos', FILTER_SANITIZE_STRING);


if ($pos_get && $pos_get === 'adjective') {
  // Sanitize input
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);
  
  // Escape input
  $category_safe = $linkId->real_escape_string($category);
  $id_safe = $linkId->real_escape_string($id);
  
  // Check for empty strings
  if (!$id_safe || !$category_safe) {
    $arr_response['success'] = 'incorrect';
  }
  
  
  $sql = "SELECT id, english, translation, example, img, category "
    . "   FROM fc_german_adjectives WHERE id = $id_safe";

  $result = $mySqli->handleQuery($sql);

  // check for results

  //then
  $row = $result->fetch_assoc();
    
  
  $arr_word['id'] = $row['id'];
  $arr_word['english'] = $row['english'];
  $arr_word['translation'] = $row['translation'];
  $arr_word['example'] = $row['example'];
  $arr_word['image'] = $row['img'];
  $arr_word['category'] = $row['category'];
  
  $arr_response['item'] = $arr_word;
  
  if ($result) {
    $arr_response['success'] = true;
  } else {
    $arr_response['success'] = false;
  }
  
  send_data($arr_response);
  
  
  
} elseif ($pos_get && $pos_get === 'noun') {
  // Sanitize input
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);
  
  // Escape input
  $category_safe = $linkId->real_escape_string($category);
  $id_safe = $linkId->real_escape_string($id);
  
  // Check for empty strings
  if (!$id_safe || !$category_safe) {
    $arr_response['success'] = 'incorrect';
  }
  
  
  $sql = "SELECT id, english, base, translation, example, gender, img, category "
    . "   FROM fc_german_nouns WHERE id = $id_safe";

  $result = $mySqli->handleQuery($sql);

  // check for results

  //then
  $row = $result->fetch_assoc();
    
  
  $arr_word['id'] = $row['id'];
  $arr_word['english'] = $row['english'];
  $arr_word['base'] = $row['base'];
  $arr_word['translation'] = $row['translation'];
  $arr_word['example'] = $row['example'];
  $arr_word['gender'] = $row['gender'];
  $arr_word['image'] = $row['img'];
  $arr_word['category'] = $row['category'];
  
  $arr_response['item'] = $arr_word;
      
  
  if ($result) {
    $arr_response['success'] = true;
  } else {
    $arr_response['success'] = false;
  }
  
  send_data($arr_response);
  
  
} elseif ($pos_get && $pos_get === 'phrase') {
  // Sanitize input
  $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  
  // Check for empty strings
  if (!$id_safe) {
    $arr_response['success'] = 'incorrect';
  }
  
  
  $sql = "SELECT id, english, translation "
    . "   FROM fc_german_phrases WHERE id = $id_safe";

  $result = $mySqli->handleQuery($sql);

  // check for results

  //then
  $row = $result->fetch_assoc();
    
  
  $arr_word['id'] = $row['id'];
  $arr_word['english'] = $row['english'];
  $arr_word['translation'] = $row['translation'];
  
  $arr_response['item'] = $arr_word;
      
  
  if ($result) {
    $arr_response['success'] = true;
  } else {
    $arr_response['success'] = false;
  }
  
  send_data($arr_response);
  
} elseif ($pos_get && $pos_get === 'sentence') {
  // Sanitize input
  $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  
  // Check for empty strings
  if (!$id_safe) {
    $arr_response['success'] = 'incorrect';
  }
  
  
  $sql = "SELECT id, sentence, category, answer1, extra "
    . "   FROM fc_german_sentence WHERE id = $id_safe";

  $result = $mySqli->handleQuery($sql);

  // check for results

  //then
  $row = $result->fetch_assoc();
    
  
  $arr_word['id'] = $row['id'];
  $arr_word['sentence'] = $row['sentence'];
  $arr_word['category'] = $row['category'];
  $arr_word['answer1'] = $row['answer1'];
  $arr_word['extraWords'] = $row['extra'];
  
  $arr_response['item'] = $arr_word;
      
  
  if ($result) {
    $arr_response['success'] = true;
  } else {
    $arr_response['success'] = false;
  }
  
  send_data($arr_response);
  
} elseif ($pos_get && $pos_get === 'verb') {
  // Sanitize input
  $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  
  // Check for empty strings
  if (!$id_safe) {
    $arr_response['success'] = 'incorrect';
  }
  
  
  $sql = "SELECT id, english, infinitive, translation, example, separable, ich, du, er_sie_es, wir, ihr, "
    . " sie_Sie, img, 'none' AS gender FROM fc_german_verbs WHERE id = $id_safe";

  $result = $mySqli->handleQuery($sql);

  // check for results

  //then
  $row = $result->fetch_assoc();
    
  
  $arr_word['id'] = $row['id'];
  $arr_word['english'] = $row['english'];
  $arr_word['infinitive'] = $row['infinitive'];
  $arr_word['translation'] = $row['translation'];
  $arr_word['example'] = $row['example'];
  $arr_word['separable'] = $row['separable'];
  $arr_word['ich'] = $row['ich'];
  $arr_word['du'] = $row['du'];
  $arr_word['er_sie_es'] = $row['er_sie_es'];
  $arr_word['wir'] = $row['wir'];
  $arr_word['ihr'] = $row['ihr'];
  $arr_word['sie_Sie'] = $row['sie_Sie'];
  $arr_word['img'] = $row['img'];
  
  $arr_response['item'] = $arr_word;
      
  
  if ($result) {
    $arr_response['success'] = true;
  } else {
    $arr_response['success'] = false;
  }
  
  send_data($arr_response);
  
  
} elseif ($pos_post && $pos_post === 'adjective') {
  $arr_response['success'] = 'post';
  send_data($arr_response);
}