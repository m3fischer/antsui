const Utils = {

    create_entry_id : function(id_prefix="", id_suffix="") {
        const values = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //let id_prefix = "ZAK_"; // Ein Prefix vor die ID. Koennte ggf spaeter interssant sein
        //let id_suffix = "_Ende"; // Ein Suffix NACH der eigentlichen ID. Koennte ggf spaeter interssant sein
        let new_id = id_prefix;
        //die id soll 10 Stellen umfassen
        let id_length = 10;
        for (let i = 0; i < id_length; i++) {
          let rand_id = Math.floor(Math.random() * values.length);
          new_id = new_id + values.charAt(rand_id);
        }
        new_id = new_id + id_suffix;
        return new_id;
      },
    

      ///ACHTUNG Diese Funktion wird derzeit nicht verwendet.
      // Das Schreiben in die Datenbank erfolgt in pages\api\addentry.js
    write_to_DynamoDB: async function (req){
      const client = new DynamoDBClient({ credentials: fromIni({ profile: "manuel-antsapp" }), region: "eu-central-1",});
      const docClient = DynamoDBDocumentClient.from(client);
      let new_id = Utils.create_entry_id();
  
      let theItem = {}
      theItem["entry-id"] = new_id
      theItem["Benutzer"] = "der neue Benutzer"
  
      for (let key in req.body){
  
          //console.log("item label:" + key)
          let value = req.body[key]
          //console.log("item value:" + value)
  
          theItem[key] = value
      }
      //console.log(">>>>>> theItem");
      // console.log(theItem);
  
      const command = new PutCommand({
          TableName: "AntscareDB",
          Item: theItem,
      });
  
      //console.log(">>>>>> Command");  
      // console.log(command)
  
      // Folgende Zeile soll Daten in die AWS schreiben
      const response = await docClient.send(command);
      return response
    },
    
    extract_data_from_target: function(event, formElements){
      const data = {} // Zunächst leeres JSON Objekt anlegen
      
      // Es wird gespeichert welche Informationen gespeichert werden
      data["FORM_TYPE"] = formElements.name

      formElements.questions.forEach(item => {
          //Bei der Auswertung dürfen bei einer Checkox nur die ausgwählten Elemente gespeichert werden
          if (item.htmltype == "checkbox") {
              //Anhand der initial-Werte wird ein Array aller möglichre Werte gesucht
              let possibleValuesList = item.initvalue.split("#");
              possibleValuesList.map(checkvalue => {
                  if (event.target[item.id + "_" + checkvalue].checked) {
                      // Bei einer Checkbox sollen nur die ausgewählten Elemente gespeichert werden
                      if (data[item.id] == undefined) {
                          data[item.id] = event.target[item.id + "_" + checkvalue].value;
                      } // Das erste Element kann direkt gespeichert werden
                      else {
                          data[item.id] = data[item.id] + "#" + event.target[item.id + "_" + checkvalue].value; // Bei allen weiteren Elementen müssen die vorherigen Werten mit dem Trennzeichn getrennt werden
                      }
                  }
                  else {
                      //Dieser Wert muss nicht gepsichert werden
                  }
              });
          }
          else if (item.htmltype == "checkbox") { }
          else {
              data[item.id] = event.target[item.id].value;
          }
      });
      return data
    },

    //Liefert die aktuelle Zeit im Format DD.MM.YYYY - hh:mm:ss
    get_timestamp: function (){
      let d = new Date()
      // Alle Zeiten werden zweistellig dargestellt
      let DD = d.getDate().toString().padStart(2,0);
      let MM = (d.getMonth()+1).toString().padStart(2,0);
      let YYYY = d.getFullYear().toString()
      let hh = d.getHours().toString().padStart(2,0);
      let mm = d.getMinutes().toString().padStart(2,0);
      let ss = d.getSeconds().toString().padStart(2,0);

      let curTime = DD + "." + MM + "." + YYYY + " - "+ hh + ":" + mm + ":" + ss
      return curTime
    },

    send_data_to_backend: async function (data, endpoint = '/api/addentry'){
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)
   
      // API endpoint where we send form data.
      //const endpoint = '/api/addentry'
   
      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      }
   
      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options)
   
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json()
      console.log(`Message from Server: ${result.data}`)
      alert(`Message from Server: ${result.data}`)
    }
  }
    
export { Utils }