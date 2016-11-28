<?php
/* 
 * File Name: database.php
 * Date: 06 Jul 16
 * Programmer: Jaymes Young-Liebgott
 */

# Class for database connectivity
class Database
{
  private $dbusername;
  private $dbpassword;
  private $bolDebug;
  private $strDbName;
  private $mMySqli;

  // Constructor sets debugging to on or off
  public function __construct($server, $user, $pw, $db)
  {
    $this->dbhost = $server;
    $this->dbusername = $user;
    $this->dbpassword = $pw;
    $this->strDbName = $db;

    $strCwd = getcwd();
    //print("<br />Current dir is {$strCwd}<br />");

    // Set set debug value
    if(strpos($strCwd, "public_html/phoenixjaymes"))
    {
      $this->bolDebug = false;
    }
    else
    {
      $this->bolDebug = true;
    }
  }
	
  // Get database connection
  public function getConnection()
  {
      if($this->bolDebug == true)
      {
        $this->mMySqli = new mysqli($this->dbhost, $this->dbusername, $this->dbpassword, $this->strDbName);

        if ($this->mMySqli->connect_errno) {
            exit("Couldn't make connection to server. Pagename=" . $_SERVER['PHP_SELF'] . " - " . mysql_error() . "<br/>");
        }
      }
      elseif($this->bolDebug == false)
      {
        $this->mMySqli = new mysqli($this->dbhost, $this->dbusername, $this->dbpassword, $this->strDbName);

        if ($this->mMySqli->connect_errno) {
            error_log("Couldn't make connection to server. Pagename=" . $_SERVER['PHP_SELF']
               . " - " . mysql_error(), 1, "jaymes@phoenixjaymes.com");
            exit("Encountered an internal error. The Administrator has been notified.");
        } 
      }
      return true;
  }

  // Query handling
  public function handleQuery($sql, $strEmail = "No Email")
  {
    //echo $sql;
    //exit();

    if($this->bolDebug == true)
    {          
      $result = $this->mMySqli->query($sql);

      if (!$result) {
         print_r($this->mMySqli);
         
        exit("<span class=\"bold\">The following query failed:</span><br/>$sql.<br/>"
          . "<span class=\"bold\">On the following page:</span> $_SERVER[PHP_SELF]<br/>"
          . "<span class=\"bold\">Error: </span>" . $this->mMySqli->errno
          . " - " . $this->mMySqli->error);
        
      }  
    } elseif($this->bolDebug == false) {
      // Get IP and host address
      $strIp = $_SERVER['REMOTE_ADDR'];
      $strHostAddress =  gethostbyaddr($strIp);
      $strUserAgent = $_SERVER['HTTP_USER_AGENT'];

      $result = $this->mMySqli->query($sql);

      // If no result then exit page
      if(!$result)
      {
        error_log("Error occured getting the SQL query.\nUserName Initial = {$strEmail}\n"
        . "IP Address= {$strIp}\nHost Address= $strHostAddress\n\nUser Id = {$_SESSION['uID']}\n"
        . "User Agent={$strUserAgent}. \nHTTP_Referer = {$_SERVER['HTTP_REFERER']} \n"
        . "Page name= {$_SERVER['PHP_SELF']} \nRequest_URI = {$_SERVER['REQUEST_URI']} \n"
        . "Query string = {$_SERVER['QUERY_STRING']} \n\n"
        . "Query= {$query} \n" . mysql_error(), 1, "jaymes@phoenixjaymes.com");
        exit("Sorry, an internal error was encountered");
      }
    }
    return $result;
  }
  
  // Get link
  public function getLink() {
    return $this->mMySqli;
  }
}
?>