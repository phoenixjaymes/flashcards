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


function get_categories($result) {
  $arr_cat = [];
  
  while($row = $result->fetch_assoc()) {
    $arr_new_category = [];
    $arr_new_category['id'] = $row['id'];
    $arr_new_category['name'] = $row['name'];

    $arr_cat[] = $arr_new_category;
  }
  return $arr_cat;
}



function update_last_practiced($mySqli, $pos, $ids) {
  global $date;
  
  $arr = [
    'adjective' => 'fc_german_adjectives',
    'noun' => 'fc_german_nouns',
    'phrase' => 'fc_german_phrases',
    'sentence' => 'fc_german_sentence',
    'verb' => 'fc_german_verbs',
  ];
  
  $sql = "UPDATE {$arr[$pos]}"
      . " SET last_practiced = '$date' "
      . " WHERE id IN ($ids)";
  
  $result = $mySqli->handleQuery($sql);

  if ($result) {
    $arr_response['success'] = 'updated';
  } else {
    $arr_response['success'] = false;
  }
  
  return $arr_response;
}

// Remove white space and make a list separate with a comma and a space (', ')
function comma_space_string ($str) {
  $str_extra = trim(str_replace(',', ' ', $str));
  $str_extra_trimmed = preg_replace('/\s+/S', ' ', $str_extra);
  $arr_extra = explode(' ', $str_extra_trimmed);
  $extra_words = implode(', ', $arr_extra);
    
  return $extra_words;
}

// Wrap and output pre formated array
function pre_wrap($array) {
  echo '<pre>';
  print_r($array);
  echo '</pre>';
}
 