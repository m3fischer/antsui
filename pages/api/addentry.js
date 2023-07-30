
import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand as Scan } from "@aws-sdk/lib-dynamodb";
import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {Utils} from '../../utils/utils.js'

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
   
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
   
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.PILZTIEFE || !body.PILZBREITE) {
      // Sends a HTTP bad request error code
      console.log ("ABBRUCH KEINE DATEN GESCHRIEBEN")
      return res.status(400).json({ data: 'PILZTIEFE oder PILZBREITE fehlen' })
    }
    else{
        // Found the name.
        // Sends a HTTP success code

        let response = await writeToDynamoDB(req)
        console.log ("response")
        console.log (response)
        res.status(200).json({ data: `HTTP Status: ${response.$metadata.httpStatusCode}` })
    }
  }


  async function writeToDynamoDB(req){
    const client = new DynamoDBClient({ credentials: fromIni({ profile: "manuel-antsapp" }), region: "eu-central-1",});
    const docClient = DynamoDBDocumentClient.from(client);
    let new_id = Utils.create_entry_id();

    let theItem = {}
    theItem["entry-id"] = new_id
    theItem["Benutzer"] = "der neue Benutzer"

    for (let key in req.body){

        console.log("item label:" + key)
        let value = req.body[key]
        console.log("item value:" + value)

        theItem[key] = value
    }
    console.log(">>>>>> theItem");
    console.log(theItem);

    const command = new PutCommand({
        TableName: "AntscareDB",
        Item: theItem,
    });

    console.log(">>>>>> Command");  
    console.log(command)

    // Folgende Zeile soll Daten in die AWS schreiben
    const response = await docClient.send(command);
    return response
  }