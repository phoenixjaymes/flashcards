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