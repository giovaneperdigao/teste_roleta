import * as PIXI from 'pixi.js';
import { NumeroRoleta, AtualizarSaldoDto } from './numero';

const app = new PIXI.Application();
let roleta = new PIXI.Sprite();
let chip = new PIXI.Sprite();
let gameOverSprite = new PIXI.Sprite();

const numeros = NumeroRoleta.getNumerosRoleta();

const limite_angulos = 360 / numeros.length;

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: "#ffffff",
    stroke: "#e6e6e6"

});

const estiloRoleta = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: "#fb0404",
    stroke: "#e6e6e6"
});

const estiloBet = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: "#00FF00",
    stroke: "#e6e6e6"
});

const resultadoRoleta = new PIXI.Text({ text: '10', style : estiloRoleta });
const numeroEscolhidoText = new PIXI.Text({ text: '', style : estiloBet });
const textoSaldo = new PIXI.Text({ text: '', style : style });
const valorBetText = new PIXI.Text({ text: '', style : style });

let valorSelecionado : number;
let valorBet : number = 50;
let saldoGeral: number = 1000;


function init() {
    (async () =>
        {
            await app.init({ width: 1280, height: 720 });
            document.body.appendChild(app.canvas);
            
            await PIXI.Assets.load('roleta3.png');
            await PIXI.Assets.load('seta.png');
            await PIXI.Assets.load('game_over.png');
            await PIXI.Assets.load('chip.png');
            await PIXI.Assets.load('add.png');
            await PIXI.Assets.load('subtract.png');
            
            
            app.stage.addChild(numeroEscolhidoText);       
            app.stage.addChild(textoSaldo);
            app.stage.addChild(valorBetText);

            roleta.width = roleta.width * 1.25;
            roleta.height = roleta.height * 1.25;
            
    
            numeroEscolhidoText.x = 10
            numeroEscolhidoText.y = 10
    
            textoSaldo.x = app.screen.width - 400
            textoSaldo.y = 10

            valorBetText.x = app.screen.width - 500
            valorBetText.y = app.screen.height - 100
    
            drawTable();
            drawSaldo();
            drawRoleta();
            drawBotoesAjusteBet();
            numeroEscolhidoText.text = 0;
            valorSelecionado = 0;
    })();
}

init();

function drawRoleta() {
    roleta = PIXI.Sprite.from('roleta3.png');
    let seta = PIXI.Sprite.from('seta.png'); 

    roleta.anchor.set(0.5);
    seta.anchor.set(0.5);
    
    seta.width = seta.width / 16
    seta.height = seta.height / 8

    roleta.x = app.screen.width / 2;
    roleta.y = app.screen.height / 2;

    roleta.width = roleta.width * 1.25;
    roleta.height = roleta.height * 1.25;

    seta.x = app.screen.width / 2;
    seta.y = (app.screen.height / 4) + 25;

    roleta.eventMode = 'static';
    roleta.cursor = 'pointer';

    roleta.on('pointerdown', spin);

    resultadoRoleta.x =  app.screen.width / 2;
    resultadoRoleta.y = app.screen.height / 2;

    app.stage.addChild(roleta);
    app.stage.addChild(seta);
    app.stage.addChild(resultadoRoleta);    
}

function drawTable() { 
    chip = PIXI.Sprite.from('chip.png'); 
    let estilo  = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: "#ffffff",
        stroke: "#000000"
    
    });

    chip.x = 100;
    chip.y = 50;

    chip.width = chip.width / 30;
    chip.height = chip.height / 30;

     numeros.forEach( n => {
        let graphics = new PIXI.Graphics();

        let height = 50;
        let width = 100;            
        let x = (100 * (((n.valor - 1) % 3) + 1));
        let y = (50 * (Math.floor((n.valor - 1) / 3) + 2));

        if (n.valor == 0 ) {
            width = 300;
            x = 100;
            y = 50;
        }

        let texto = new PIXI.Text({ text: n.valor, style : estilo });
        texto.x = x + 10
        texto.y = y + 10

        graphics.rect( x, y, width, height);
        graphics.stroke({ width: 2, color: '#000000' });
        graphics.fill(n.cor);
        graphics.addChild(texto);

        graphics.eventMode = 'static';
        graphics.cursor = 'pointer';

        graphics.on('pointerdown', () => {            
            bet(n, x, y)
        });
        
        app.stage.addChild(graphics);
    })

    app.stage.addChild(chip);
}

