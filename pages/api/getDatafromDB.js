import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand as Scan } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import AType from '../../components/antstypes.json'

export default async function handler(req, res) {
    // Datenbank-Verbindung konfigurieren
    const client = new DynamoDBClient({ credentials: fromIni({ profile: "manuel-antsapp" }), region: "eu-central-1",});
    const docClient = DynamoDBDocumentClient.from(client);
    const input = { TableName: "AntscareDB"}
    const command = new Scan(input);
    console.log("DATEN abrufen")
    
    
    // Daten von der Datenbank abrufen
    const response = await client.send(command);
    
    response.Items.map((item)=>{

        console.log(item['entry-id'])

        let tmpFeeding = []
        let tmpRest = []
        if(item["FORM_TYPE"] == AType.dailyfeeding.name){
            console.log(`Tägliche Fütterung: ${item["entry-id"]}`)
            tmpFeeding.push(item)
        
        }
        else{
            console.log(`Alles Andere: ${item["entry-id"]}`)
            tmpRest.push(item)
        }

    })




//    console.log(response.Items)
    //res.send( response.Items);
    //  res.status(200).json({ data: `${response.Items}` })
    res.status(200).json({ data: response.Items})
}

