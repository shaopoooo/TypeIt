import React, { Component } from 'react';
import './App.css';
import './index.css';

class App extends Component {
 constructor(props){
  super(props);

  this.fetchartical   = this.fetchartical.bind(this);
  this.onTyping       = this.onTyping.bind(this);
  this.timerStart     = this.timerStart.bind(this);
  this.timerStop      = this.timerStop.bind(this);

  this.state = {
      article   :"no article.",
      articleArry:"no article.",
      correct:true,
      input :'',
      started:false,
      inputShow:'',
      inputNum:0,
      wpm:0,
      changedNum:0,
      timer:0,
      timerId:'',
      page:''
    };
  }

  fetchartical(){
    //fetch
    const article = "Scrum is a framework within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value.";
    //article to arry
    var tmparticle = article.split("");
    this.setState({
      article:article,
      articleArry:tmparticle
    })

  }
  timerStart(){
    var timerInerval = setInterval(()=>{
      this.setState({
        timer:this.state.timer + 1,
        timerId:timerInerval,
      })
    },1000);
  }
  timerStop(){
    clearInterval(this.state.timerId);
    this.setState({
          started:false,
    });
  }

  onTyping(event){
    const { started, timer ,articleArry} = this.state;
    //timer on
    if(!started){
        this.setState({
          started:true,
        });
        this.timerStart();
    }
    //counting rpm

    //check array
    const inputTerm = event.target.value.split("");
    var tmp = true;

    for(var i=0;i<inputTerm.length;i++){
      if(articleArry[i]==inputTerm[i]){
        tmp=true;
      }
      else{
        tmp=false;
        break;
      }
    }

    var wpm = parseInt(inputTerm.length)/parseInt(this.state.timer)*12;
    wpm = wpm.toFixed(2);
    //output
    this.setState({
        correct   : tmp,
        inputArry : inputTerm,
        inputNum  : inputTerm.length,
        wpm       : wpm
    });
  }

 componentDidMount(){
    this.fetchartical();
 }

 componentDidUpdate(){
  //console.log(this.state.inputTerm);
 }

 render() {
  return(
    <div className='container'>
      <div className='naviarea'>
        <nav>
          <ul>
            <li>
              <a href='#'>English</a>
            </li>
            <li>
              <a href='#'>Chinese</a>
            </li>
            <li>
              <a href='#'>code</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='articalarea'>
        <textarea className='typebox' readOnly='ture' value={this.state.article}/>
      </div>

      <div className='typearea'>
        <textarea className={"typebox " + (this.state.correct? 'Green':'Red')} type ='text' onChange={this.onTyping} placeholder="type here to start"/>
      </div>

      <div className='infoarea1'>
        <h3>timer:{this.state.timer}</h3>
        <h3>letter:{this.state.inputNum}</h3>
        <h3>WPM:{this.state.wpm}</h3>
      </div>
      <div className='infoarea2'>
        Ad here
      </div>
      <div className='btnarea1' onClick={this.timerStop}>
        timer stop
      </div>
      <div className='btnarea2' onClick={}>
        change article.
      </div>
    </div>
  );
 }
}

export default App;
