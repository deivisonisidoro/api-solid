import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, cb)=>{
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, cb)=>{
      crypto.randomBytes(16, (err, hash)=>{
        if (err) {
          cb(err, file.filename)
        }else{
          file.key = `${hash.toString('hex')}-${file.originalname}`;
          cb(null, file.key);
        }

      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'barber-upload-photo',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, cb)=>{
      crypto.randomBytes(16, (err, hash)=>{
        if (err) {
          cb(err, file.filename)
        }else{
          const fileName = `${hash.toString('hex')}-${file.originalname}`;
          cb(null, fileName);
        }

      });
    }
  })
}

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['s3'],
  fileFilter: (request, file, cb )=>{
    const allowedMimes = [
     'video/x-flv',
     'video/mp4',
     'video/MP2T',
     'application/x-mpegURL',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    }else{
      cb(new Error('Invalid file type.'))
    }
  },
};