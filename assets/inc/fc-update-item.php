<?php
/* 
 * File Name: fc-add-word.php
 * Date: 23 Oct 16
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
 
$arr_word = [];
$arr_response = [];
$date = date('Y-m-d');

$pos_get = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);
$pos_post = filter_input(INPUT_POST, 'pos', FILTER_SANITIZE_STRING);

//print_r($_GET);
//print_r($_POST);

//echo 'get - ' . $pos_get . '<br>';
//echo 'post - ' . $pos_post . '<br>';

//exit();

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
  
  
  $sql = "SELECT id, english, translation, img, category "
    . "   FROM fc_german_adjectives WHERE id = $id_safe";

  $result = $mySqli->handleQuery($sql);

  // check for results

  //then
  $row = $result->fetch_assoc();
  
  //print_r($row);
    
  
  $arr_word['id'] = $row['id'];
  $arr_word['english'] = $row['english'];
  $arr_word['translation'] = $row['translation'];
  $arr_word['image'] = $row['img'];
  $arr_word['category'] = $row['category'];
  
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



//
//if ($pos && $pos === 'adjective') {
//  // Sanitize input
//  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
//  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
//  $img = filter_input(INPUT_POST, 'img', FILTER_SANITIZE_STRING);
//  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
//  
//  // Escape input
//  $english_safe = $linkId->real_escape_string($english);
//  $translation_safe = $linkId->real_escape_string($translation);
//  $img_safe = $linkId->real_escape_string($img);
//  $category_safe = $linkId->real_escape_string($category);
//   
//  // Check of empty values
//  if (!$english_safe || !$translation_safe || !$img_safe || !$category_safe) {
//    $arr_response['success'] = 'incorrect';
//  } else {
//    // Duplicate check
//    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_adjectives WHERE english = '$english_safe'";
//
//    if(is_duplicate($mySqli, $sqlDuplicate)) {
//      $arr_response['success'] = 'duplicate';     
//      send_data($arr_response);
//    }
//    
//    $sql = "INSERT INTO fc_german_adjectives (english, translation, img, category, added, last_practiced)"
//         . " VALUES ('$english_safe', '$translation_safe', '$img_safe', '$category_safe', '$date', '$date')";
//
//    $result = $mySqli->handleQuery($sql);
//
//    if ($result) {
//      $arr_response['success'] = true;
//    } else {
//      $arr_response['success'] = false;
//    }
//  }
//  
//  send_data($arr_response);
//  
//} elseif ($pos && $pos === 'noun') {
//  // Sanitize input
//  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
//  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
//  $img = filter_input(INPUT_POST, 'img', FILTER_SANITIZE_STRING);
//  $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
//  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
//  
//  // Escape input
//  $english_safe = $linkId->real_escape_string($english);
//  $translation_safe = $linkId->real_escape_string($translation);
//  $img_safe = $linkId->real_escape_string($img);
//  $category_safe = $linkId->real_escape_string($category);
//  
//  if (!$english_safe || !$translation_safe || !$img_safe || !$gender || !$category_safe) {
//    $arr_response['success'] = 'incorrect';
//    send_data($arr_response);
//  } else {
//    // Duplicate check
//    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_nouns WHERE english = '$english_safe'";
//
//    if(is_duplicate($mySqli, $sqlDuplicate)) {
//      $arr_response['success'] = 'duplicate';     
//      send_data($arr_response);
//    }
//    
//    $sql = "INSERT INTO fc_german_nouns (english, translation, img, gender, category, added, last_practiced)"
//         . " VALUES ('$english_safe', '$translation_safe', '$img_safe', '$gender', '$category_safe', '$date', '$date')";
//
//    $result = $mySqli->handleQuery($sql);
//
//    if ($result) {
//      $arr_response['success'] = true;
//      
//    } else {
//      $arr_response['success'] = false;
//    }
//  }
//  
//  send_data($arr_response);
//    
//} elseif ($pos && $pos === 'phrase') {
//  // Sainitize input
//  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
//  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
//  
//  // Escape input
//  $english_safe = $linkId->real_escape_string($english);
//  $translation_safe = $linkId->real_escape_string($translation);
//  
//  if (!$english_safe || !$translation_safe ) {
//    $arr_response['success'] = 'incorrect';
//    send_data($arr_response);
//  } else {
//    // Duplicate check
//    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_phrases WHERE english = '$english_safe'";
//
//    if(is_duplicate($mySqli, $sqlDuplicate)) {
//      $arr_response['success'] = 'duplicate';     
//      send_data($arr_response);
//    }
//    
//    
//    $sql = "INSERT INTO fc_german_phrases (english, translation, added, last_practiced)"
//       . " VALUES ('$english_safe', '$translation_safe', '$date', '$date')";
// 
//    $result = $mySqli->handleQuery($sql);
//
//    if ($result) {
//      $arr_response['success'] = true;
//    } else {
//      $arr_response['success'] = false;
//    }
//  }
//  
//  send_data($arr_response);
//  
//} elseif ($pos && $pos === 'verb') {
//  // Sanitize input
//  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
//  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
//  $separable = filter_input(INPUT_POST, 'separable', FILTER_SANITIZE_STRING);
//  $ich = filter_input(INPUT_POST, 'ich', FILTER_SANITIZE_STRING);
//  $du = filter_input(INPUT_POST, 'du', FILTER_SANITIZE_STRING);
//  $er_sie_es = filter_input(INPUT_POST, 'er_sie_es', FILTER_SANITIZE_STRING);
//  $wir = filter_input(INPUT_POST, 'wir', FILTER_SANITIZE_STRING);
//  $ihr = filter_input(INPUT_POST, 'ihr', FILTER_SANITIZE_STRING);
//  $sie_sie = filter_input(INPUT_POST, 'sie_sie', FILTER_SANITIZE_STRING);
//  
//  // Escape input
//  $english_safe = $linkId->real_escape_string($english);
//  $translation_safe = $linkId->real_escape_string($translation);
//  $ich_safe = $linkId->real_escape_string($ich);
//  $du_safe = $linkId->real_escape_string($du);
//  $er_sie_es_safe = $linkId->real_escape_string($er_sie_es);
//  $wir_safe = $linkId->real_escape_string($wir);
//  $ihr_safe = $linkId->real_escape_string($ihr);
//  $sie_sie_safe = $linkId->real_escape_string($sie_sie);
//  
//  if (!$english_safe || !$translation_safe || !$ich_safe || !$du_safe || !$er_sie_es_safe || !$wir_safe || !$ihr_safe || !$sie_sie_safe ) {
//    $arr_response['success'] = 'incorrect';
//    send_data($arr_response);
//  } else {
//    // Duplicate check
//    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_verbs WHERE translation = '$translation_safe'";
//
//    if(is_duplicate($mySqli, $sqlDuplicate)) {
//      $arr_response['success'] = 'duplicate';     
//      send_data($arr_response);
//    }
//    
//    
//    $sql = "INSERT INTO fc_german_verbs"
//      . " (english, translation, separable, ich, du, er_sie_es, wir, ihr, sie_Sie, added, last_practiced)"
//      . " VALUES"
//      . " ('$english_safe', '$translation_safe', '$separable', '$ich_safe',"
//      . " '$du_safe', '$er_sie_es_safe', '$wir_safe', '$ihr_safe', '$sie_sie_safe', '$date', '$date')";
//
//    $result = $mySqli->handleQuery($sql);
//
//    if ($result) {
//      $arr_response['success'] = true;
//    } else {
//      $arr_response['success'] = false;
//    }
//  }
// 
//  send_data($arr_response);
//  
//} elseif ($pos && $pos === 'category') {
//  // Sanitize input
//  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
//  
//  // Escape input
//  $name_safe = $linkId->real_escape_string($name);
//  
//  if (!$name_safe) {
//    $arr_response['success'] = 'incorrect';
//  } else {
//    // Duplicate check
//    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_categories WHERE category = '$name_safe'";
//
//    if(is_duplicate($mySqli, $sqlDuplicate)) {
//      $arr_response['success'] = 'duplicate';     
//      send_data($arr_response);
//    }
//
//    // Insert category
//    $sql = "INSERT INTO fc_categories (category) VALUES ('$name_safe')";
//
//    $result = $mySqli->handleQuery($sql);
//
//    if ($result) {
//      $arr_response['success'] = true;
//    } else {
//      $arr_response['success'] = false;
//    }
//  }
//  
//  send_data($arr_response);
//  
//} else {
//  $arr_response['success'] = 'incorrect';
//  send_data($arr_response);
//}