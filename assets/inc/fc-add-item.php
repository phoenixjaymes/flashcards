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
  
$arr_response = [];
date_default_timezone_set('America/Los_Angeles');
$date = date('Y-m-d');
$date_time = date('Y-m-d H:i:s');
trim_post();

$pos = filter_input(INPUT_POST, 'pos', FILTER_SANITIZE_STRING);


if ($pos && $pos === 'adjective') {
  // Sanitize input
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);
  $img = filter_input(INPUT_POST, 'img', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  
  // Escape input
  $english_safe = $linkId->real_escape_string($english);
  $translation_safe = $linkId->real_escape_string($translation);
  $example_safe = $linkId->real_escape_string($example);
  $img_safe = $linkId->real_escape_string($img);
  $category_safe = $linkId->real_escape_string($category);
   
  // Check of empty values
  if (!$english_safe || !$translation_safe || !$example_safe || !$img_safe || !$category_safe) {
    $arr_response['success'] = 'incorrect';
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_adjectives WHERE english = '$english_safe'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    $sql = "INSERT INTO fc_german_adjectives (english, translation, example, img, category, added, last_practiced)"
         . " VALUES ('$english_safe', '$translation_safe', '$example_safe', '$img_safe', '$category_safe', '$date', '$date_time')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'category') {
  // Sanitize input
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  
  // Escape input
  $name_safe = $linkId->real_escape_string($name);
  
  if (!$name_safe) {
    $arr_response['success'] = 'incorrect';
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_categories WHERE category = '$name_safe'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }

    // Insert category
    $sql = "INSERT INTO fc_categories (category) VALUES ('$name_safe')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'noun') {
  // Sanitize input
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $base = filter_input(INPUT_POST, 'base', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);
  $img = filter_input(INPUT_POST, 'img', FILTER_SANITIZE_STRING);
  $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  
  // Escape input
  $english_safe = $linkId->real_escape_string($english);
  $base_safe = $linkId->real_escape_string($base);
  $translation_safe = $linkId->real_escape_string($translation);
  $example_safe = $linkId->real_escape_string($example);
  $img_safe = $linkId->real_escape_string($img);
  $category_safe = $linkId->real_escape_string($category);
  
  if (!$english_safe || !$base_safe || !$translation_safe || !$example_safe || !$img_safe || !$gender || !$category_safe) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_nouns WHERE english = '$english_safe'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    $sql = "INSERT INTO fc_german_nouns (english, base, translation, example, img, gender, category, added, last_practiced)"
         . " VALUES ('$english_safe', '$base_safe', '$translation_safe', '$example_safe', '$img_safe', '$gender', '$category_safe', '$date', '$date_time')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
      
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
    
} elseif ($pos && $pos === 'phrase') {
  // Sainitize input
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  
  // Escape input
  $english_safe = $linkId->real_escape_string($english);
  $translation_safe = $linkId->real_escape_string($translation);
  
  if (!$english_safe || !$translation_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_phrases WHERE english = '$english_safe'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    
    $sql = "INSERT INTO fc_german_phrases (english, translation, added, last_practiced)"
       . " VALUES ('$english_safe', '$translation_safe', '$date', '$date_time')";
 
    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'sentence') {
  
  
  remove_empty();
  
  // Sanitize input
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  $sentence = filter_input(INPUT_POST, 'sentence', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $answer1 = filter_input(INPUT_POST, 'answer1', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $answer2 = filter_input(INPUT_POST, 'answer2', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  
  
  // Escape input
  $sentence_safe = $linkId->real_escape_string($sentence);
  $answer1_safe = $linkId->real_escape_string($answer1);
  $answer2_safe = check_empty($linkId, $answer2);
  
  
  
  if (!$category || !$sentence_safe || !$answer1_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_sentence WHERE sentence = '$sentence_safe'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    
    $sqlSentence = "INSERT INTO fc_german_sentence"
      . " (sentence, category, answer1, added, last_practiced)"
      . " VALUES"
      . " ('$sentence_safe', '$category', '$answer1_safe', '$date', '$date_time')";
    
      
    $result = $mySqli->handleQuery($sqlSentence);

    if ($result) {
      $arr_response['success'] = true;
    } else {
      $arr_response['success'] = false;
    }
  }
 
  send_data($arr_response);
  
} elseif ($pos && $pos === 'verb') {
  // Sanitize input
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);
  $infinitive = filter_input(INPUT_POST, 'infinitive', FILTER_SANITIZE_STRING);
  $separable = filter_input(INPUT_POST, 'separable', FILTER_SANITIZE_STRING);
  $ich = filter_input(INPUT_POST, 'ich', FILTER_SANITIZE_STRING);
  $du = filter_input(INPUT_POST, 'du', FILTER_SANITIZE_STRING);
  $er_sie_es = filter_input(INPUT_POST, 'er_sie_es', FILTER_SANITIZE_STRING);
  $wir = filter_input(INPUT_POST, 'wir', FILTER_SANITIZE_STRING);
  $ihr = filter_input(INPUT_POST, 'ihr', FILTER_SANITIZE_STRING);
  $sie_sie = filter_input(INPUT_POST, 'sie_sie', FILTER_SANITIZE_STRING);
  
  // Escape input
  $english_safe = $linkId->real_escape_string($english);
  $translation_safe = $linkId->real_escape_string($translation);
  $example_safe = $linkId->real_escape_string($example);
  $infinitive_safe = $linkId->real_escape_string($infinitive);
  $ich_safe = $linkId->real_escape_string($ich);
  $du_safe = $linkId->real_escape_string($du);
  $er_sie_es_safe = $linkId->real_escape_string($er_sie_es);
  $wir_safe = $linkId->real_escape_string($wir);
  $ihr_safe = $linkId->real_escape_string($ihr);
  $sie_sie_safe = $linkId->real_escape_string($sie_sie);
  
  if (!$english_safe || !$translation_safe || !$example_safe || !$infinitive_safe|| !$ich_safe || !$du_safe || !$er_sie_es_safe || !$wir_safe || !$ihr_safe || !$sie_sie_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    // Duplicate check
    $sqlDuplicate = "SELECT count(*) AS cnt FROM fc_german_verbs WHERE translation = '$translation_safe'";

    if(is_duplicate($mySqli, $sqlDuplicate)) {
      $arr_response['success'] = 'duplicate';     
      send_data($arr_response);
    }
    
    
    $sql = "INSERT INTO fc_german_verbs"
      . " (english, infinitive, translation, example, separable, ich, du, er_sie_es, wir, ihr, sie_Sie, added, last_practiced)"
      . " VALUES"
      . " ('$english_safe', '$infinitive_safe', '$translation_safe', '$example_safe', '$separable', '$ich_safe',"
      . " '$du_safe', '$er_sie_es_safe', '$wir_safe', '$ihr_safe', '$sie_sie_safe', '$date', '$date_time')";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = true;
      $fk = $linkId->insert_id;
    } else {
      $arr_response['success'] = false;
    }
    
    $sqlPerfect = "INSERT INTO fc_german_verbs_perfect"
      . " (fk)"
      . " VALUES"
      . " ($fk)";
    
    $resultPerfect = $mySqli->handleQuery($sqlPerfect);
    
    if ($resultPerfect) {
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