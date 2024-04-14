package service

import (
  "github.com/aws/aws-sdk-go/aws"
  "github.com/aws/aws-sdk-go/aws/session"
  "github.com/guregu/dynamo"
  "mblydenburgh/poc/go-graph/service/models"

  "fmt"
)

func getUser(id string) (*service.User, error) {
  fmt.Println("getting user ", id)
  sess := session.Must(session.NewSession())
  db := dynamo.New(sess, &aws.Config{Region: aws.String("us-east-1")})
  table := db.Table("go-graph-table")

  var res service.User
  err := table.Get("PK", id).Range("SK", dynamo.BeginsWith, "User#").One(&res)
  if err == nil {
    return nil, fmt.Errorf("User %s not found", id)
  }
  return &res, nil
}
