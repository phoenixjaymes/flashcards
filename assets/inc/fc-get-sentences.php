<?php
/* 
 * File Name: fc-get-sentences.php
 * Date: 04 Feb 16
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
  
$arr_sentences = [];

//$pos = filter_input(INPUT_GET, 'pos', FILTER_SANITIZE_STRING);

if (isset($_GET)) {
  //$category = filter_input(INPUT_GET, 'category', FILTER_SANITIZE_STRING);
  
  // Adjectives
  $sql = "SELECT * FROM fc_german_sentence LIMIT 10";
  
  
  $result = $mySqli->handleQuery($sql);

  // Get sentences
  while($row = $result->fetch_assoc()) {
    
    $arr_sentence = [];
    $arr_words = [];
    
    foreach ($row as $key => $val) {
      
      $arr_sentence[$key] = $val;
      
      if ( $key === 'answer1' ) {
        $arr_words = explode(' ', $val);
      }
    }
    
    shuffle($arr_words);
    $arr_sentence['words'] = $arr_words;
    
    $arr_sentences[] = $arr_sentence;
  }
  
  shuffle($arr_sentences);
  send_data($arr_sentences); 
  
} else {
  
  $arr_response['success'] = false;
  send_data($arr_response); 
  
} 
