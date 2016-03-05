package main

import (
	"fmt"
	"net/http"
	"runtime"

	"gopkg.in/redis.v3"
)

type Server struct {
	db *redis.Client
}

func (s *Server) handler(w http.ResponseWriter, r *http.Request) {
	results, _ := s.db.HGetAll("keystone:dynatron/metric::ebis-wlri-analysis:info").Result()
	fmt.Fprint(w, results)
}

func main() {
	runtime.GOMAXPROCS(1)
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	server := &Server{db: client}

	http.HandleFunc("/", server.handler)
	http.ListenAndServe(":3000", nil)
}
