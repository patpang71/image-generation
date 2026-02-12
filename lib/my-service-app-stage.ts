// lib/my-service-app-stage.ts
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { MyServiceStack } from './my-service-stack'

// A Stage is a deployment of one or more stacks. 
// In this case, we only have one stack (MyServiceStack),
export class MyServiceAppStage extends cdk.Stage {
  public readonly serviceStack: MyServiceStack
  public readonly apiUrlOutput: cdk.CfnOutput

  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props)

    this.serviceStack = new MyServiceStack(this, 'MyServiceStack', {
      env: props?.env,
    })

    // Example: expose API URL or something for tests
    this.apiUrlOutput = this.serviceStack.apiUrlOutput
  }
}
