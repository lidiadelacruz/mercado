import { NextApiRequest, NextApiResponse } from 'next';
import _pages from 'pages/api/_content/pages';
import _schema from 'pages/api/_content/schema.json';
import axios from "axios"

interface Pages {
    [key: string]: string
}

interface Schema {
    [key: string]: {
        title: string,
        description: string
    }
}

const pages = _pages as Pages;
const schema = _schema as Schema;

// pages/api/nycHousingData.js

export default async function handler (req, res) {
  const endpoint = 'https://data.cityofnewyork.us/resource/hg8x-zxpr.json';

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // If the API returns an error status code, forward that status and error message.
      res.status(response.status).json({ error: 'Error fetching data from NYC API' });
      return;
    }

    const data = await response.json();
    // Send the JSON data back to the client.
    res.status(200).json(data);
  } catch (error) {
    // In case of network or other errors, return a 500 status code.
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// export default function handler(req: NextApiRequest, res: NextApiResponse): void {
//   const { query } = req;
//   const id = query.id as string;

//   if (!(id in schema)) {
//     res.status(404);
//   }

//   const { title, description } = schema[id];
//   const content = pages[id];

//   res.status(200).json({
//     id,
//     title,
//     description,
//     content
//   });
// }
