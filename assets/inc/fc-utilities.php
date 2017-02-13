<?php
/* 
 * File Name: fc-utilites.php
 * Date: 24 Oct 16
 * Programmer: Jaymes Young-Liebgott
 */


// Check for duplicate entries
function is_duplicate($mySqli, $sql) {
  $result = $mySqli->handleQuery($sql);
  $row = $result->fetch_assoc();

  if($row['cnt'] > 0) {
    return true;
  } else { 
    return   false;
  }
}

// Encode and send data
function send_data($arr) {
  $json = json_encode($arr);
  echo $json;
  exit();
}

// Remove parenthesis information
function remove_parenthisis($str) {
  $pos = strpos($str, '(');
  
  if($pos === false) {
    return trim($str);
  }
  
  return trim(substr($str, 0, $pos));
}


function check_empty($linkId, $str ) {
  if (is_null($str) || empty($str)) {
    return 'NULL';
  } else {
    return "'{$linkId->real_escape_string($str)}'";
  }
}


function remove_empty() {
  foreach($_POST as $key => $value) {
    if (empty($value)) {
      unset($_POST[$key]);
    }
  }
}

function trim_post() {
  foreach($_POST as $key => $value) {
    $_POST[$key] = trim($value);
  }
}


function word_order_correct(){
  $arr = [];

  foreach ($_POST as $key => $value) {
    if ( strpos($key, 'word') === 0 ) {
      $arr[$key] = trim($value);
    }
  }
  
  for ($i = 2; $i < count($arr) + 1; $i++) {
    if (empty($arr['word1']) ) {
      return false;
    }
    
    $test1 = 'word' . ($i - 1);
    $test2 = 'word' . $i;
    
    if (!isset($arr[$test1], $arr[$test2])) {
      return false;
    }
    
    if( empty($arr[$test1]) && !empty($arr[$test2])    ) {
      return false;
    }
  }
  
  return true;
}