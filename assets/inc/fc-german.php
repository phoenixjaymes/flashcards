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

$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$mySqli->getConnection();


$result = $mySqli->handleQuery($sql);

// Arrays
$arr_json = [];
$arr_cards = [];

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