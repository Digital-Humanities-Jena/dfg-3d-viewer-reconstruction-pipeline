function fileSelected() {
    var count = document.getElementById('fileToUpload').files.length;
    document.getElementById('details').innerHTML = "";
          for (var index = 0; index < count; index ++)
          {
                 var file = document.getElementById('fileToUpload').files[index];
                 var fileSize = 0;
                 if (file.size > 1024 * 1024)
                        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                 else
                        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
                  if (file.type == 'image/jpeg' ||'image/png') {
                 document.getElementById('details').innerHTML += 'Name: ' + file.name + '<br>Size: ' + fileSize + '<br>Type: ' + file.type;
                 document.getElementById('details').innerHTML += '<p>';
              } else {
                  document.getElementById('details').innerHTML = 'Wrong filetype. Only images are accepted.';
              }
          }
  }
  function uploadFile() {
    var modeldescription = encodeURI(document.getElementById('modeldescription').value);
    var orcid = encodeURI(document.getElementById('orcidid').innerHTML);
    var institution = encodeURI(document.getElementById('institution').value);
    var familyname = encodeURI(document.getElementById('familyname').value);
    var givenname = encodeURI(document.getElementById('givenname').value);
    var email = encodeURI(document.getElementById('email').value);
    var license = encodeURI(document.getElementById('stacked-state').value);
    var wikidataitem = encodeURI(document.getElementById('wikidataitem').innerHTML);
    var place = encodeURI(document.getElementById('place').value);
    var itemLabel = encodeURI(document.getElementById('itemLabel').value);
    var coordinatelocation = encodeURI(document.getElementById('coordinatelocation').innerHTML);
    var country = encodeURI(document.getElementById('country').value);
    var wikidatacountry = encodeURI(document.getElementById('wikidatacountry').innerHTML);
    var fd = new FormData();
          var count = document.getElementById('fileToUpload').files.length;
          for (var index = 0; index < count; index ++)
          {
                 var file = document.getElementById('fileToUpload').files[index];
                 //document.getElementById('infobox').innerHTML += file.length;
                 fd.append("files[]", document.getElementById('fileToUpload').files[index]);
                 //fd.append('myFile', file);
          }
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "php/dfg3dimageupload.php?wikidataitem="+wikidataitem+"&coordinatelocation="+coordinatelocation+"&license="+license+"&modeltitle="+itemLabel+"&modeldescription="+modeldescription+"&wikidatacountry="+wikidatacountry+"&country="+country+"&place="+place+"&orcid="+orcid+"&institution="+institution+"&familyname="+familyname+"&givenname="+givenname+"&email="+email);
    xhr.send(fd);
  }
  function uploadProgress(evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
      document.getElementById('progress').innerHTML = percentComplete.toString() + '%';
    }
    else {
      document.getElementById('progress').innerHTML = 'Upload error!';
    }
  }
  function uploadComplete(evt) {
    document.getElementById('id1').innerHTML = (evt.target.responseText);
    document.getElementById('id1').innerHTML += "We will send you information about the process and the link to the model via email.";
  }
  function uploadFailed(evt) {
    alert("Error sending file...");
  }
  function uploadCanceled(evt) {
    alert("Upload cancelled by the user or network error!");
  }

  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function visswitch(a,b,c,d,e,f,g) {
    document.getElementById(a).style.display = 'block';
    document.getElementById(b).style.display = 'none';
    document.getElementById(c).style.display = 'none';
    document.getElementById(d).style.display = 'none';
    document.getElementById(e).style.display = 'none';
    document.getElementById(f).style.display = 'none';
    document.getElementById(g).style.display = 'none';
      };
    
      function check(a,b,c,d,e,f,g) {
          visswitch(a,b,c,d,e,f,g);
          i=0;
          document.getElementById('forms').innerHTML = 'Model description: '+ document.getElementById('modeldescription').value+'<br>';
          document.getElementById('forms').innerHTML += '<br>';
          document.getElementById('forms').innerHTML += 'Orcid ID: '+ document.getElementById('orcidid').innerHTML+'<br>';
          document.getElementById('forms').innerHTML += 'Institution: '+ document.getElementById('institution').value+'<br>';
          if (document.getElementById('familyname').value.length == 0) {
            document.getElementById('forms').innerHTML += '<b style="color:red;">Family name: ## please add ##</b><br>';
            i =i + 1;
          } else {
              document.getElementById('forms').innerHTML += 'Family name: '+ document.getElementById('familyname').value+'<br>';
            }
          
          document.getElementById('forms').innerHTML += 'Given name: '+ document.getElementById('givenname').value+'<br>';
          if ((document.getElementById('email').value.length !== 0) && (document.getElementById('email').value.includes('@'))&& (document.getElementById('email').value.includes('.'))) {
            document.getElementById('forms').innerHTML += 'Email: '+ document.getElementById('email').value+'<br>';
          } else {
            document.getElementById('forms').innerHTML += '<b style="color:red;">Email: ## please add a valid email adress ##</b><br>';
            i =i + 1;
            
            }
          document.getElementById('forms').innerHTML += '<br>';
          document.getElementById('forms').innerHTML += 'License: '+ document.getElementById('stacked-state').value+'<br>';
          document.getElementById('forms').innerHTML += '<br>';
          document.getElementById('forms').innerHTML += document.getElementById('wikidataitem').innerHTML+'<br>';
          if (document.getElementById('itemLabel').value.length == 0) {
            document.getElementById('forms').innerHTML += '<b style="color:red;">Label: ## please add ##</b><br>';
            i =i + 1;
          } else {
              document.getElementById('forms').innerHTML += 'Label: '+ document.getElementById('itemLabel').value+'<br>';
            }
            if (document.getElementById('place').value.length == 0) {
            document.getElementById('forms').innerHTML += '<b style="color:red;">Location: ## please add ##</b><br>';
            i =i + 1;
          } else {
              document.getElementById('forms').innerHTML += 'Location: '+ document.getElementById('place').value+'<br>';
            }
          document.getElementById('forms').innerHTML += 'Coordinates: '+ document.getElementById('coordinatelocation').innerHTML+'<br>';
          document.getElementById('forms').innerHTML += 'Country: '+ document.getElementById('country').value+'<br>';
          document.getElementById('forms').innerHTML += document.getElementById('wikidatacountry').innerHTML+'<br>';
          
          if (i == 0) {
            console.log(i);
            document.getElementById('send').setAttribute("class","pure-button pure-button-primary");  
            document.getElementById('send').setAttribute("onclick","uploadFile()");
            document.getElementById('send').setAttribute("value","Upload");
          } else {
            document.getElementById('send').setAttribute("class","pure-button pure-button-secondary");  
            document.getElementById('send').setAttribute("onclick","");
            document.getElementById('send').setAttribute("value","Please complete metadata to upload");
          }
      };
    
      function visswitchon(a) {
        console.log(a);
        document.getElementById(a).style.display = 'block';
          };
    
    function wikichange(){
      document.getElementById('wikidataitem').innerHTML = '';
      document.getElementById('coordinatelocation').setAttribute('oninput','');
      document.getElementById('itemLabel').setAttribute('oninput','');
    }
    
    function orcidsearch() {
      var person = document.getElementById('searchOrc').value;
      console.log(person);
      orcidquery(person);
    }
    
    function wikibasesearch() {
      var location = document.getElementById('searchTxt').value;
      console.log(location);
      querywikibase(location);
    }
    
    function orcidretrieve(person) {
      //var person = document.getElementById('searchOrc').value;
      //console.log(person);
    
      fetch ('https://pub.orcid.org/v3.0/expanded-search/?&q='+person+'&rows=1')
      .then (function (response) {
          return response.text();
        })
        .then (function (data) {
          //console.log (data);	
      var xml = $.parseXML(data);
      return xml;
      })
      .then (function (xml) {
      var v = xml.getElementsByTagName('expanded-search:email');
      var w = xml.getElementsByTagName('expanded-search:institution-name');
      var x = xml.getElementsByTagName('expanded-search:orcid-id');
      var y = xml.getElementsByTagName('expanded-search:given-names');
      var z = xml.getElementsByTagName('expanded-search:family-names');
    
      document.getElementById('searchOrc').value = String(z.item(0).textContent)+', '+String(y.item(0).textContent)+' ('+String(x.item(0).textContent)+')';  
      document.getElementById('orcidid').innerHTML = String(x.item(0).textContent);
      document.getElementById('givenname').value = String(y.item(0).textContent);
      document.getElementById('familyname').value = String(z.item(0).textContent);
      document.getElementById('institution').value = '';
      for(i=0;i<x.length;i++)
          {
            if (w.item(0) !== null){document.getElementById('institution').value += String(w.item(i).textContent)}else{document.getElementById('institution').value=''};  
          };
      if (v.item(0) !== null){document.getElementById('email').value = String(v.item(0).textContent)}else{document.getElementById('email').value=''};  
      });
      document.getElementById('personname').innerHTML = '<br>';
      
        
    };
    
    async function orcidquery(person) {
      fetch ('https://pub.orcid.org/v3.0/expanded-search/?&q='+person+'&rows=200')
      .then (function (response) {
          return response.text();
        })
        .then (function (data) {
          console.log (data);	
      var xml = $.parseXML(data);
      return xml;
      })
      .then (function (xml) {
      
      var x = xml.getElementsByTagName('expanded-search:orcid-id');
      var y = xml.getElementsByTagName('expanded-search:given-names');
      var z = xml.getElementsByTagName('expanded-search:family-names');
      //document.getElementById('test').innerHTML = '';
      var names = new Array();
      document.getElementById('personname').innerHTML = '<br>';
      for(i=0;i<x.length;i++)
          {
    
          if (x.item(i).textContent !== 'null') { var tempx = String(x.item(i).textContent) } else { var tempx = ''};
          if (y.item(i).textContent !== 'null') { var tempy = String(y.item(i).textContent) } else { var tempy = ''};
          if (z.item(i).textContent !== 'null') { var tempz = String(z.item(i).textContent) } else { var tempz = ''};
        
          var temp = tempz + ', ' + tempy + ' (' + tempx + ')';
          names.push(temp);
          document.getElementById('personname').innerHTML += '<a href=javascript:orcidretrieve("'+tempx+'")>'+ temp  + '</a><br>';
          };
    
      });
    };
    
     ////Wikibase Query for Search////
     async function querywikibase(keyword) {
      var location = new Array();
      class SPARQLQueryDispatcher {
        constructor(endpoint) {
          this.endpoint = endpoint;
        }
    
        //Query
        query(sparqlQuery) {
          const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
          const headers = { 'Accept': 'application/sparql-results+json' };
          return fetch(fullUrl, { headers }).then(body => body.json());
        }
      }
    
      //Query strings
      const endpointUrl = 'https://query.wikidata.org/sparql';
      const sparqlQuery = "SELECT DISTINCT ?item ?itemLabel ?itemDescription WHERE {\n" +
        "?item ?label '" + keyword + "'@en.\n" +
        "?article schema:about ?item;\n" +
        "schema:inLanguage 'en';\n" +
        "schema:isPartOf <https://en.wikipedia.org/>.\n" +
        " SERVICE wikibase:label { bd:serviceParam wikibase:language 'en'. }\n" +
        "} \n" +
        "LIMIT 10 \n"
    
      const sparqlQueryOld = "SELECT ?id WHERE {\n" +
        //"  ?item wdt:P31/wdt:P279* wd: .\n" +
        "  ?id wdt:P1566 '" + keyword + "'.\n" +
        "  SERVICE wikibase:label {\n" +
        "bd:serviceParam wikibase:language 'en'. \n" +
        "} \n"
      "}";
    
      //Output to console//
      document.getElementById('placename').innerHTML = '';
      const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
      queryDispatcher.query(sparqlQuery)
        .then(json => {
          console.log(json);
          Object.keys(json.results.bindings).forEach(function (key) {
            //console.log('Key : ' + key);
            var arr;
            arr = json.results.bindings[key];
            //console.log('Value : ' + arr.item.value);
            //console.log('Value : ' + arr.itemLabel.value);
    
            if (typeof (arr.itemDescription) !== 'undefined') {
              //console.log('Value : ' + arr.itemDescription.value)
              location.push(arr.itemLabel.value + ' - ' + arr.itemDescription.value + ' #' + arr.item.value);
            } else {
              location.push(arr.itemLabel.value + ' #' + arr.item.value);
            }
    
          });
          
    
          console.log(location);
    
    
          location.forEach(function (item) {
            item = item.split("#");
            console.log(item[1]);
            itemclean = item[1].replace('http://www.wikidata.org/entity/', '');
            document.getElementById('placename').innerHTML += '<a href=javascript:wikibaseretrieve("'+itemclean+'")>'+ item  + '</a><br>';
          });
        });
    }
    
    ////
    ////Wikibase Query for retrieval
    ////
    
    async function wikibaseretrieve(item) {

      var retrieval = new Array();
      class SPARQLQueryDispatcher {
        constructor(endpoint) {
          this.endpoint = endpoint;
        }
    
        //Query
        query(sparqlQuery) {
          const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
          const headers = { 'Accept': 'application/sparql-results+json' };
          return fetch(fullUrl, { headers }).then(body => body.json());
        }
      }
    
      //Query strings
      const endpointUrl = 'https://query.wikidata.org/sparql';
      const sparqlQuery = "SELECT ?item ?itemLabel ?coordinatelocation ?inception ?country ?officialname ?officialwebsite ?GeoNamesID WHERE{ \n" +
        "  VALUES ?item {wd:" + item + "} \n" +
        "  OPTIONAL{?item wdt:P571 ?inception.} # get item \n" +
        "  OPTIONAL{?item wdt:P17 ?country.} # get item \n" +
        "  OPTIONAL{?item wdt:P625 ?coordinatelocation.} # get item \n" +
        "  OPTIONAL{?item wdt:P1448 ?officialname.} # get item \n" +
        "  OPTIONAL{?item wdt:P856 ?officialwebsite.} # get item \n" +
        "  OPTIONAL{?item wdt:P1566 ?GeoNamesID.} # get item     \n" +
        " SERVICE wikibase:label { bd:serviceParam wikibase:language 'en' } \n" +
        "}  \n"
    
      const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
      queryDispatcher.query(sparqlQuery)
        .then(json => {
          console.log(json);
          Object.keys(json.results.bindings).forEach(function (key) {
            var arr;
            arr = json.results.bindings[key];
            console.log('Value : ' + arr.item.value);
            if (typeof (arr.GeoNamesID) !== 'undefined') { document.getElementById('geonamesid').innerHTML = 'GeonamesID: '+(arr.GeoNamesID.value) };
            if (typeof (arr.item) !== 'undefined') { document.getElementById('wikidataitem').innerHTML = 'Wikidata ObjectID: ' + (arr.item.value) };
            
            if (typeof (arr.country) !== 'undefined') { document.getElementById('wikidatacountry').innerHTML = 'Wikidata CountryID: ' + (arr.country.value) };

            if (typeof (arr.itemLabel) !== 'undefined') { document.getElementById('itemLabel').value = (arr.itemLabel.value) };
            document.getElementById('itemLabel').setAttribute('oninput','wikichange()');
            if (typeof (arr.coordinatelocation) !== 'undefined') { document.getElementById('coordinatelocation').value = (arr.coordinatelocation.value) };
            document.getElementById('coordinatelocation').setAttribute('oninput','wikichange()');
            geonamesbyid(arr.GeoNamesID.value);
          });
          document.getElementById('placename').innerHTML = '<br>';
        });
    }
    ////
    ////Geonames Query for retrieval
    ////
    async function geonamesbyloc(lat,lon) {
      var maxRows = 1;
    
        //Query
        var username = 'sandermuenster';
        var url = 'http://api.geonames.org/findNearbyPlaceNameJSON?lat='+lat+'lng='+lon+'&username=' + username;
        console.log(url);
     
      $.getJSON(url, function (result) {
        console.log(result);
        if (typeof (result.countryName) !== 'undefined') { document.getElementById('country').value = (result.countryName) };
        if (typeof (result.name) !== 'undefined') { document.getElementById('place').value = (result.name) };
        if (typeof (result.coordinate.lat) !== 'undefined') { document.getElementById('coordinatelocation').value = (result.coordinate.lat) + ',' +(result.coordinate.lon)};
      });
    };
    
    async function geonamesbyid(id) {
      var maxRows = 1;
    
        //Query
        var username = 'sandermuenster';
        var url = 'http://api.geonames.org/getJSON?geonameId=' + id + '&username=' + username;
        console.log(url);
     
    
      $.getJSON(url, function (result) {
        console.log(result);
        if (typeof (result.countryName) !== 'undefined') { document.getElementById('country').value = (result.countryName) };
            if (typeof (result.name) !== 'undefined') { document.getElementById('place').value = (result.name) };
    
      });
    };
    