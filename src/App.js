import React from "react";
import "./App.css";

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

const initialLetterObjectArray = [
  ["A",images[0]],
  ["B", images[1]],
  ["C", images[2]],
  ["D", images[3]],
  ["E", images[4]]
];

function LetterSelectList(props) {
  const letters = props.letterObjectArray.map(letterObjectPair => letterObjectPair[0]);
  const letterButtons = letters.map((letter, index) =>
    <button id={index} value={letter} onClick={props.onClick} className={props.selected === letter ? "selected" : ""}>{letter}</button>
  );
  
  return (
    <div>
      {letterButtons}
    </div>
  )
}

function ObjectSelectList(props) {
  const letterObjectPairs = props.letterObjectArray;

  const objectButtons = letterObjectPairs.map((pair, index) => {
    const objectButtonStyle = {
      backgroundImage: `url(${pair[1]})`,
      backgroundPosition: `center`,
      backgroundSize: `100% 100%`
    };
    
    return (
      <button id={index} className={props.selected === pair[0] ? "selected" : ""} value={pair[0]} onClick={props.onClick} style={objectButtonStyle}></button>
    )
  });
  
  return (
    <div>
      {objectButtons}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letterObjectArray: initialLetterObjectArray,

      selectedLetter: "",
      selectedObject: ""
    };

    this.handleLetterClick = this.handleLetterClick.bind(this);
    this.handleObjectClick = this.handleObjectClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleLetterClick(event) {
    let buttonValue = event.target.value;

    if (buttonValue !== this.state.selectedLetter) {
      this.setState({selectedLetter: buttonValue}, () => {
        if (this.state.selectedLetter === this.state.selectedObject) {
          const newLetterObjectArray = this.state.letterObjectArray.filter(pair => pair[0] !== buttonValue);
          
          this.setState({
            selectedLetter: "",
            selectedObject: "",
            letterObjectArray: newLetterObjectArray,
          })
        }
      });
    } else {
      this.setState({selectedLetter: ""});
    }
  }

  handleObjectClick(event) {
    let buttonValue = event.target.value;
    console.log(event.target.value);

    if (buttonValue !== this.state.selectedObject) {
      this.setState({selectedObject: buttonValue}, () => {
        if (this.state.selectedLetter === this.state.selectedObject) {
          const newLetterObjectArray = this.state.letterObjectArray.filter(pair => pair[0] !== buttonValue);

          this.setState({
            selectedLetter: "",
            selectedObject: "",
            letterObjectArray: newLetterObjectArray,
          })
        }
      });
    } else {
      this.setState({selectedObject: ""});
    }
  }

  resetGame() {
    this.setState({
      letterObjectArray: initialLetterObjectArray,
    })
  }

  render() {
    if (this.state.letterObjectArray.length > 0) {
      return (
        <div>
          <h1>Alphabet Match!</h1>
          <div id="letter-select">
            <p>Pick a letter!</p>
            <LetterSelectList onClick={this.handleLetterClick} selected={this.state.selectedLetter} letterObjectArray={this.state.letterObjectArray} />
          </div>
          <div id="letter-select">
            <p>Pick an object!</p>
            <ObjectSelectList onClick={this.handleObjectClick} selected={this.state.selectedObject} letterObjectArray={this.state.letterObjectArray} />
          </div>
  
          <p>{this.state.selectedLetter}</p>
          <p>{this.state.selectedObject}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Congratulations! You've finished the Alphabet Match!</h1>
          <button onClick={this.resetGame}>Reset the Game</button>
        </div>
      )
    }
  }
}

export default App;
