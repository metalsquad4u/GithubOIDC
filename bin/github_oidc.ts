#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GithubOidcStack, GithubTestStack } from '../lib/github_oidc-stack';

const app = new cdk.App();


const projectname = 'aws-gh-oidc';
const audience = 'sts.amazonaws.com'

new GithubOidcStack(app, 'GithubOidcStack', {
  projectname,
  allowedBranchPatternToPush: ['repo:metalsquad4u/GithubOIDC:ref:refs/heads/main'],
  audience,

  env:{
    region: 'us-east-1',
    //account: '683578897984',
  }

});

new GithubTestStack(app, 'TestStack', {
  stackName: 'TestStack',
  env: {
    region: 'us-east-1'
  }
})