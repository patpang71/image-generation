// lib/my-service-stack.ts
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as path from 'path'

export interface MyServiceStackProps extends cdk.StackProps {}

export class MyServiceStack extends cdk.Stack {
  public readonly apiUrlOutput: cdk.CfnOutput

  constructor(scope: Construct, id: string, props?: MyServiceStackProps) {
    super(scope, id, props)

    const fn = new lambda.Function(this, 'EmployeeLambda', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'app.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambdas')),
      timeout: cdk.Duration.seconds(10),
      environment: {
        // your env vars (Dynamo table name, etc.)
      },
    })

    const api = new apigw.LambdaRestApi(this, 'ServiceApi', {
      handler: fn,
      proxy: true,
    })

    this.apiUrlOutput = new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
    })
  }
}
