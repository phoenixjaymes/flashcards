<?php
/* 
 * File Name: fc-update-item.php
 * Date: 22 Dec 16
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
  $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);
  $img = filter_input(INPUT_POST, 'image', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  $english_safe = $linkId->real_escape_string($english);
  $translation_safe = $linkId->real_escape_string($translation);
  $example_safe = $linkId->real_escape_string($example);
  $img_safe = $linkId->real_escape_string($img);
  $category_safe = $linkId->real_escape_string($category);
   
  // Check of empty values
  if (!$id_safe || !$english_safe || !$translation_safe || !$example_safe || !$img_safe || !$category_safe) {
    $arr_response['success'] = 'incorrect';
  } else {
         
    $sql = "UPDATE fc_german_adjectives"
      . " SET english = '$english_safe', "
      . " translation = '$translation_safe', "
      . " example = '$example_safe', "
      . " img = '$img_safe', "
      . " category = '$category_safe' "
      . " WHERE id = $id_safe";

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
  $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $base = filter_input(INPUT_POST, 'base', FILTER_SANITIZE_STRING);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);
  $img = filter_input(INPUT_POST, 'image', FILTER_SANITIZE_STRING);
  $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  $english_safe = $linkId->real_escape_string($english);
  $base_safe = $linkId->real_escape_string($base);
  $translation_safe = $linkId->real_escape_string($translation);
  $example_safe = $linkId->real_escape_string($example);
  $img_safe = $linkId->real_escape_string($img);
  $category_safe = $linkId->real_escape_string($category);
  
  if (!$id_safe || !$base_safe || !$english_safe || !$translation_safe || !$example_safe || !$img_safe || !$gender || !$category_safe) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {

    $sql = "UPDATE fc_german_nouns"
      . " SET english = '$english_safe', "
      . " base = '$base_safe', "
      . " translation = '$translation_safe', "
      . " example = '$example_safe', "
      . " img = '$img_safe', "
      . " gender = $gender, "
      . " category = '$category_safe' "
      . " WHERE id = $id_safe";

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
  $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  $english_safe = $linkId->real_escape_string($english);
  $translation_safe = $linkId->real_escape_string($translation);
  
  if (!$id_safe || !$english_safe || !$translation_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {

    $sql = "UPDATE fc_german_phrases"
      . " SET english = '$english_safe', "
      . " translation = '$translation_safe' "
      . " WHERE id = $id_safe";
 
    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = 'updated';
    } else {
      $arr_response['success'] = false;
    }
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'sentence') {
  // Sanitize input
  $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  $sentence = filter_input(INPUT_POST, 'sentence', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $answer1 = filter_input(INPUT_POST, 'answer1', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $extra_words = filter_input(INPUT_POST, 'extraWords', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  $sentence_safe = $linkId->real_escape_string($sentence);
  $answer1_safe = $linkId->real_escape_string($answer1);
  $extra_words_safe = $linkId->real_escape_string($extra_words);
  
  if (!$category || !$sentence_safe || !$answer1_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  }
 
  $sql = "UPDATE fc_german_sentence"
    . " SET sentence = '$sentence_safe', "
    . " category = '$category', "
    . " answer1 = '$answer1_safe', ";

  if ($extra_words_safe === NULL || $extra_words_safe === '') {
    $sql .=  " extra = NULL ";
  } else {
    $sql .=  " extra = '$extra_words_safe' ";
  }

  $sql .= " WHERE id = $id_safe";
  
  $result = $mySqli->handleQuery($sql);

  if ($result) {
    $arr_response['success'] = 'updated';
  } else {
    $arr_response['success'] = false;
  }
  
  send_data($arr_response);
  
} elseif ($pos && $pos === 'verb') {
  // Sanitize input
  $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
  $english = filter_input(INPUT_POST, 'english', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $infinitive = filter_input(INPUT_POST, 'infinitive', FILTER_SANITIZE_STRING);
  $translation = filter_input(INPUT_POST, 'translation', FILTER_SANITIZE_STRING);
  $example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);
  $separable = filter_input(INPUT_POST, 'separable', FILTER_SANITIZE_STRING);
  $ich = filter_input(INPUT_POST, 'ich', FILTER_SANITIZE_STRING);
  $du = filter_input(INPUT_POST, 'du', FILTER_SANITIZE_STRING);
  $er_sie_es = filter_input(INPUT_POST, 'er_sie_es', FILTER_SANITIZE_STRING);
  $wir = filter_input(INPUT_POST, 'wir', FILTER_SANITIZE_STRING);
  $ihr = filter_input(INPUT_POST, 'ihr', FILTER_SANITIZE_STRING);
  $sie_sie = filter_input(INPUT_POST, 'sie_sie', FILTER_SANITIZE_STRING);
  
  // Escape input
  $id_safe = $linkId->real_escape_string($id);
  $english_safe = $linkId->real_escape_string($english);
  $infinitive_safe = $linkId->real_escape_string($infinitive);
  $translation_safe = $linkId->real_escape_string($translation);
  $example_safe = $linkId->real_escape_string($example);
  $ich_safe = $linkId->real_escape_string($ich);
  $du_safe = $linkId->real_escape_string($du);
  $er_sie_es_safe = $linkId->real_escape_string($er_sie_es);
  $wir_safe = $linkId->real_escape_string($wir);
  $ihr_safe = $linkId->real_escape_string($ihr);
  $sie_sie_safe = $linkId->real_escape_string($sie_sie);
  
  if (!$id_safe || !$english_safe || !$infinitive_safe || !$translation_safe || !$example_safe || !$ich_safe || !$du_safe || !$er_sie_es_safe || !$wir_safe || !$ihr_safe || !$sie_sie_safe ) {
    $arr_response['success'] = 'incorrect';
    send_data($arr_response);
  } else {
    
    $sql = "UPDATE fc_german_verbs"
      . " SET english = '$english_safe', "
      . " infinitive = '$infinitive_safe', "
      . " translation = '$translation_safe', "
      . " example = '$example_safe', "
      . " separable = '$separable', "
      . " ich = '$ich_safe', "
      . " du = '$du_safe', "
      . " er_sie_es = '$er_sie_es_safe', "
      . " wir = '$wir_safe', "
      . " ihr = '$ihr_safe', "
      . " sie_Sie = '$sie_sie_safe' "
      . " WHERE id = $id_safe";

    $result = $mySqli->handleQuery($sql);

    if ($result) {
      $arr_response['success'] = 'updated';
    } else {
      $arr_response['success'] = false;
    }
  }
 
  send_data($arr_response);
  
} elseif ($pos && $pos === 'category') {
  // Sanitize input
  $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  
  // Escape input
  $name_safe = $linkId->real_escape_string($name);
  $id_safe = $linkId->real_escape_string($id);
  
  if (!$id_safe || !$name_safe) {
    $arr_response['success'] = 'incorrect';
  } else {
    
    $sql = "UPDATE fc_categories"
      . " SET category = '$name_safe' "
      . " WHERE id = $id_safe";

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