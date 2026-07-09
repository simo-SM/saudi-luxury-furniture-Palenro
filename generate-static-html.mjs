import fs from 'fs';
import server from './dist/server/server.js';

async function generate() {
  try {
    const request = new Request('http://localhost:3000/saudi-luxury-furniture-Palenro/');
    const response = await server.fetch(request);
    const html = await response.text();
    fs.writeFileSync('./dist/client/index.html', html);
    console.log('Successfully generated static index.html! Length:', html.length);
  } catch (err) {
    console.error('Error generating HTML:', err);
  }
}

generate();
