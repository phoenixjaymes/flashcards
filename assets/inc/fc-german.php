<?php
/* 
 * File Name: doctor-who.php
 * Date: 23 Jul 16
 * Programmer: Jaymes Young-Liebgott
 */

require 'db-constants.php';
require '..//classes/database.php';

// Set content ype to json
header('content-type: application/json; charset=utf-8');

// Databse connection
$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$mySqli->getConnection();
  
$arr_cards = [];

//

//  if (isset($_GET) && $_GET['category'] === 'body') {
//    $sql = "SELECT * FROM fc_german WHERE category = 'body'";
//  } elseif (isset($_GET) && $_GET['category'] === 'clothing') {
//    $sql = "SELECT * FROM fc_german WHERE category = 'clothing'";
//  } elseif (isset($_GET) && $_GET['category'] === 'colors') {
//    $sql = "SELECT * FROM fc_german WHERE category = 'colors'";
//  } elseif (isset($_GET) && $_GET['category'] === 'descriptions') {
//    $sql = "SELECT * FROM fc_german WHERE category = 'descriptions'";
//  } elseif (isset($_GET) && $_GET['category'] === 'geography') {
//    $sql = "SELECT * FROM fc_german WHERE category = 'geography'";
//  } elseif (isset($_GET) && $_GET['category'] === 'nature') {
//    $sql = "SELECT * FROM fc_german WHERE category = 'nature'";
//  } else {
//    $sql = "SELECT * FROM fc_german WHERE category = 'none' LIMIT 20";
//  }




// filter_input(INPUT_GET, 'pg', FILTER_SANITIZE_NUMBER_INT);

$pos = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);

if ($pos === 'verb') {
  $sql = 'SELECT english, translation, ich, du, er_sie_es, wir, ihr, sie_Sie, img FROM fc_german_verbs';
  $result = $mySqli->handleQuery($sql);
  
  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['ich'] = $row['ich'];
    $arr_card['du'] = $row['du'];
    $arr_card['er_sie_es'] = $row['er_sie_es'];
    $arr_card['wir'] = $row['wir'];
    $arr_card['ihr'] = $row['ihr'];
    $arr_card['sie_Sie'] = $row['sie_Sie'];
    $arr_card['img'] = $row['img'];

    $arr_cards[] = $arr_card;
  }


  // Encode arrays
  $json = json_encode($arr_cards);
  echo $json;
  exit();  
  
} else {
  
    // Nouns and adjectives
  if (isset($_GET) && isset($_GET['category']) && $_GET['category'] === 'all') {
    $sql = "(SELECT english, translation, img, 'none' AS gender FROM fc_german_adjectives LIMIT 15)"
        . " UNION "
        . " (SELECT english, translation, img, gender FROM fc_german_nouns LIMIT 15)";
  } else if (isset($_GET) && isset($_GET['category'])) {
    $sql = "SELECT english, translation, img, 'none' AS gender FROM fc_german_adjectives WHERE category = {$_GET['category']}"
        . " UNION "
        . " SELECT english, translation, img, gender FROM fc_german_nouns      WHERE category = {$_GET['category']}";
  } else {
     $sql = "SELECT * FROM fc_german_nouns WHERE category = 5 LIMIT 20";
   }


  $testArray = array('english'=>'blue', 'translation'=> 'blau', 'img'=>'blue.gif', 'gender'=>'none');


  $result = $mySqli->handleQuery($sql);

  // Arrays
  $arr_json = [];

  //$arr_cards[] = $testArray;


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_card = [];
    $arr_card['english'] = $row['english'];
    $arr_card['translation'] = $row['translation'];
    $arr_card['img'] = $row['img'];
    $arr_card['gender'] = $row['gender'];

    $arr_cards[] = $arr_card;
  }


  // Encode arrays
  $json = json_encode($arr_cards);
  echo $json;
  exit();
  
}
