## How to build from Source cerebro-01
1. **Clone the Cerebro repos**

```
git clone https://github.com/pandu-witadi/cerebro-01.git
```

2. **Initialize a new Python Environment**

```
python3 -m virtualenv venv
```

3. **Install Cerebro**

```
pip install -e .
```

4. Edit **server/.env** file

```
verba start
```

5. **Launch Cerebro**

```
verba start
```

> You can specify the --port and --host via flags

## How to run frontend
1. Open **frontend* directory
```
cd frontend
```
2. install dependency
```
npm install
```
3. Edit environtment file **.env**
4. Run development mode
```
npm run start
```
5. Build for production
```
npm run build
```

## NOTE
ollama : http://127.0.01:11434 <server>

server : http://117.54.250.177:5154
