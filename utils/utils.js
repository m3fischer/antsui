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