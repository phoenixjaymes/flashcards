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
  
  $date_num = date('j');
  
  if ( 0 ===  ($date_num % 3) ) {
    $sql = "SELECT id, sentence, category, answer1, extra FROM fc_german_sentence ORDER BY RAND() LIMIT 5";
  } else {
    $sql = "SELECT id, sentence, category, answer1, extra FROM fc_german_sentence ORDER BY last_practiced LIMIT 5";
  }
  
  $result = $mySqli->handleQuery($sql);

  // Get sentences
  while($row = $result->fetch_assoc()) {
    
    $arr_sentence = [];
    $arr_words = [];
    $arr_extra_words = [];
    
    foreach ($row as $key => $val) {
      
      if ($key !== 'extra') {
        $arr_sentence[$key] = $val;
      }
      
      if ( $key === 'answer1' ) {
        $arr_words = explode(' ', $val);
      }
      
      if ($key === 'extra' && !is_null($val)) {
        $arr_extra_words = explode(', ', $val);
      }
    }
    
    if (count($arr_extra_words) === 0) {
      $arr_all_words = $arr_words;
    } else {
      $arr_all_words = array_merge($arr_words, $arr_extra_words);
    }
    
    shuffle($arr_all_words);
    $arr_sentence['words'] = $arr_all_words;
    
    $arr_sentences[] = $arr_sentence;
  }
  
  shuffle($arr_sentences);
  send_data($arr_sentences); 
  
} else {
  
  $arr_response['success'] = false;
  send_data($arr_response); 
  
} 
