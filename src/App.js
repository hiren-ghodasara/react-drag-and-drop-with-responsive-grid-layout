import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, Spin } from 'antd';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./App.css";
import { initialState } from "./data";

// Drag And Drop Function
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#563d7b26" : "#fff",
  padding: 8
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  console.log("destination", destination.length);
  destClone.splice(destination.length, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


class App extends Component {
  state = {
    itemsCol1: initialState.list1,
    itemsCol2: initialState.list2,
    visible: false,
    loading: false,
    src: null,
    crop: {
      aspect: 16 / 9,
      width: 100,
      height: 100,
      x: 50,
      y: 50
    }
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

  // Images Crop Function
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      this.uploadFileToCloudinary(e.target.files[0], "droppable1");
    }
  };
  onImageLoaded = (image, crop) => {
    this.imageRef = image;
    // this.setState({
    //   crop: makeAspectCrop(0),
    //   height: image.height,
    //   width: image.width
    // });
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrlData = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );

      this.setState({ croppedImageUrl: croppedImageUrlData.url, blobImgData: croppedImageUrlData.blobData });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve({ url: this.fileUrl, blobData: blob });
      }, "image/jpeg");
    });
  }
  //Modal Pops Functions
  handleOk = (e) => {
    this.uploadFileToCloudinary(this.state.blobImgData, "droppable2");
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  //Upload To cloudinary
  uploadFileToCloudinary(file, col = "droppable1") {
    const cloudName = 'dgxpqt1hz';
    const unsignedUploadPreset = 'ml_default';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    let reactThis = this;
    this.setState({ loading: true });
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", function (e) {
      console.log(`fileuploadprogress data.loaded: ${e.loaded},data.total: ${e.total}`);
    });

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        if (response.url) {
          reactThis.state[reactThis.id2List[col]].push({ id: Math.random(), imgUrl: response.url });
          reactThis.setState({
            visible: false,
            loading: false,
          });
        }
      }
    };
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    fd.append('folder', 'images');
    xhr.send(fd);
  }

  _handleDoubleClickItem(item) {
    //console.log('I got double-clicked!', item);
    let reactThis = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", item.imgUrl);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      reactThis.setState({ src: imageUrl, visible: true })
    };
    xhr.send();
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark text-center">
          <span className="navbar-brand mb-0 h1 mx-auto">React Drag And Drop With Responsive Grid Layout (React Beautiful DND)</span>
        </nav>
        <Spin spinning={this.state.loading}>
          <div className="container-fluid">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="row mt-2">
                <div className="col-lg-12 col-xs-12 mb-2">
                  <div className="file-up btn btn-outline-primary">
                    Add New Image
                    <input type="file" onChange={this.onSelectFile} />
                  </div>
                  {/* <input type="file" onChange={this.onSelectFile} /> */}
                </div>
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
                                  onDoubleClick={() => this._handleDoubleClickItem(item)}
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
                                  className="col-6 col-md-5 col-lg-4"
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
        </Spin>
        <Modal
          visible={this.state.visible}
          style={{ top: 17 }}
          title="Crop Image"
          onOk={this.handleOk}
          width={1200}
          onCancel={this.handleCancel}
        > <Spin spinning={this.state.loading}>
            <div className="row">

              <div className="col-lg-6 col-xs-12 crop-ele d-flex justify-content-center align-items-center">
                {src && (
                  <ReactCrop
                    src={src}
                    crop={crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}
              </div>
              <div className="col-lg-6 col-xs-12 preview-ele d-flex justify-content-center align-items-center">
                {croppedImageUrl && (
                  <img alt="Crop" style={{ maxWidth: "100%", width: "80%" }} src={croppedImageUrl} />
                )}
              </div>

            </div></Spin>
        </Modal>
      </div>
    );
  }
}

export default App;
