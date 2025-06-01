
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o restaurant-service ./main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/restaurant-service .
EXPOSE 8080
CMD ["./restaurant-service"]