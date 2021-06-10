import AWS from 'aws-sdk'
import express, { Request } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
const app = express()

const s3 = new AWS.S3({
  accessKeyId: process.env.FILE_UPLOAD_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.FILE_UPLOAD_AWS_SECRET_ACCESS_KEY,
})

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    // acl: 'public-read',
    bucket: process.env.AWS_BUCKET as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req: Request, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
        key: req.body.photoId + '/data',
        photoId: req.body.photoId,
        lightroomUUID: req.body.lightroomUUID,
      })
    },
    key: (req: Request, file, cb) => {
      cb(null, req.body.photoId + '/data')
    },
  }),
})

app.post('/', uploadS3.single('media'), (req, res) => {
  const file: any = req.file
  // {
  //   fieldname: 'media',
  //   originalname: '_MG_5152.CR2',
  //   encoding: '7bit',
  //   mimetype: 'text/plain',
  //   size: 2504817,
  //   bucket: 'dev-sensio-image-previews',
  //   key: '4/data',
  //   acl: 'private',
  //   contentType: 'application/octet-stream',
  //   contentDisposition: null,
  //   storageClass: 'STANDARD',
  //   serverSideEncryption: null,
  //   metadata: {
  //     fieldName: 'media',
  //     key: '4/data',
  //     photoId: '4',
  //     lightroomUUID: 'd3586861-f147-4283-a4b9-05cfcc60d4a0'
  //   },
  //   location: 'https://dev-sensio-image-previews.s3.eu-west-1.amazonaws.com/4/data',
  //   etag: '"1b7d35481ddef63d8b8065404154f5f1"',
  //   versionId: '6yZT2VV6UzEiCgfPE_92LOb_vuBTcDyu'
  // }
  console.log(`upload done for the ${file.location}`)
  res.json({
    uploaded: true,
    photoId: file.metadata.photoId,
    uploadedBucket: file.bucket,
    uploadedPath: file.key,
    fileSize: file.size,
    fileVersion: file.versionId,
  })
})

app.listen(1223, () => {
  console.log('listening upload service on http:localhost:1223')
})
