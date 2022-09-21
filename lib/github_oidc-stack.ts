import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Stack, StackProps } from 'aws-cdk-lib';
import { ImagePullPrincipalType } from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { Condition } from 'aws-cdk-lib/aws-stepfunctions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface GithubOidcStackProps extends StackProps {
  projectname: string;
  allowedBranchPatternToPush: string[];
  audience: string;
}

export class GithubOidcStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubOidcStackProps) {
    super(scope, id, props);

    const { projectname, allowedBranchPatternToPush, audience } = props;

    const githubOIDCProvider = new iam.OpenIdConnectProvider(
      this,
      'GithubActions', {
        url: 'https://token.actions.githubusercontent.com',
        clientIds: ['sts.amazonaws.com'],
        //thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1']
      }
    );  
    

    const GithubActionsRole = new iam.Role(this, 'GithubActionsRole', {
      assumedBy: new iam.WebIdentityPrincipal(
        githubOIDCProvider.openIdConnectProviderArn, 
        {
          StringEquals: {
          // Only allow tokens issued by aws-actions/configure-aws-credentials
          "token.actions.githubusercontent.com:aud": audience,
          // Only allow specified branches to assume this role
          "token.actions.githubusercontent.com:sub": allowedBranchPatternToPush,
          },
        }      
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
      roleName: 'aws-gh-oidc',
      description: `Role to assume from github actions pipeline of ${projectname}`,
      maxSessionDuration: cdk.Duration.hours(1),
    });

    const s3Bucket = new s3.Bucket(this, 'my-bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      //encryption: s3.BucketEncryption.KMS,
      // 👇 encrypt with our KMS key
     //encryptionKey: key,
    });
  } 

  
}
