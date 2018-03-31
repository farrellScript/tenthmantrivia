import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import idb from 'idb';
import QuestionCard from '../Components/QuestionCard.jsx';

import Back from "../Components/Back.jsx";
const styleSheet = {
    card:{
        marginBottom:'16px',
        marginTop:'16px'
    }
}

class Manage extends Component {
    constructor(props){
        super(props)
        this.state = {
            question:'',
            answer:'',
            questions:[]
        }
        this._updateQuestion = this._updateQuestion.bind(this)
        this._updateAnswer = this._updateAnswer.bind(this)
        this._addToList = this._addToList.bind(this)
        this._deleteQuestion = this._deleteQuestion.bind(this)
        this._editQuestion = this._editQuestion.bind(this)
    }
    componentWillMount(){
        var dbPromise = idb.open('tenthmantrivia')
        dbPromise.then((db)=>{
            var tx = db.transaction('trivia','readwrite')
            var store = tx.objectStore('trivia')
            return store.getAll()
        }).then((res)=>{
            console.log('res',res)
            this.setState({questions:res})
        })
    }
    _updateQuestion(text){
        this.setState({'question':text})
    }
    _updateAnswer(text){
        this.setState({'answer':text})
    }
    _addToList(){
        var dbPromise = idb.open('tenthmantrivia')
        dbPromise.then((db)=>{
            var tx = db.transaction('trivia','readwrite')
            var store = tx.objectStore('trivia')
            store.add({
                id: new Date(),
                question:this.state.question,
                answer:this.state.answer
            });
            return tx.complete;
        })
        dbPromise.then((db)=>{
            var txx = db.transaction('trivia','readwrite')
            var store2 = txx.objectStore('trivia')
            store2.getAll().then((res)=>{
                
                this.setState({questions:res})
            })
        })
    }
    _editQuestion(id,question,answer){
        var dbPromise = idb.open('tenthmantrivia')
        dbPromise.then((db)=>{
            var tx = db.transaction('trivia','readwrite')
            var store = tx.objectStore('trivia')
            store.put({id,question,answer});
            return tx.complete;
        })
        dbPromise.then((db)=>{
            var txx = db.transaction('trivia','readwrite')
            var store2 = txx.objectStore('trivia')
            store2.getAll().then((res)=>{  
                this.setState({questions:res})
            })
        })
    }
    _deleteQuestion(id){
        var dbPromise = idb.open('tenthmantrivia')
        dbPromise.then((db)=>{
            var tx = db.transaction('trivia','readwrite')
            var store = tx.objectStore('trivia')
            store.delete(id);
            return tx.complete;
        })
        dbPromise.then((db)=>{
            var txx = db.transaction('trivia','readwrite')
            var store2 = txx.objectStore('trivia')
            store2.getAll().then((res)=>{  
                this.setState({questions:res})
            })
        })
    }
  render() {
    const questions = this.state.questions.map((item)=>{
        return <QuestionCard key={item.id} {...item} onSave={this._editQuestion} onChange={this._deleteQuestion}/>;
    })
    return (
      <div className="App">
        <div className="header">
          
          <button className="option-button left-option">
            <Link to={'/'}><Back/></Link>
          </button>
        </div>
        <div className="center-container">
            <h3>Create Question</h3>
            <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={styleSheet.card}>
                <div className="mdl-card__actions mdl-card--border">
                    <p className="left bold">Question:</p>
                    <p className="left"><input className="cardinput" onChange={(e)=>this._updateQuestion(e.target.value)}  value={this.question} placeholder="Type Question Here"/></p>
                    <p className="left bold">Answer:</p>
                    <p className="left"><input className="cardinput" onChange={(e)=>this._updateAnswer(e.target.value)} value={this.answer} placeholder="Type Answer Here"/></p>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this._addToList}>
                        Save Question
                        </a>
                    </div>
                </div>
            </div>

            <h3>Existing Questions</h3>
            <div>
                {questions}
            </div>
        </div>
      </div>
    );
  }
}

export default Manage;
