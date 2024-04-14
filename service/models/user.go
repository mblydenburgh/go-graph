package service

type User struct {
  PK string
  SK string
  DisplayName string `dynamo:"displayName"`
  Email string `dynamo:"email"`
  Integrations []string `dynamo:",set"`
  Products []string `dynamo:",set"`
  Roles []string `dynamo:",set"`
}
