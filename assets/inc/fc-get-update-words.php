<?php
/* 
 * File Name: fc-get-update-words.php
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
$mySqli->getConnection();
  
$arr_cards = [];


$pos = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);

if ($pos === 'phrase') {
  // Phares
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  $sql = "SELECT id, english, translation, 'none' AS gender FROM fc_german_phrases";
  $result = $mySqli->handleQuery($sql);
  
  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards);  
  
} elseif ($pos === 'verb') {
  // Verbs
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  $sort = filter_input(INPUT_GET, 'sort', FILTER_SANITIZE_STRING);
  
  
  if ($sort === 'true') {
    $sql = "SELECT id, english, translation, ich, du, er_sie_es, wir, ihr, sie_Sie, img, 'none' AS gender FROM fc_german_verbs ORDER BY translation";
  } else {
    $sql = "SELECT id, english, translation, ich, du, er_sie_es, wir, ihr, sie_Sie, img, 'none' AS gender FROM fc_german_verbs";
  }
  
  
  
  $result = $mySqli->handleQuery($sql);
  
  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
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
  
} elseif ($pos === 'adjective') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Adjectives
  $sql = "SELECT id, english, translation, img, 'none' AS gender FROM fc_german_adjectives WHERE category = '{$category}' ORDER BY translation";
  
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }

  send_data($arr_cards); 
  
} elseif ($pos === 'noun') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Nouns
  $sql = "SELECT fc_german_nouns.id, english, translation, img, fc_categories_gender.gender AS gender"
    . " FROM fc_german_nouns, fc_categories_gender"
    . " WHERE fc_german_nouns.gender = fc_categories_gender.id AND category = '{$category}'"
    . " ORDER BY translation";
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['id'] = $row['id'];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
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
        . " SELECT english, translation, img, gender FROM fc_german_nouns      WHERE category = {$category}";
  } else {
     $sql = "SELECT * FROM fc_german_nouns WHERE category = 5 LIMIT 20";
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
