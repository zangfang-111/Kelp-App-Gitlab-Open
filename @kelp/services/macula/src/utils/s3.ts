import { S3 } from 'aws-sdk'

export const sourceBucket: S3 = new S3({
  params: { Bucket: process.env.AWS_BUCKET as string },
})

export async function get(params: { Key: string }, bucket = sourceBucket) {
  const s3Params = {
    ...params,
    Bucket: process.env.AWS_BUCKET as string,
  }

  return bucket.getObject(s3Params).promise()
}
