import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { initialState } from "./data";

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#563d7b26" : "#fff",
  padding: 8
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
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
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
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
        <nav className="navbar navbar-dark bg-dark text-center">
          <span className="navbar-brand mb-0 h1 mx-auto">React Drag And Drop With Responsive Grid Layout (React Beautiful DND)</span>
        </nav>
        <div className="container-fluid">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="row my-3">
              <Droppable droppableId="droppable1">
                {(provided, snapshot) => (
                  <div
                    className="col-lg-6 col-xs-12 pr-2"
                    ref={provided.innerRef}
                  >
                    <div
                      className="grid-list-container"
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
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
                              >
                                <img
                                  alt="img-alr"
                                  className="image-item img-zom"
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
                    className="col-lg-6 col-xs-12 pl-2"
                    ref={provided.innerRef}
                  >
                    <div
                      className="grid-list-container"
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <ul className="row resize-image no-gutters">
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
                                className="col-6 col-md-4 col-lg-3"
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
