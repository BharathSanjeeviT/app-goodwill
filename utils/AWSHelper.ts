import AWS from 'aws-sdk';
import { ACCESS_KEY, REGION, SECRET_KEY } from './config';

AWS.config.update({ 
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
});

const s3 = new AWS.S3();

export const uploadFilesToS3 = (bucketName: string, fileName: string, filePath: Blob) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: filePath,
    ContentType: filePath.type,
  };
  return s3.upload(params).promise();
}
