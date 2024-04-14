# constsant to hold app name
APP_NAME=go-graphql

generate:
	go run github.com/99designs/gqlgen generate
tidy:
	go fmt ./...
	go mod tidy -v
docker-build:
	docker build -t ${APP_NAME} .
run:
	go run server.go
