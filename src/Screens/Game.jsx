import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import idb from 'idb';
import '../index.css';
import Gear from "../Components/Gear.jsx";
const styleSheet = {
    app: {
        position: 'relative'
    },
    gameOver: {
        position: 'absolute',
        top: '-100vh',
        left: '10px',
        width: 'calc(100% - 72px)',
        height: 'calc(100vh - 72px)',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #333',
        borderRadius: '4px',
        textAlign: 'center',
        transition: '800ms cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    },
    gameOverActive:{
        position: 'absolute',
        left: '10px',
        width: 'calc(100% - 72px)',
        height: 'calc(100vh - 72px)',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #333',
        borderRadius: '4px',
        textAlign: 'center',
        transition: '800ms cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        top: '10px',
    },
    mb: {
        marginBottom: '12px',
    },
    mbhalf: {
        marginBottom: '12px',
        width: '50%',
        float: 'left'
    },
    arrow: {
        transition: '.5s',
        width: '40px',
        height: '16px'
    },
    arrowAway: {
        transform: 'rotate(180deg)'
    },
    arrowHome: {

    },
    bold: {
        fontWeight: '900',
        fontFamily: 'DSG Sans-Black',letterSpacing:'1px',
    },
    homeScore: {
        width: '50%',
        float:'left',
        textAlign:'left'
    },
    awayScore: {
        width: '50%',
        float:'right',
        textAlign:'right'
    },

    base: {
        width: '16px',
        height: '16px',
        border: '1px solid black',
        display: 'inline-block',
        transform: 'rotate(45deg)',
        background: '#fafafa'
    },
    homePlate: {
        background: '#b5b5b5'
    },
    baseActive: {
        background:'black'
    },
    baseContainer: {
        width: '100px',
        display: 'inline-block'
    },
    pitchOption: {
        border: '1px solid black',
        borderRadius: '3px',
        margin: '12px 16px',
        padding: '16px 6px',
        width: 'calc(100% - 32px)',
        fontWeight: '600',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontFamily: 'DSG Sans-Black',letterSpacing:'1px',
        background: '#fafafa'
    },
    newQuestionsButton: {
        border: '1px solid #fafafa',
        borderRadius: '3px',
        padding: '16px',
        display: 'block',
        width: 'auto',
        margin: '0 auto',
        textAlign: 'center',
        background: 'transparent',
    },
    newQuestions: {
        color: '#fafafa',
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        display: 'block',
        width: '100%',
        marginTop:'6px',
        marginBottom: '6px',
        fontSize:'20px',
        fontFamily: 'DSG Sans-Black',letterSpacing:'1px',
        background: 'transparent',
        border: 'none'
    },
    newQuestionsSmall: {
        color: 'white',
        fontSize: '16px',
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        display: 'block',
        width: '100%',
        marginTop:'6px',
        marginBottom: '6px',
        fontFamily: 'DSG Sans-Black',letterSpacing:'1px',
    },
    newQuestionsSelect: {
        color: '#fafafa',
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        display: 'block',
        width: '100%',
        marginTop:'6px',
        marginBottom: '6px',
        fontSize:'20px',
        textDecoration: 'underline',
        fontFamily: 'DSG Sans-Black',letterSpacing:'1px',
        border: 'none',
        background: 'transparent'
    },
    theQuestion: {
        padding: '18px',
        fontSize: '24px',
        fontFamily: 'DSG Sans-Black',letterSpacing:'1px',
        color: '#fafafa'
    },
    newGameButton: {
        textTransform: 'uppercase',
        fontSize: '24px',
        border: '1px solid #333',
        background: 'rgba(0,0,0,.9)',
        borderRadius: '3px',
        padding: '12px',
        marginTop: '20px',
        color:'white',
    }
};

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            home: 0,
            away:0,
            inning: 1,
            maxInnings: 1,
            outs: 0,
            firstBase:false,
            secondBase:false,
            thirdBase:false,
            pitches:[],
            selectedQuestion: {
                question:'',
                answer: ''
            },
            turn: 'question',
            questionSelected:false,
            atBat: 'away',
            gameOver: false
        }
        
        this._choosePitch = this._choosePitch.bind(this)
        this._seeAnswer = this._seeAnswer.bind(this)
        this._endAtBat = this._endAtBat.bind(this)
        this._startNewGame = this._startNewGame.bind(this)
        this._setFirstBase = this._setFirstBase.bind(this)
        this._checkFirstBase = this._checkFirstBase.bind(this)
        this._checkSecondBase = this._checkSecondBase.bind(this)
    }
    componentWillMount(){
        var dbPromise = idb.open('tenthmantrivia')
        dbPromise.then((db)=>{
            var tx = db.transaction('trivia','readwrite')
            var store = tx.objectStore('trivia')
            store.getAll().then((res)=>{  
                console.log('res',res)
                this.setState({'pitches':res})
            })
        })
    }

    _choosePitch(question,answer){
        
        this.setState({'questionSelected':true,'selectedQuestion':{'question':question,'answer':answer}},function(){
            
        })
    }
    _seeAnswer(){
        this.setState({'turn':'answer'})
    }
    _setFirstBase(){
        this.setState({'firstBase':true})
    }
    _checkFirstBase(){
        if(this.state.firstBase === true){
            this.setState({'secondBase':true,'firstBase':false },()=>{this._setFirstBase()})
        }else{
            this._setFirstBase()
        }
    }
    _checkSecondBase(){
        console.log('second')
        if(this.state.secondBase === true){
            this.setState({'thirdBase':true, secondBase:false}, ()=>{this._checkFirstBase()})
        }else{
            this._checkFirstBase()
        }
    }
    _endAtBat(value){
        
        this.setState({'questionSelected':false,'selectedQuestion':{'question':'','answer':''}})
        if(value === 'yes'){
            if(this.state.thirdBase === true){   
                if(this.state.atBat === 'away'){
                    let atBat = this.state.away
                    this.setState({'away':atBat+1, thirdBase:false},()=>this._checkSecondBase())
                }else{
                    let atBat = this.state.away
                    this.setState({'home':atBat+1, thirdBase:false},()=>this._checkSecondBase())
                }    
            }
            this._checkSecondBase()
        }else{
            if(this.state.outs < 2){
                this.setState({'outs':this.state.outs+1})
            }else{
                if((this.state.inning === this.state.maxInnings)&&(this.state.atBat === 'home')){
                    this.setState({'gameOver':true})
                }else{
                    if(this.state.atBat === 'away'){
                        this.setState({'outs':0,'atBat':'home', 'firstBase':false,'secondBase':false,'thirdBase':false})
                    }else{
                        this.setState({'outs':0,'atBat':'away', 'firstBase':false,'secondBase':false,'thirdBase':false})
                    }
                }
                
            }
            
            
        }
        this.setState({'turn':'question'})
        
    }
    _startNewGame(){
        this.setState({
            home: 0,
            away:0,
            inning: 1,
            maxInnings: 1,
            outs: 0,
            firstBase:false,
            secondBase:false,
            thirdBase:false,
            selectedQuestion: {
                question:'',
                answer: ''
            },
            turn: 'question',
            questionSelected:false,
            atBat: 'away',
            gameOver:false
        }
    )
        
        
    }
  render() {
    let questions
    if(this.state.pitches.length === 0){
        questions =  <button style={styleSheet.pitchOption}><Link to={'/manage'}>Go Add Some Questions</Link></button>
    }else{
        questions = this.state.pitches.map((item,index)=>{
            return <button key={index} id={index} style={styleSheet.pitchOption} onClick={()=>this._choosePitch(item.question,item.answer)}>{item.question}</button>;
        })
    }

    return (
      <div className="App" style={styleSheet.app}>
        <div className="header">
          <h1 className="h1">Tenth Man Trivia</h1>

          <button className="option-button">
            <Link to={'/manage'}><Gear/></Link>
          </button>
        </div>
        <div className="scoreboard">
            <div className="center">
                <div>
                    <span className="bold-left">Inning :</span> 
                    <span className="bold-right">{this.state.inning} 
                    {this.state.atBat === "away"?
                        <img alt="Top of the Inning" src="/img/downarrow.svg" style={{...styleSheet.arrow,...styleSheet.arrowAway}} />
                    :
                        <img alt="Bottom of the inning" src="/img/downarrow.svg" style={{...styleSheet.arrow,...styleSheet.arrowHome}} />
                    }
                    </span>
                </div>
                
                <div>
                    <span className="bold-left">Outs :</span> <span className="bold-right">{this.state.outs}</span>
                </div>
                <div>
                    <span className="bold-left">Home Team :</span> <span className="bold-right">{this.state.home}</span>
                </div>
                <div>
                    <span className="bold-left">Away Team :</span> <span className="bold-right">{this.state.away}</span>
                </div>
            </div>
        </div>
        <div className="field" style={styleSheet.field}>
            <div className="row">
                <span style={styleSheet.baseContainer}>
                    {this.state.secondBase === true ?
                    <span className="secondBase base" style={{...styleSheet.base,...styleSheet.baseActive}}></span>
                    :
                    <span className="secondBase base" style={styleSheet.base}></span>
                    }
                </span>
            </div>
            <div className="row">
                <span className="middle-row">
                    {this.state.thirdBase === true ?
                        <span className="thirdBase base" style={{...styleSheet.base,...styleSheet.baseActive}}></span>
                    :
                        <span className="thirdBase base" style={styleSheet.base}></span>
                    }
                </span>
                <span className="middle-row">
                {this.state.firstBase === true ?
                        <span className="firstBase base" style={{...styleSheet.base,...styleSheet.baseActive}}></span>
                    :
                        <span className="firstBase base" style={styleSheet.base}></span>
                    }
                </span>
            </div>
            <div className="row">
                <span className="homePlate base" style={{...styleSheet.base,...styleSheet.homePlate}}></span>
            </div>
        </div>
        <div className="clear"></div>
        <div className="questionsection">
            {this.state.turn === 'question' ?
                <div>
                    {this.state.questionSelected === true ?
                        <div>
                            <h4 style={{...styleSheet.theQuestion,...styleSheet.bold}} ><span>Question: </span>{this.state.selectedQuestion.question}</h4>
                            <button  style={styleSheet.newQuestions} onClick={this._seeAnswer}>See Answer</button>
                        </div>
                    :
                        <div>
                            <button style={styleSheet.newQuestions}>Choose your pitch</button>

                            {questions}
       
                        </div>
                    }
                    
                </div>
                :
                <div>
                    <h4 style={{...styleSheet.theQuestion,...styleSheet.bold}}>Answer: {this.state.selectedQuestion.answer}</h4>
                    <button  style={{...styleSheet.newQuestions,...styleSheet.newQuestionsButton}} onClick={()=>this._endAtBat('yes')}>Answered Correctly</button>
                    <p style={styleSheet.newQuestionsSmall}>OR</p>
                    <button  style={{...styleSheet.newQuestions,...styleSheet.newQuestionsButton}} onClick={()=>this._endAtBat('no')}> Answered Incorrect</button>
                </div>
            }
            
            
        </div>
        <div className="gameover" style={this.state.gameOver === false? styleSheet.gameOver:styleSheet.gameOverActive}>
            {this.state.home > this.state.away?
            <h2>Home Team Won!</h2>
            :
            <h2>Away Team Won!</h2>
            }
            <h3>Final Score:</h3>
            <p>Home Team: {this.state.home}</p>
            <p>Away Team: {this.state.away}</p>
            <button style={styleSheet.newGameButton} onClick={this._startNewGame}>Start a new game?</button>
        </div>
        
      </div>
    );
  }
}

export default Game;
