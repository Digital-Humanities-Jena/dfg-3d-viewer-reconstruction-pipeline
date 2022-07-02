<?php
include("dfg3d_db_connect.php");

$timestamp = microtime($as_float=true);
$fileurl= 'dfg3dupload/';
$fileurl.= $timestamp;
$fileurl.='.zip';
$saveurl='../'.$fileurl;

//echo $saveurl;

// Count total files
$countfiles = count($_FILES['files']['name']);
$zip = new ZipArchive;
if ($zip->open($saveurl, ZipArchive::CREATE) === TRUE) {
//echo $countfiles;

$count = 0;
for($i=0;$i < $countfiles;$i++){
  
   // File name
  $filename = $_FILES['files']['name'][$i];
  //echo $_FILES['myFile']['name'];
   // File path
   $path = $filename;

   // file extension
   $file_extension = pathinfo($path, PATHINFO_EXTENSION);
   $file_extension = strtolower($file_extension);

   // Valid file extensions
   $valid_ext = array("pdf","doc","docx","jpg","png","jpeg");

   // Check extension
   if(in_array($file_extension,$valid_ext)){
    if ($zip->addFile($_FILES['files']['tmp_name'][$i],$path)){
        $count += 1;
        //move_uploaded_file($_FILES['files']['tmp_name'][$i], $saveurl[$i]'.jpg');
      }
      //echo 'ok';
      }
    }
   $zip->close();
  } else {
    //echo 'Fehler'; 
}

//if (isset($_FILES['files'])) {
  
//  echo 'Upload completed!';
//}

//Read values from URL
$table = 'dfg3dimages';
$modeltitle = $_GET['modeltitle'];
$modeldescription = $_GET['modeldescription'];
$orcid = $_GET['orcid'];
$institution = $_GET['institution'];
$familyname = $_GET['familyname'];
$givenname = $_GET['givenname'];

$email = $_GET['email'];
$license = $_GET['license'];
$wikidataitem = $_GET['wikidataitem'];
$place = $_GET['place'];
$itemLabel = $_GET['itemLabel'];
$coordinatelocation = $_GET['coordinatelocation'];
$country = $_GET['country'];
$wikidatacountry = $_GET['wikidatacountry'];

$modeltitle = rawurldecode($modeltitle);
$modeldescription = rawurldecode($modeldescription);
$orcid = rawurldecode($orcid);
$institution = rawurldecode($institution);
$familyname = rawurldecode($familyname);
$givenname = rawurldecode($givenname);

$email = rawurldecode($email);
$license = rawurldecode($license);
$wikidataitem = rawurldecode($wikidataitem);
$place = rawurldecode($place);
$itemLabel = rawurldecode($itemLabel);
$coordinatelocation = rawurldecode($coordinatelocation);
$country = rawurldecode($country);
$wikidatacountry = rawurldecode($wikidatacountry);


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 1 FROM $table WHERE id = '$timestamp'";

$result = $conn->query($sql);

if ($result->num_rows == 0) {
  //echo $sql;
  //echo 'Dataset '.$timestamp.' not extant<br>';

//Process to retrieve additional values

////////////////////////////////////////
// Write data to SQL DB

$sql = "INSERT INTO $table (recordtime, recordurl, modeltitle, modeldescription, orcid, institution, id, familyname, givenname, email, license, wikidataitem, place, itemLabel, coordinatelocation, country, wikidatacountry) VALUES ('$timestamp', '$fileurl', '$modeltitle','$modeldescription', '$orcid', '$institution', '$timestamp', '$familyname', '$givenname', '$email', '$license', '$wikidataitem', '$place', '$itemLabel', '$coordinatelocation', '$country', '$wikidatacountry')";
//echo $sql;
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
}else{
  echo 'Dataset already exists';
}

$conn->close();
?> 