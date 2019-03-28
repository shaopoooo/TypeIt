import React, { Component } from 'react';

const DEAFULT_QUERY = 'redux';

const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query=';

const url=`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEAFULT_QUERY}`;

console.log(url);

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      result: null,
      searchTerm:DEAFULT_QUERY,
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    
  }

  setSearchTopStories(result){
    this.setState({ result });

    console.log(this.state.result);
  }

  onSearchChange(){

  }

  onDismiss(){

  }

  componentDidMount() {
    const {searchTerm} = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);

  }

  render() {

    const {result, searchTerm} = this.state;

    console.log(this.state);

    if(!result) {return null;}

    return(
      <div className='page'>
        <Table
          list = {result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  } 
}

class Table extends Component{
  render() {
     const {list, pattern, onDismiss} = this.props;
     
     return(
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss()}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
          )}
      </div>
    )
  }
}

function isSearched(searchTerm){
  return function (item){
    return searchTerm.toLowerCase();
  }
}

export default App;
