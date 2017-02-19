<?php
/* 
 * File Name: fc-germancategories.php
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
  
$arr_categories = [];

$type = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_STRING);

if ($type && $type === 'admin') {
  // Adjectives and nouns
  $sql = "SELECT id, category AS name FROM fc_categories ORDER BY name";

  // Sentences
  $sqlSentences = "SELECT id, type AS name FROM fc_categories_sentence"
    . " ORDER BY name";
  
  // Word Categories
  $result = $mySqli->handleQuery($sql);
  
  $arr_categories['generic'] = get_categories($result); 
  
  // Sentence Categories
  $result_sentence = $mySqli->handleQuery($sqlSentences);
  
  $arr_categories['sentence'] = get_categories($result_sentence);
   
} else {
  

  // Adjectives
  $sqlAdj = "SELECT fc_german_adjectives.category AS id, fc_categories.category AS name"
    . " FROM fc_german_adjectives, fc_categories"
    . " WHERE fc_german_adjectives.category = fc_categories.id"
    . " GROUP BY id ORDER BY name";

  // Nouns
  $sqlNouns = "SELECT DISTINCT fc_german_nouns.category AS id, fc_categories.category AS name"
    . " FROM fc_german_nouns, fc_categories"
    . " WHERE fc_german_nouns.category = fc_categories.id"
    . " GROUP BY id ORDER BY name";
  
  $sqlGender = 'SELECT id, gender AS name FROM fc_categories_gender';
  
  $sqlSentence = 'SELECT id, type AS name FROM fc_categories_sentence';


  // Adjectives
  $resultAdj = $mySqli->handleQuery($sqlAdj);

  $arr_categories['adjective'] = get_categories($resultAdj);

  
  // Nouns
  $resultNoun = $mySqli->handleQuery($sqlNouns);

  $arr_categories['noun'] = get_categories($resultNoun);
  
  
  // Gender
  $resultGender = $mySqli->handleQuery($sqlGender);

  $arr_categories['gender'] = get_categories($resultGender);
  
  
  // Sentence
  $resultSentence = $mySqli->handleQuery($sqlSentence);
  
  $arr_categories['sentence'] = get_categories($resultSentence);

}

// Encode arrays
$json = json_encode($arr_categories);
echo $json;
exit();
