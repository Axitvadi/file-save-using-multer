const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer')

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:false}))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {  // do not use file name that contain ":"(colon) in name
      cb(null, new Date().getTime() + '_' + file.originalname);
    }
  });
  //for single image
  app.use(multer({ storage: fileStorage }).single('image'))

  app.post('/upload',(req,res) => {
      res.status(200).json({
          success:true
      })
  })

app.listen(port,() => {console.log("server successfully started...")})