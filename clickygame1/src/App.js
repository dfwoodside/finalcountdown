import React, { Component } from 'react';
import './App.css';
import characters from "./characters.json";
import CharacterCard from "./components/CharacterCard";
import Nav from "./components/Nav";
import Title from "./components/Title"
import Wrapper from "./components/Wrapper"
// import logo from './logo.svg';

class App extends Component {
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    characters: characters,
    unselectCharacters: characters
  }

  componentDidMount() {
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectCharacter = character => {
    const findCharacters = this.state.unselectCharacters.find(item => item.character === character);

    if (findCharacters === undefined) {
      // failure to select a new dog
      this.setState({
        message: "You guessed incorrectly!",
        topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        characters: characters,
        unselectCharacters: characters
      });
    }
    else {
      // success to select a new dog
      const newCharacters = this.state.unselectCharacters.filter(item => item.character !== character);

      this.setState({
        message: "You guessed correctly!",
        curScore: this.state.curScore + 1,
        characters: characters,
        unselectCharacters: newCharacters
      });
    }

    this.shuffleArray(characters);
  };


  render() {
    return (
      <Wrapper>
        <Nav
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <Title />
        {
          this.state.characters.map(character => (
            <CharacterCard
              character={character.character}
              image={character.image}
              selectDog={this.selectCharacter}
              curScore={this.state.curScore}
            />
          ))
        }
      </Wrapper>
    );
  }
}


export default App;
