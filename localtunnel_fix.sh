function localtunnel {
  lt -s mwtbroadcastlocal4444 --port 8000
}

until localtunnel; do
  echo "localtunnel server crashed"
  sleep 2
done