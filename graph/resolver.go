package graph

import "mblydenburgh/poc/go-graph/graph/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	UserStore map[string]model.User
}
