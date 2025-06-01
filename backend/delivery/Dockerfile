FROM golang:1.21-alpine as builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o delivery ./cmd/delivery

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/delivery .
EXPOSE 8080
CMD ["./delivery"]
