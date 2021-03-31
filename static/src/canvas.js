import React from 'react'
import { Container, Row, Col, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Stage, Layer } from 'react-konva';
import URLImage from './URLImage'
import ScriptButton from './scriptButton'
import UploadButton from './uploadButton'
import BackgroundLayer from './backgroundLayer'
import nextId from "react-id-generator";


class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            background: null,
            images: props.images,
            selectedID: props.selectedID,
            selectShape: props.selectShape,
            handleDrag: props.handleDrag,
            handleDrop: props.handleDrop,
            stageRef: props.stageRef,
            dragUrl: props.dragUrl,
            stageWidth: 1000,
            stageHeight: 1000
        };
        this.checkDeselect = this.checkDeselect.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleDropCanvas = this.handleDropCanvas.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.handleScriptSubmit = this.handleScriptSubmit.bind(this);
    }

    componentDidMount() {
        const canvas_col = document.querySelector('#canvas_col')
        this.setState({
            stageWidth: canvas_col.offsetWidth - 48,
            stageHeight: canvas_col.offsetHeight - 30
        })
    }

    checkDeselect(event) {
        // deselect when clicked on empty area
        const clickedOnEmpty = event.target === event.target.getStage();
        if (clickedOnEmpty) {
            this.setState({
                selectShape: null,
                selectedID: null
            });
        }
    }

    handleDropCanvas(e) {
        e.preventDefault();
        // register event position
        this.state.stageRef.current.setPointersPositions(e);
        // add image
        let updatedImages = this.state.images.concat([
            {
                ...this.state.stageRef.current.getPointerPosition(),
                src: this.state.dragUrl.current,
                id: nextId()
            },
        ]);
        this.setState({ images: updatedImages });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.images !== this.props.images) {
            this.setState({ images: prevProps.images });
        }
    }

    uploadImage(event) {
        event.preventDefault();
        var input = new FormData(event.target);
        input.append('img', event.target.background.value);
        fetch('http://127.0.0.1:5000/img-upload', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: input
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    background: 'static/uploads/' + res.filename
                })
            })
    }

    deleteImage() {
        var length = this.state.images.length;
        var imageCopy = [...this.state.images];
        for (var i = 0; i < length; i++) {
            if (imageCopy[i].id === this.state.selectedID) {
                imageCopy.splice(i, 1);
            }
            length = imageCopy.length;
        }
        this.setState({ images: imageCopy });
        //need to redraw canvas, but how to access?
    }

    handleScriptSubmit(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/function', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ input: 'example', image: this.state.background }),
        })
            .then(res => res.json())
            .then(res => {
                this.setState(
                    {
                        background: res.image
                    }
                );
            });
    }



    render() {
        var styles = {
            
            spacingBtwImages: {
                marginTop: 25,
                marginBottom: 25,
                marginLeft: 15
            },
            dragDropText: {
                display: "grid",
                alignItems: "center"
            },
            deleteButton: {
                marginTop: 50,
                marginBottom: 25,
                marginLeft: 15,
                display: "grid",
                alignItems: "center"
            },
            submitButton: {
                marginTop: 45,
                marginBottom: 25,
                marginLeft: 15,
                display: "grid",
                alignItems: "center"
            },
            canvasTextCenterAlign: {
                textAlign: "center"
            },
            mainCanvas: {
                marginBottom: 25,
                marginRight: 15
            }

        }
        return (
            <>

                <Container fluid>
                    <Row>
                        <Col md={3} >

                            <UploadButton handleSubmit={this.uploadImage}></UploadButton>

                            <h3 style={styles.dragDropText}>
                                <Badge>DRAG AND DROP CLIPARTS</Badge>
                            </h3>
                            <img
                                alt="lion"
                                src="https://konvajs.org/assets/lion.png"
                                draggable="true"
                                onDragStart={this.state.handleDrag}
                                style={
                                    styles.spacingBtwImages
                               }
                            />


                            <img
                                alt="tree"
                                src="data:image/png;base64,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"
                                draggable="true"
                                onDragStart={this.state.handleDrag}
                                style={
                                    styles.spacingBtwImages
                               }
                            />

                            <div style={styles.deleteButton}>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip>
                                        <strong>Select a clipart from the canvas</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        variant="warning"
                                        onClick={this.deleteImage}
                                        disabled={false}
                                    >
                                        DELETE CLIPART
                                    </Button>
                                </OverlayTrigger>
                                
                            </div>
                            <div style={styles.submitButton}>
                            <ScriptButton handleSubmit={this.handleScriptSubmit}></ScriptButton>
                            </div>

                        </Col>

                        <Col md={9} id="canvas_col" >
                            
                            <div style = {styles.mainCanvas}>

                            <div style={styles.canvasTextCenterAlign}>
                                <h1>
                                    <Badge> CANVAS </Badge>
                                </h1>
                            </div>
                            <div
                                onDrop={this.handleDropCanvas}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <Stage
                                    width={this.state.stageWidth}
                                    height={this.state.stageHeight}
                                    onMouseDown={this.checkDeselect}
                                    onTouchStart={this.checkDeselect}
                                    style={{ border: '1px solid grey' }}
                                    pixelRatio = {1}
                                    ref={this.state.stageRef}
                                >
                                    <BackgroundLayer
                                        backgroundImage={this.state.background}
                                        width={this.state.stageWidth}
                                        height={this.state.stageHeight}
                                    >
                                    </BackgroundLayer>
                                    <Layer>
                                        {this.state.images.map((image, i) => {
                                            return <URLImage
                                                id={0}
                                                key={i}
                                                image={image}
                                                isSelected={image.id === this.state.selectedID}
                                                onSelect={() => {
                                                    this.setState({ 
                                                        selectedID: image.id
                                                     })
                                                }}
                                                onChange={(newAttrs) => {
                                                    const imgs = this.state.images.slice();
                                                    imgs[i] = newAttrs;
                                                    this.setState({ images: imgs });
                                                }}
                                            />;
                                        })}
                                    </Layer>
                                </Stage>
                            </div>
                            </div>
                        </Col>
                        
                    </Row>
                </Container>

            </>
            //     <div>
            //     Try to drag an image onto the stage:
            //     <br />
            //     <img
            //     alt="lion"
            //     src="https://konvajs.org/assets/lion.png"
            //     draggable="true"
            //     onDragStart={this.state.handleDrag}
            //     />
            //     <img
            //     alt="tree"
            //     src="data:image/png;base64,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"
            //     draggable="true"
            //     onDragStart={this.state.handleDrag}
            //     />
            //     <img 
            //     alt="delete"
            //     src="https://cdn5.vectorstock.com/i/1000x1000/47/74/delete-button-vector-3374774.jpg"
            //     width="100"
            //     height="100"
            //     draggable="false"
            //     onClick={this.deleteImage}
            //     />        
            //     <ScriptButton handleSubmit={this.handleScriptSubmit}></ScriptButton>
            //     <UploadButton handleSubmit={this.uploadImage}></UploadButton>
            //     <div
            //     onDrop={this.handleDropCanvas}
            //     onDragOver={(e) => e.preventDefault()}
            //     >
            //     <Stage
            //         width={window.innerWidth}
            //         height={window.innerHeight}
            //         onMouseDown={this.checkDeselect}
            //         onTouchStart={this.checkDeselect}
            //         style={{ border: '1px solid grey' }}
            //         ref={this.state.stageRef}
            //     >
            //         <BackgroundLayer backgroundImage={this.state.background}></BackgroundLayer>
            //         <Layer>
            //         {this.state.images.map((image,i) => {
            //             return <URLImage
            //             id={0} 
            //             key={i}
            //             image={image}
            //             isSelected={image.id === this.state.selectedID}
            //             onSelect={() => {
            //                 this.setState({selectedID: image.id})
            //             }}
            //             onChange={(newAttrs) => {
            //             const imgs = this.state.images.slice();
            //             imgs[i] = newAttrs;
            //             this.setState({images: imgs});
            //             }}            
            //             />;
            //         })}
            //         </Layer>
            //     </Stage>
            //     </div>
            // </div>  
        );
    }
}

export default Canvas;