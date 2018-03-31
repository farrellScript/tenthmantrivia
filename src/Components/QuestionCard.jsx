import React, { Component } from 'react';

const styleSheet = {
    card:{
        marginBottom:'16px',
        marginTop:'16px'
    }
}

class QuestionCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            editMode:false,
            question: this.props.question,
            answer: this.props.answer
        }
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this._switchMode = this._switchMode.bind(this);
        this._updateAnswerText = this._updateAnswerText.bind(this);
        this._updateQuestionText = this._updateQuestionText.bind(this);
    }
    onDelete() {
        this.props.onChange(this.props.id);
    } 
    onSave() {
        this.props.onSave(this.props.id,this.state.question,this.state.answer);
        this.setState({editMode:false})
    } 
    _switchMode() {
        this.setState({'editMode':!this.state.editMode})
    }
    _updateQuestionText(e) {
        this.setState({'question':e})
    }
    _updateAnswerText(e) {
        this.setState({'answer':e})
    }
  render() {
    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={styleSheet.card}>

            <div className="mdl-card__supporting-text">
                
                {this.state.editMode === false ?
                    <div>
                        <p className="left bold">Question:</p>
                        <p className="left">{this.state.question}</p>
                        <p className="left bold">Answer:</p>
                        <p className="left">{this.state.answer}</p>
                    </div>
                    :
                    <div>
                        <p className="left bold">Question:</p>
                        <p className="left"><input className="cardinput" onChange={(e)=>this._updateQuestionText(e.target.value)} value={this.state.question}/></p>
                        <p className="left bold">Answer:</p>
                        <p className="left"><input className="cardinput" onChange={(e)=>this._updateAnswerText(e.target.value)} value={this.state.answer}/></p>
                    </div>
                }
            </div>
            <div className="mdl-card__actions mdl-card--border">
                {this.state.editMode === false ?
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this._switchMode}>
                    Edit
                    </a>
                :
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.onSave}>
                    Save
                    </a>
                }
                
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.onDelete}>
                Delete
                </a>
            </div>

        </div>

    );
  }
}

export default QuestionCard;
