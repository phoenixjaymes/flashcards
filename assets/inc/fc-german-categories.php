<?php
/* 
 * File Name: fc-germancategories.php
 * Date: 16 Oct 16
 * Programmer: Jaymes Young-Liebgott
 */

require 'db-constants.php';
require '..//classes/database.php';

// Set content ype to json
header('content-type: application/json; charset=utf-8');

// Databse connection
$mySqli = new Database(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$mySqli->getConnection();
  
$arr_categories = [];

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


// Encode arrays
$json = json_encode($arr_categories);
echo $json;
exit();
