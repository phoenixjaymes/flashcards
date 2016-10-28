<?php
/* 
 * File Name: fc-utilites.php
 * Date: 24 Oct 16
 * Programmer: Jaymes Young-Liebgott
 */


// Check for duplicate entries
function duplicate_check($mySqli, $sql) {
  $result = $mySqli->handleQuery($sql);
  
  
  print_r($result);
  return ;
}