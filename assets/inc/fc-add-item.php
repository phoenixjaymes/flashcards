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
$mySqli->getConnection();
  
$arr_response = [];
$date = date('Y-m-d');

$pos = filter_input(INPUT_POST, 'pos', FILTER_SANITIZE_STRING);

if ($pos && $pos === 'adjective') {
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $img = filter_input(INPUT_POST, 'img', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
   
  // Check of empty values
  if (!$english || !$translation || !$img || !$category) {
    $arr_response['success'] = 'incorrect';
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_adjectives WHERE english = '$english'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    $sql = "INSERT INTO fc_german_adjectives (english, translation, img, category, added, last_practiced)"
         . " VALUES ('$english', '$translation', '$img', '$category', '$date', '$date')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'noun') {
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $img = filter_input(INPUT_POST, 'img', FILTER_SANITIZE_STRING);
  $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  
  if (!$english || !$translation || !$img || !$gender || !$category) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_nouns WHERE english = '$english'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    $sql = "INSERT INTO fc_german_nouns (english, translation, img, gender, category, added, last_practiced)"
         . " VALUES ('$english', '$translation', '$img', '$gender', '$category', '$date', '$date')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
      
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
    
} elseif ($pos && $pos === 'phrase') {
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  
  if (!$english || !$translation ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_phrases WHERE english = '$english'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    
    $sql = "INSERT INTO fc_german_phrases (english, translation, added, last_practiced)"
       . " VALUES ('$english', '$translation', '$date', '$date')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'verb') {
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $separable = filter_input(INPUT_POST, 'separable', FILTER_SANITIZE_STRING);
  $ich = filter_input(INPUT_POST, 'ich', FILTER_SANITIZE_STRING);
  $du = filter_input(INPUT_POST, 'du', FILTER_SANITIZE_STRING);
  $er_sie_es = filter_input(INPUT_POST, 'er_sie_es', FILTER_SANITIZE_STRING);
  $wir = filter_input(INPUT_POST, 'wir', FILTER_SANITIZE_STRING);
  $ihr = filter_input(INPUT_POST, 'ihr', FILTER_SANITIZE_STRING);
  $sie_sie = filter_input(INPUT_POST, 'sie_sie', FILTER_SANITIZE_STRING);
  
  if (!$english || !$translation || !$ich || !$du || !$er_sie_es || !$wir || !$ihr || !$sie_sie ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_verbs WHERE translation = '$translation'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    
    $sql = "INSERT INTO fc_german_verbs"
         . " (english, translation, separable, ich, du, er_sie_es, wir, ihr, sie_Sie, added, last_practiced)"
         . " VALUES"
         . " ('$english', '$translation', '$separable', '$ich', '$du', '$er_sie_es', '$wir', '$ihr', '$sie_sie',  '$date', '$date')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
 
  send_data($arr_response);
  
} elseif ($pos && $pos === 'category') {
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  
  if (!$name) {
    $arr_response['success'] = 'incorrect';
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_categories WHERE category = '$name'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }

    // Insert category
    $sql = "INSERT INTO fc_categories (category) VALUES ('$name')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} else {
  $arr_response['success'] = 'incorrect';
  send_data($arr_response);
}