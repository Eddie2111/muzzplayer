const AWS = require('aws-sdk');
const GetEnv = require('../env');

let s3Instance = null;

async function createS3Instance() {
  const env = await GetEnv();

  return new AWS.S3({
    accessKeyId: env.AWS_ACCESSKEYID,
    secretAccessKey: env.AWS_SECRETKEY,
    region: env.AWS_REGION,
  });
}

async function getS3Instance() {
  if (!s3Instance) {
    s3Instance = await createS3Instance();
  }
  return s3Instance;
}

module.exports = getS3Instance;