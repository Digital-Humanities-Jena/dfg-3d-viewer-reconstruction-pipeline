<?php
   ob_clean();
   header_remove(); 
   header('Content-Type: application/json; charset=utf-8');

   $mode = $_GET['mode'];
   $uri = 'https://3dheritage.de/';

class Dataset implements JsonSerializable
{
    private $number;
    private $id;
    private $modeltitle;
    private $modeldescription;
    private $orcid;
    private $institution;
    private $familyname;
    private $givenname;
    private $email;
    private $license;
    private $wikidataitem;
    private $place;
    private $coordinatelocation;
    private $country;
    private $wikidatacountry;
    private $recordurl;
    private $recordtime;

    public function __construct(int $number, string $id,string $modeltitle,string $modeldescription,string $orcid,string $institution,string $familyname,string $givenname,string $email,string $license,string $wikidataitem,string $place,string $coordinatelocation,string $country,string $wikidatacountry,string $recordurl,string $recordtime)
    {
        $this->number = $number;
        $this->id = $id;
        $this->modeltitle = $modeltitle;
        $this->modeldescription = $modeldescription;
        $this->orcid = $orcid;
        $this->institution = $institution;
        $this->familyname = $familyname;
        $this->givenname = $givenname;
        $this->email = $email;
        $this->license = $license;
        $this->wikidataitem = $wikidataitem;
        $this->place = $place;
        $this->coordinatelocation = $coordinatelocation;
        $this->country = $country;
        $this->wikidatacountry = $wikidatacountry;
        $this->recordurl = $recordurl;
        $this->recordtime = $recordtime;
        
        
    }

    public function jsonSerialize()
    {
        return [
            'number' => $this->number,
            'id' => $this->id,
            'modeltitle' => $this->modeltitle,
            'modeldescription' => $this->modeldescription,
            'orcid' => $this->orcid,
            'institution' => $this->institution,
            'familyname' => $this->familyname,
            'givenname' => $this->givenname,
            'email' => $this->email,
            'license' => $this->license,
            'wikidataitem' => $this->wikidataitem,
            'place' => $this->place,
            'coordinatelocation' => $this->coordinatelocation,
            'country' => $this->country,
            'wikidatacountry' => $this->wikidatacountry,
            'title' => $this->title,
            'recordurl' => $this->recordurl
        ];
    }
}
include("dfg3d_db_connect.php");
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT mode, id, modeltitle, modeldescription, orcid, institution, familyname, givenname, email, license, wikidataitem, place, coordinatelocation, country, wikidatacountry, recordurl, recordtime FROM dfg3dimages WHERE mode=$mode";

    $data=array();
    $json = json_encode($data);

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $j=1;
    while($row = $result->fetch_assoc())  {   
        $data = json_decode($json, TRUE);
        
        
        array_push($data,(new Dataset($j,$row['id'],$row['modeltitle'],$row['modeldescription'],$row['orcid'],$row['institution'],$row['familyname'],$row['givenname'],$row['email'],$row['license'],$row['wikidataitem'],$row['place'],$row['coordinatelocation'],$row['country'],$row['wikidatacountry'],$uri.$row['recordurl'],$row['recordtime'],)));

        $json = json_encode($data);
                $j=$j+1;
    }
    }
    
    echo ($json);
$conn->close();


