
import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand as Scan } from "@aws-sdk/lib-dynamodb";
import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
const client = new DynamoDBClient({ credentials: fromIni({ profile: "manuel-antsapp" }), region: "eu-central-1",});
  const docClient = DynamoDBDocumentClient.from(client);
  const input = { TableName: "AntscareDB"}
  const command = new Scan(input);
  const response = await client.send(command);

  //console.log(response.Items)
  //res.send( response.Items);
//  res.status(200).json({ data: `${response.Items}` })
  res.status(200).json({ data: response.Items})
}