package main

import (
	"fmt"
	"net/http"
	"gopkg.in/redis.v3"
)

func handler(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprint(w, "Hello World!");
	client := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		Password: "",
		DB: 0,
	})

	results, _ := client.HGetAll("keystone:dynatron/metric::ebis-wlri-analysis:info").Result()
	fmt.Fprint(w, results)
	//fmt.Printf("The type is: %s \n", results)
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":3000", nil);
}
