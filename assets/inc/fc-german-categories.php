<?php
/* 
 * File Name: fc-germancategories.php
 * Date: 16 Oct 16
 * Programmer: Jaymes Young-Liebgott
 */

require 'db-constants.php';
require '../classes/database.php';

// Set content ype to json
header('content-type: application/json; charset=utf-8');

// Databse connection
$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$mySqli->getConnection();
  
$arr_categories = [];

$type = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_STRING);

if ($type && $type === 'all') {
  $sql ='SELECT * FROM fc_categories ORDER BY category';
  $sql_gender = 'SELECT * FROM fc_categories_gender';
  
  
  // Word Categories
  $result = $mySqli->handleQuery($sql);
  $arr_cat = [];
  
  while($row = $result->fetch_assoc()) {
    $arr_new_category = [];
    $arr_new_category['id'] = $row['id'];
    $arr_new_category['category'] = $row['category'];

    $arr_cat[] = $arr_new_category;
  }
  
  $arr_categories['word'] = $arr_cat; 
  
  // Gender Categories
  $result_gender = $mySqli->handleQuery($sql_gender);
  $arr_cat_gender = [];
  
  while($rowGender = $result_gender->fetch_assoc()) {
    $arr_new_category = [];
    $arr_new_category['id'] = $rowGender['id'];
    $arr_new_category['gender'] = $rowGender['gender'];

    $arr_cat_gender[] = $arr_new_category;
  }
  
  $arr_categories['gender'] = $arr_cat_gender;
   
} else {
  
  
  
  /*
   * Union these queries
   */
  

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
  
  $sqlGender = 'SELECT id, gender FROM fc_categories_gender';


  // Adjectives
  $resultAdj = $mySqli->handleQuery($sqlAdj);


  // Get cards
  $arr_cat_adj = [];
  while($row = $resultAdj->fetch_assoc()) {
    $arr_new_category = [];
    $arr_new_category['id'] = $row['id'];
    $arr_new_category['name'] = $row['name'];

    $arr_cat_adj[] = $arr_new_category;
  }

  $arr_categories['adjective'] = $arr_cat_adj;


  // Nouns
  $resultNoun = $mySqli->handleQuery($sqlNouns);


  // Get cards
  $arr_cat_noun = [];
  while($row = $resultNoun->fetch_assoc()) {
    $arr_new_category = [];
    $arr_new_category['id'] = $row['id'];
    $arr_new_category['name'] = $row['name'];

    $arr_cat_noun[] = $arr_new_category;
  }

  $arr_categories['noun'] = $arr_cat_noun;
  
  
  // Gender
  $resultGender = $mySqli->handleQuery($sqlGender);


  // Get cards
  $arr_cat_gender = [];
  while($row = $resultGender->fetch_assoc()) {
    $arr_new_category = [];
    $arr_new_category['id'] = $row['id'];
    $arr_new_category['name'] = $row['gender'];

    $arr_cat_gender[] = $arr_new_category;
  }
  
  $arr_categories['gender'] = $arr_cat_gender;

}

// Encode arrays
$json = json_encode($arr_categories);
echo $json;
exit();
