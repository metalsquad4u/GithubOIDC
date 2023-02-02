#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GithubOidcStack } from '../lib/github_oidc-stack';
import { GithubTestStack } from '../lib/oidc_two-stack';


const app = new cdk.App();


const projectname = 'aws-gh-oidc';
const audience = 'sts.amazonaws.com'

new GithubOidcStack(app, 'GithubOidcStack', {
  projectname,
  allowedBranchPatternToPush: [
    'repo:metalsquad4u/GithubOIDC:ref:refs/heads/main',
    'repo:metalsquad4u/DoubleStackOIDC:ref:refs/heads/main'
  ],
  audience,
    
  stackName: 'GithubOidcStack',  

});


new GithubTestStack(app, 'TestStack', {
  stackName: 'TestStack',
  
})

