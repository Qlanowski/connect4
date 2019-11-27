# Documentation
initial: https://www.overleaf.com/9334782269hthyvhhpjvcg
# Connect4

```shell
  npm install
```

```shell
  npm run start -- --columns=6 --rows=7 --forWin=4 --bot0Id=0 --bot1Id=1 --turn=1 --timeout=1000
```
where:
- columns: columns on board
- rows: rows on board
- forWin: count of checkers in a row for win
- bot0Id: selecting bot 0,1,2,3
- bot1Id: selecting bot 0,1,2,3
- turn: who starts 0-bot0  1-bot1
- timeout: time for bot to think in milliseconds

to play with bot select id of HumanBot 
