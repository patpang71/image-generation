// bin/my-service-app.ts
import * as cdk from 'aws-cdk-lib'
import { PipelineStack } from '../lib/pipeline-stack'
import { envConfig } from '../lib/costants'

const app = new cdk.App()

// This is the ONLY place you instantiate PipelineStack
new PipelineStack(app, 'MyServicePipelineStack', {
  env: {
    account: envConfig.dev.account,
    region: envConfig.dev.region,
  },
})

// No new stacks here other than the pipeline itself.
// The pipeline will in turn create "application stages" (Dev/Prod, etc.).
