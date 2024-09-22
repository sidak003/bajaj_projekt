const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

const base64MimeType = (encoded) => {
  let result = null
  if (typeof encoded !== "string") return result

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
  if (mime && mime.length) result = mime[1]
  return result
}

const getBase64FileSize = (base64String) => {
  const stringLength = base64String.length - (base64String.indexOf(",") + 1)
  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812
  return (sizeInBytes / 1024).toFixed(2)
}
// POST method
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post("/bfhl", async (req, res) => {
  const { data, file_b64 } = req.body

  let fileInfo = {
    file_valid: false,
    file_mime_type: null,
    file_size_kb: null,
  }
  if (file_b64) {
    const mimeType = base64MimeType(file_b64)
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (mimeType && allowedTypes.includes(mimeType)) {
      const filesize = getBase64FileSize(file_b64)
      fileInfo = {
        file_valid: true,
        file_mime_type: mimeType,
        file_size_kb: filesize,
      }
    }
  }
  if (data && Array.isArray(data)) {
    const numbers = data.filter((item) => /^[0-9]+$/.test(item))
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item))
    const highestLowerCaseAlphabet = alphabets
      .filter((char) => char >= "a" && char <= "z")
      .reduce((highest, current) => (current > highest ? current : highest), " ")
    const response = {
      status: "success",
      user_id: "sidak_singh_10122002",
      email: "sm9732@@srmist.edu.in",
      roll_number: "RA2111003010464",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowerCaseAlphabet ? [highestLowerCaseAlphabet] : [],
      file_valid: fileInfo.file_valid,
      file_mime_type: fileInfo.file_mime_type,
      file_size_kb: fileInfo.file_size_kb,
    }

    res.json(response)
  } else {
    res.status(400).json({ error: 'Invalid JSON format. "data" key with an array value is required.' })
  }
})

// GET method endpoint
app.get("/bfhl", async (req, res) => {
  res.json({ operation_code: "1" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
