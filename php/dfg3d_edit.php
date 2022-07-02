<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>4Dcity Content Classification</title>

  <script> 
function statechange(id,row,value,table) {
    var formData = new FormData();
    var xhttp = new XMLHttpRequest();
    var query = "dfg3d_dataupdate.php?table="+table+"&id='"+id+"'&field=mode&value="+value; 
    console.log(query);           
    xhttp.open("POST", query, true);
    xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
              }
           };
    xhttp.send(formData);   
    document.getElementById(row).remove();
            }
</script> 

<style>
#i0 {background-color: papayawhip;}
#i1 {background-color: lightgreen;}
#i2 {background-color: lightcoral;}

table{
border-collapse:collapse;
border:1px solid #FF0000;
}

table td{
border:1px solid #FF0000;
}
</style>
</head>

<body>
<table>
    <tr>
    <td><button type="button" onclick="location.href='dfg3d_edit.php?table=dfg3dimages&mode=0'">Show open user-generated images</button></td>
    <td><button type="button" onclick="location.href='dfg3d_edit.php?table=dfg3dimages&mode=1'">Show completed user-generated images</button></td>
<td><button type="button" onclick="location.href='dfg3d_edit.php?table=dfg3dimages&mode=2'">Show declined user-generated images</button></td>

    </tr>
</table>

<?php
$table = 'dfg3dimages';
$mode = $_GET['mode'];
$a = '';
if ($mode==0){
    $a='unclassified';
};
if ($mode==1){
    $a='accepted';
};
if ($mode==2){
    $a='declined';
};

echo ("<h1>Recorded $a $table</h1>");

include("dfg3d_db_connect.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($table=="dfg3dimages"){
    $arr2 = array(
        'key2' => 'id',
        'key3' => 'modeltitle',
        'key4' => 'modeldescription',
        'key5' => 'orcid',
        'key6' => 'institution',
        'key7' => 'familyname',
        'key8' => 'givenname',
        'key9' => 'email',
        'key10' => 'license',
        'key11' => 'wikidataitem',
        'key12' => 'place',
        'key13' => 'itemLabel',
        'key14' => 'coordinatelocation',
        'key15' => 'country',
        'key16' => 'wikidatacountry',
        
    );
    echo "<div id=i$mode>";
    $sql = "SELECT recordtime, recordurl, modeltitle, modeldescription, orcid, institution, id, familyname, givenname, email, license, wikidataitem, place, itemLabel, coordinatelocation, country, wikidatacountry FROM $table WHERE mode=$mode";
    
    echo "<table>" ;
    echo "<tr>";
    echo "<th>Completed</th>";
    echo "<th>Decline</th>";
    echo "<th>#</th>";
    echo "<th>Delete</th>";
    echo "<th>Preview</th>";
    echo "<th>Link</th>";
    foreach ($arr2 as $key => $val){
        
                echo "<th>$val</th>";
        
    };
    echo "</tr>";
    
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $j=1;
        while($row = $result->fetch_assoc())  {   
            echo "<tr id=".$j.">";
            echo '<td><button type="button" onclick=statechange("'.$row['id'].'",'.$j.',1,"'.$table.'")>Completed</button></td>';
            echo '<td><button type="button" onclick=statechange("'.$row['id'].'",'.$j.',2,"'.$table.'")>Decline</button></td>';
            echo "<td>$j</td>";
            echo '<td><button type="button" onclick=statechange("'.$row['id'].'",'.$j.',3,"'.$table.'")>Delete</button></td>';
            echo '<td><img src=https://3dheritage.de/'.$row["recordurl"].' width="100" ></img></td>';
            echo '<td><a href="../'.$row["recordurl"].'" download>Link to ZIP</a></td>';
            foreach ($arr2 as $key => $val){
                 echo "<td>".$row[$val]."</td>";   
                };     
            
            echo "</tr>";
            $j=$j+1;
        };
        } else {    echo "0 results";};
    
    echo "</table>";
    echo "</div>";
    };    
$conn->close();


?> 

</body>
</html>