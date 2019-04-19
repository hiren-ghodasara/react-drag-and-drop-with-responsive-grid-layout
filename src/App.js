import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { initialState } from "./data";

// const SortableItem = SortableElement(({ value }) => (
//   <li className="col-6 col-md-4 col-lg-3 mt-3 px-2">
//     <img className="image-item" src={value.imgUrl} />
//   </li>
// ));
const imgArr = [
  "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Square-white.svg/2000px-Square-white.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/7/71/Weaved_truncated_square_tiling.png",
  "http://5.imimg.com/data5/FC/KN/MY-537032/square-hole-perforated-sheet-250x250.jpg",
  ""
];
const grid=8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  //width: 250
});
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  console.log("sourceClone", sourceClone);
  console.log("destClone", destClone);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class App extends Component {
  state = {
    itemsCol1: initialState.list1,
    itemsCol2: initialState.list2
  };
  id2List = {
    droppable1: "itemsCol1",
    droppable2: "itemsCol2"
  };
  getList = id => this.state[this.id2List[id]];
  onDragEnd = result => {
    const { source, destination } = result;
    console.log("result", result);
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId != destination.droppableId) {
      console.log(
        "this.getList(source.droppableId)",
        this.getList(source.droppableId)
      );
      const result2 = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        itemsCol1: result2.droppable1,
        itemsCol2: result2.droppable2
      });
    }
  };
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <div className="container-flud">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="row mt-4">
              <Droppable droppableId="droppable1">
                {(provided, snapshot) => (
                  <div
                    className="col-lg-6 col-xs-12"
                    ref={provided.innerRef}
                    
                  >
                    <div className="grid-list-container" style={getListStyle(snapshot.isDraggingOver)}>
                      <ul className="actul-img-left">
                        {this.state.itemsCol1.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                
                                className=""
                              >
                                <img
                                  alt="img-alr"
                                  className="image-item"
                                  src={item.imgUrl}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    </div>
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <div
                    className="col-lg-6 col-xs-12"
                    ref={provided.innerRef}
                    
                  >
                    <div className="grid-list-container" style={getListStyle(snapshot.isDraggingOver)}>
                      <ul className="row">
                        {this.state.itemsCol2.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="col-6 col-md-4 col-lg-3 mt-3 px-2"
                              >
                                <img
                                  alt="img-alr"
                                  className="image-item"
                                  src={item.imgUrl}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;
