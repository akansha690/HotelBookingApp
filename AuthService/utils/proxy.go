package utils

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)


func ProxyToService(targetUrl string, pathPrefix string) http.HandlerFunc{
	fmt.Println("Setting up proxy to service:", targetUrl, "with path prefix:", pathPrefix)
	target, err := url.Parse(targetUrl)
	if err != nil {
		return func(w http.ResponseWriter, r *http.Request) {
			http.Error(w, "Failed to parse target URL",  http.StatusInternalServerError)
		}
		// return nil
	}
	proxy := httputil.NewSingleHostReverseProxy(target)
	proxyDirector := proxy.Director
		proxy.Director=func(r *http.Request) {
			
			proxyDirector(r)
			originalPath := r.URL.Path
			newPath := strings.TrimPrefix(originalPath, pathPrefix)
			r.URL.Scheme = target.Scheme
			r.URL.Host = target.Host 
			r.URL.Path = target.Path + newPath
			r.Host = target.Host 
			r.URL.Scheme = target.Scheme
			fmt.Println("Proxying request to:", r.URL)
			if userId, ok := r.Context().Value("userID").(string); ok {
				r.Header.Set("X-User-ID", userId)
			}
		}
		return proxy.ServeHTTP
	
}
