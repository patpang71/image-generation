// lib/pipeline-stack.ts
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
  CodeBuildStep,
} from 'aws-cdk-lib/pipelines'
import { MyServiceAppStage } from './my-service-app-stage'
import { envConfig } from './costants'

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const pipeline = new CodePipeline(this, 'MyServicePipeline', {
      pipelineName: 'MyServicePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'patpang71/image-generation',
          'main',
          { connectionArn: envConfig.dev.connection },
        ),
        commands: [
          'npm ci',
          'npm run build',
          'cd lambdas',
          'pip install -r requirements.txt -t .',
          'pytest tests',
          'cd ..',
          'npx cdk synth',
        ],
        primaryOutputDirectory: 'cdk.out',
      }),
    })

    // 1) create the Stage (your app env)
    const devApp = new MyServiceAppStage(this, 'Dev', {
      env: {
        account: this.account,
        region: this.region,
      },
    })

    // 2) add it to the pipeline (returns StageDeployment)
    const devStage = pipeline.addStage(devApp)

    // 3) post-deploy integration tests using envFromCfnOutputs
    devStage.addPost(
      new CodeBuildStep('IntegrationTests', {
        commands: [
          'python -m pip install -r lambdas/requirements-dev.txt || true',
          'pytest lambdas/tests',
        ],
        envFromCfnOutputs: {
          // 👈 This is the key part: use the Stage, not StageDeployment
          API_URL: devApp.apiUrlOutput,
        },
      }),
    )
  }
}
