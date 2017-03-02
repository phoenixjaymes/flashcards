<?php
/* 
 * File Name: fc-german.php
 * Date: 16 Oct 16
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

$int_limit = 15;
$arr_cards = [];


$pos = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);

if ($pos === 'adjective') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Adjectives
  $sql = "SELECT id, english, translation, example, img, 'none' AS gender "
    . "FROM fc_german_adjectives WHERE category = '{$category}' ORDER BY last_practiced LIMIT $int_limit";
  
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['example'] = $row['example'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards); 
  
} elseif ($pos === 'gender') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Nouns by gender
  $sql = "SELECT fc_german_nouns.id, english, translation, example, img, fc_categories_gender.gender AS gender"
    . " FROM fc_german_nouns, fc_categories_gender"
    . " WHERE fc_german_nouns.gender = fc_categories_gender.id AND fc_german_nouns.gender = '{$category}'"
    . " ORDER BY last_practiced LIMIT $int_limit";
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['example'] = $row['example'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards); 
  
} elseif ($pos === 'noun') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Nouns
  $sql = "SELECT fc_german_nouns.id, english, translation, example, img, fc_categories_gender.gender AS gender"
    . " FROM fc_german_nouns, fc_categories_gender"
    . " WHERE fc_german_nouns.gender = fc_categories_gender.id AND category = '{$category}'"
    . " ORDER BY last_practiced LIMIT $int_limit";
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['example'] = $row['example'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards); 
  
} elseif ($pos === 'phrase') {
  // Phares
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  $sql = "SELECT english, translation, 'none' AS gender FROM fc_german_phrases";
  $result = $mySqli->handleQuery($sql);
  
  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards);  
  
} elseif ($pos === 'study') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  $sort = filter_input(INPUT_GET, 'sort', FILTER_SANITIZE_STRING);
  
  // Categories
  $sql = "(SELECT fc_german_nouns.id, english, translation, example, img, fc_categories_gender.gender AS gender, 'noun' AS wordType"
    . " FROM fc_german_nouns, fc_categories_gender WHERE fc_german_nouns.gender = fc_categories_gender.id ORDER BY last_practiced LIMIT 10)"
    . " UNION"
    . " (SELECT id, english, translation, example, img, 'none' AS gender, 'adjective' AS wordType"
    . " FROM fc_german_adjectives ORDER BY last_practiced LIMIT 10)"
    . " UNION"
    . " (SELECT id, english, translation, example, 'none' as img, 'none' AS gender, 'verb' AS wordType"
    . " FROM fc_german_verbs ORDER BY last_practiced LIMIT 10)";
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['example'] = $row['example'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];
    $arr_card['wordType'] = $row['wordType'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards); 
  
} elseif ($pos === 'verb') {
  // Verbs
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  $sort = filter_input(INPUT_GET, 'sort', FILTER_SANITIZE_STRING);
  
  
  $sql = "SELECT id, english, translation, example, ich, du, er_sie_es, wir, ihr, sie_Sie, img, 'none' AS gender "
    . "FROM fc_german_verbs ORDER BY last_practiced  LIMIT $int_limit";
  
  $result = $mySqli->handleQuery($sql);
  
  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['example'] = $row['example'];
    $arr_card['ich'] = $row['ich'];
    $arr_card['du'] = $row['du'];
    $arr_card['er_sie_es'] = $row['er_sie_es'];
    $arr_card['wir'] = $row['wir'];
    $arr_card['ihr'] = $row['ihr'];
    $arr_card['sie_Sie'] = $row['sie_Sie'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards);   
  
} else {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Nouns and adjectives
  if (isset($_GET) && isset($_GET['category']) && $_GET['category'] === 'all') {
    $sql = "(SELECT english, translation, img, 'none' AS gender FROM fc_german_adjectives LIMIT 15)"
      . " UNION "
      . " (SELECT english, translation, img, gender FROM fc_german_nouns LIMIT 15)";
  } else if (isset($_GET) && isset($_GET['category'])) {
    $sql = "SELECT english, translation, img, 'none' AS gender FROM fc_german_adjectives WHERE category = {$category}"
      . " UNION "
      . " SELECT english, translation, img, gender FROM fc_german_nouns "
      . "     WHERE category = {$category}";
  } else {
     $sql = "SELECT * FROM fc_german_nouns WHERE category = 5 LIMIT 15";
   }


  $result = $mySqli->handleQuery($sql);

  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards);
}