function drawSaldo () {
    getSaldo().then(s => {
        saldoGeral = s
        textoSaldo.text =  "Saldo: " + s

        if (valorBet > saldoGeral) {
            valorBet = 50;
            drawValorBet();
        }
    })
}

function bet(n: NumeroRoleta, x: number, y: number) {
    chip.x = x;
    chip.y = y;
    numeroEscolhidoText.text = n.valor;
    numeroEscolhidoText.style.fill = n.cor;
    valorSelecionado = n.valor;
}

function spin() {
    let tempo = Math.random() * 100;
    let printed = false;
    app.ticker.add((ticker) => {
        if (tempo > 1) {            
            let rotation = (0.1 + (0.05 * tempo))
            roleta.rotation += rotation * ticker.deltaTime;
        } else {
            if (!printed) {                
                printed = true;
                compararResultado(getResult());
            }                
        }
        tempo -= ticker.deltaTime;
    });
}

function getResult() : NumeroRoleta {
    let resultado = numeros[Math.floor((roleta.angle % 360) / limite_angulos)];
    resultadoRoleta.text = resultado.valor;
    resultadoRoleta.style.fill = resultado.cor as PIXI.FillInput;
    
    return resultado;
}
        
function compararResultado(r: NumeroRoleta) : boolean {
    let retorno = (valorSelecionado == r.valor);

    atualizarSaldo({ valor: valorBet, vitoria: retorno });    
    return retorno;
}


function getSaldo(): Promise<number> {
    return fetch('http://localhost:8080/bets')
        .then(res => res.json())
        .then(res => {
            return res as number
        }
    )
}

function atualizarSaldo(atualizarSaldoDto: AtualizarSaldoDto): Promise<void> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
  
    const request: RequestInfo = new Request('http://localhost:8080/bets', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(atualizarSaldoDto)
    })

      
    return fetch(request)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res > 0) {
                drawSaldo()
            } else {
                gameOver()
            }            
        })
  }

  function gameOver() {
    gameOverSprite = PIXI.Sprite.from('game_over.png');
    gameOverSprite.width = 1280;
    gameOverSprite.height = 720;
    gameOverSprite.eventMode = 'static';
    gameOverSprite.cursor = 'pointer';
    gameOverSprite.on('pointerdown', restart);

    app.stage.addChild(gameOverSprite);
    console.log("gameover");
  }

  function restart(): Promise<number> {
    console.log("restart");

    return fetch('http://localhost:8080/bets/reset')
        .then(res => res.json())
        .then(res => {
            app.stage.removeChild(gameOverSprite);
            valorBet = 50;
            drawSaldo();
            return res as number
        }
    )
  }


  function drawValorBet() {
    valorBetText.text =  "Valor da aposta: " + valorBet 
  }

  function drawBotoesAjusteBet() {
    let add = PIXI.Sprite.from('add.png');
    let subtract = PIXI.Sprite.from('subtract.png');
   
    add.x = app.screen.width - 140
    add.y = app.screen.height - 90

    add.height = add.height / 10
    add.width = add.width / 10

    subtract.x = app.screen.width - 550
    subtract.y = app.screen.height - 90

    subtract.height = subtract.height / 10
    subtract.width = subtract.width / 10

    add.eventMode = 'static';
    add.cursor = 'pointer';
    add.on('pointerdown', aumentarBet);

    subtract.eventMode = 'static';
    subtract.cursor = 'pointer';
    subtract.on('pointerdown', diminirBet);

    app.stage.addChild(add);
    app.stage.addChild(subtract);

    drawValorBet()

  }

  function aumentarBet() {
    if (valorBet < saldoGeral) {
        valorBet += 50
        drawValorBet()
    }
  }

  function diminirBet() {
    if (valorBet > 50) {
        valorBet -= 50
        drawValorBet()
    }
  }