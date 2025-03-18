const express = require('express');
const multer = require('multer');
const IPFS = require('ipfs-http-client');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', async (req, res) => {
  try {
    // Handle JSON data
    const { name, position, nationality, goals, matches, worldCups } = req.body;

    // Read the uploaded file
    const file = req.file;
    const fileContent = fs.readFileSync(file.path);

    // Upload file to IPFS
    const ipfsResult = await ipfs.add(fileContent);
    const ipfsHash = ipfsResult.path;

    // Create metadata
    const metadata = {
      name,
      position,
      nationality,
      goals,
      matches,
      worldCups,
      image: `ipfs://${ipfsHash}`
    };

    // Add metadata to IPFS
    const metadataResult = await ipfs.add(JSON.stringify(metadata));
    const metadataHash = metadataResult.path;

    res.json({ metadataHash });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
