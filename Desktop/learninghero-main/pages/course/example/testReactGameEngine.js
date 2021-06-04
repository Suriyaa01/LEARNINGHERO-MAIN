import React, { PureComponent } from "react";
import { GameEngine } from "react-game-engine";
//import { Box } from "../../../components/renderer";
//import { MoveBox } from "../../../components/systems"

import 'regenerator-runtime/runtime'
class Box extends PureComponent {
    render() {
      const size = 100;
      const x = this.props.x - size / 2;
      const y = this.props.y - size / 2;
      return (
        <div style={{ position: "absolute", width: size, height: size, backgroundColor: "red", left: x, top: y }} />
      );
    }
  }

  const MoveBox = (entities, { input }) => {
    //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
    //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
    //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
    //-- That said, it's probably worth considering performance implications in either case.
   
    const { payload } = input.find(x => x.name === "onMouseDown") || {};
   
    if (payload) {
      const box1 = entities["box1"];
   
      box1.x = payload.pageX;
      box1.y = payload.pageY;
    }
   
    return entities;
  };

export default class SimpleGame extends PureComponent {
    render() {
        return (
            <GameEngine
                style={{ width: 800, height: 600, backgroundColor: "blue" }}
                systems={[MoveBox]}
                entities={{
                    box1: { x: 200, y: 200, renderer: <Box /> }
                }}>
            </GameEngine>
        );
    }
}