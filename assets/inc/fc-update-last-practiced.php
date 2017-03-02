<?php
/* 
 * File Name: fc-update-last-practiced.php
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
$isConnected = $mySqli->getConnection();

$arr_response = [];
date_default_timezone_set('America/Los_Angeles');
$date = date('Y-m-d H:i:s');
$pos = filter_input(INPUT_POST, 'pos', FILTER_SANITIZE_STRING);
$ids = filter_input(INPUT_POST, 'ids', FILTER_SANITIZE_STRING);

if ($pos === 'gender') {
  $pos = 'noun';
}


if ( $pos && $ids ) {
  $arr_response = update_last_practiced($mySqli, $pos, $ids);
  
  send_data($arr_response);
} else {
  $arr_response['success'] = 'incorrect';
  send_data($arr_response);
}