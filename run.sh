git pull

echo "Running $0"

while true; do
  sudo sync && sudo echo 3 > /proc/sys/vm/drop_caches
  sudo git pull
  sudo rm -rf .git/refs/original/
  sudo npm i
  sleep 5m
done
