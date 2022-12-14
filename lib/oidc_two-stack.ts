import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class GithubTestStack extends Stack{
  
    constructor(scope: Construct, id: string, props?: StackProps){
      super(scope, id, props);
  
      const s3Bucket = new s3.Bucket(this, 'my-bucket-test-oidc-stack-2', {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        //encryption: s3.BucketEncryption.KMS,
        // 👇 encrypt with our KMS key
       //encryptionKey: key,
      });
    }
  }