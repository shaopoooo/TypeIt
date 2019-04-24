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
  this.setArticle     = this.setArticle.bind(this);
  this.newArticle     = this.newArticle.bind(this);

  this.state = {
      article   :"no article.",
      articleArry:"no article.",
      correct:true,
      input :'',
      started:false,
      inputNum:0,
      wpm:0,
      changedNum:0,
      timer:0,
      timerId:'',
      page:0,
      articles:[]
    };
  }

  fetchartical(){
    //tmp article
    const article = "Scrum is a framework within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value.";
    //fetch
    const url     ="https://newsapi.org/v2/top-headlines?";
    const country ="country=us&"
    const key     ="apiKey=1c285c377280404cbfba2dbfaa5d3bec";

    fetch(`${url}${country}${key}`)
      .then(response => response.json())
      .then(result => this.setArticle(result,this.state.page))
      .catch(error => error);

  }
  setArticle(res,page){
    var tmparticle = res.articles[page].description.split("");
     this.setState({
      res,
      article     :res.articles[page].description,
      articleArry :tmparticle
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
      console.log(articleArry[i],inputTerm[i])
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

  newArticle(){
    this.timerStop();
    this.setState({
      page: this.state.page + 1,
      correct:true,
      input :'',
      started:false,
      inputNum:0,
      wpm:0,
      changedNum:0,
      timer:0,
      timerId:'',
    })
    document.getElementById('input').value="";

    this.setArticle(this.state.res,this.state.page + 1);
  }

 componentDidMount(){
    this.fetchartical();
 }

 componentDidUpdate(){
  //console.log(this.state.inputTerm);
 }

 render() {
  const{ articles } = this.state;

  return(
    <div className='container'>
      <div className='articalarea'>
        <textarea className='typebox' readOnly='ture' value={this.state.article}/>
      </div>

      <div className='typearea'>
        <textarea id='input' className={"typebox " + (this.state.correct? 'Green':'Red')} type ='text' onChange={this.onTyping} placeholder="type here to start"/>
      </div>

      <div className='infoarea1'>
        <div className='tocenter'>
          <h2>WPM:{this.state.wpm}</h2>
          <h4>time:{this.state.timer}s  letter:{this.state.inputNum}</h4>
        </div>
      </div>
      <div className='infoarea2'>
        <div className='tocenter'><h2>maybe AD here</h2></div>
      </div>
      <div className='btnarea1' onClick={this.timerStop}>
        <div className='tocenter'><h2>timer stop</h2></div>
      </div>
      <div className='btnarea2' onClick={this.newArticle}>
        <div className='tocenter'>
          <h2>article:{this.state.page+1}/20</h2>
          <h4>Click me to change article</h4>
        </div>
      </div>
    </div>
  );
 }
}

export default App;
