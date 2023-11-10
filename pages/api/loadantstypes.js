import path from 'path';
import { promises as fs } from 'fs';

/**
 * Liefert die Antstype zum Aufbau der Formulare im Frontend
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
  //Den absoluten Pfad bestimmen (cwd => current working directory)
  const jsonDirectory = path.join(process.cwd(), 'components');
  //json Daten aus Datei antstypes.json lesen
  const fileContents = await fs.readFile(jsonDirectory + '/antstypes.json', 'utf8');
  //Return the content of the data file in json format
  console.log(fileContents)
  res.status(200).json(fileContents);
}