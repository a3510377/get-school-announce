@ECHO OFF

docker build -t get-school-announce -f Dockerfile .
docker tag get-school-announce a3510377/get-school-announce
docker push a3510377/get-school-announce

docker build -t get-school-announce:linux-arm64 -f Dockerfile --platform linux/arm64 .
docker tag get-school-announce:linux-arm64 a3510377/get-school-announce:linux-arm64
docker push a3510377/get-school-announce:linux-arm64
