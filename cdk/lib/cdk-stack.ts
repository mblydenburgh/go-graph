import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as eventSource from "aws-cdk-lib/aws-lambda-event-sources";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import path = require("path");

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "Table", {
      tableName: "go-graph-table",
      partitionKey: {
        name: "PK",
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: "SK",
        type: dynamodb.AttributeType.STRING
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
    table.addGlobalSecondaryIndex({
          indexName: "GSI1",
          partitionKey: {
            name: "GSI1PK",
            type: dynamodb.AttributeType.STRING
          },
          sortKey: {
            name: "GSI1SK",
            type: dynamodb.AttributeType.STRING
          }
    })

    // new docker based go lambda
    const goLambda = new lambda.DockerImageFunction(this, "GoLambda", {
      functionName: "go-graph-lambda",
      code: lambda.DockerImageCode.fromImageAsset(path.resolve(__dirname, "../../")),
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
    });
    goLambda.addEventSource(new eventSource.ApiEventSource("ANY", "/"))

  }
}
