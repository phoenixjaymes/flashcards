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


// Replace unicode with html
function replace_unicode($str) {
  
  
  $new_str = str_replace('\u00c4', '&Auml', $str);
  
  return $new_str;
}