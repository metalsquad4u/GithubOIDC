#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GithubTestStack } from '../lib/oidc_two-stack';

const app = new cdk.App();

new GithubTestStack(app, 'TestStack', {
    stackName: 'TestStack',
    env: {
      region: 'us-east-1'
    }
  })