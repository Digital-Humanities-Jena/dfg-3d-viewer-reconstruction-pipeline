<?php
include("dfg3d_db_connect.php");

$table = $_GET['table'];
$id = $_GET['id'];
$field = $_GET['field'];
$value = $_GET['value'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($value<3){
$sql = "UPDATE $table SET $field = $value WHERE id = $id";
} else {
$sql = "DELETE FROM $table WHERE id = $id";
}

echo $sql;
if ($conn->query($sql) === TRUE) {
  echo 'Dataset '.$id.' updated';
} else {
  echo 'Dataset '.$id.' error updating record: ' . $conn->error;
}

$conn->close();