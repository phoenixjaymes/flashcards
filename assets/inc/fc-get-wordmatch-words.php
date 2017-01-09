<?php
/* 
 * File Name: fc-get-update-words.php
 * Date: 08 Jan 16
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
  
$arr_words = [];
$pos = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);

if ($pos === 'adjective') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Adjectives
  $sql = "SELECT id, english, translation FROM fc_german_adjectives ORDER BY last_practiced LIMIT 10";
  
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_word = [];
    $arr_word['id'] = $row['id'];
    $arr_word['word'] = $row['english'];
    
    $arr_word1 = [];
    $arr_word1['id'] = $row['id'];
    $arr_word1['word'] = $row['translation'];

    $arr_words[] = $arr_word;
    $arr_words[] = $arr_word1;
  }
  
  shuffle($arr_words);
  send_data($arr_words); 
  
} elseif ($pos === 'noun') {
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Nouns
  $sql = "SELECT id, english, translation FROM fc_german_nouns ORDER BY last_practiced LIMIT 10";
  
  $result = $mySqli->handleQuery($sql);


  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_word = [];
    $arr_word['id'] = $row['id'];
    $arr_word['word'] = $row['english'];
    
    $arr_word1 = [];
    $arr_word1['id'] = $row['id'];
    $arr_word1['word'] = $row['translation'];

    $arr_words[] = $arr_word;
    $arr_words[] = $arr_word1;
  }
  
  shuffle($arr_words);
  send_data($arr_words); 
  
} elseif ($pos === 'verb') {
  // Verbs
  $category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  $sort = filter_input(INPUT_GET, 'sort', FILTER_SANITIZE_STRING);
  
  
  $sql = "SELECT id, english, infinitive FROM fc_german_verbs ORDER BY last_practiced LIMIT 10";
  
  $result = $mySqli->handleQuery($sql);
  
  // Get cards
  while($row = $result->fetch_assoc()) {
    $arr_word = [];
    $arr_word['id'] = $row['id'];
    $arr_word['word'] = $row['english'];
    
    $arr_word1 = [];
    $arr_word1['id'] = $row['id'];
    $arr_word1['word'] = $row['infinitive'];

    $arr_words[] = $arr_word;
    $arr_words[] = $arr_word1;
  }
  
  shuffle($arr_words);
  send_data($arr_words);
}
