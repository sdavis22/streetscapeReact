import React from 'react';
import { render } from 'react-dom';
import {Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import Canvas from './canvas'

// TODO: needs work
const URLImage = ({ image, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const imgRef = React.createRef();
  const trRef = React.useRef(null);
  const handleDragEnd = e =>
  {
    onChange({
      ...image,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  // TODO: needs work 
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={imgRef}
        image={img}
        draggable
        {...image}
        onDragEnd={handleDragEnd}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = imgRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
          node.scaleX(1);
          node.scaleY(1);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const App = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  let images = [];
  const [selectedID, selectShape] = React.useState(null);
  let backgroundName = '';

  // var count = 0;
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleDragImg = (e) =>
  {
    dragUrl.current = e.target.src;
  }

  const handleDropCanvas = (e) =>
  {
    e.preventDefault();
    // register event position
    stageRef.current.setPointersPositions(e);
    // add image
    images = images.concat([
        {
        ...stageRef.current.getPointerPosition(),
        src: dragUrl.current,
        },
    ]);
    console.log(images);
  }
  // TODO: needs work
  const handleUpload = (fileName) =>
  {
    backgroundName = fileName;
  }

  return (
    <Canvas 
    handleDrag={handleDragImg} 
    checkDeselect={checkDeselect} 
    images={images}
    handleDrop={handleDropCanvas}
    selectedID={selectedID}
    selectShape={selectShape}
    stageRef={stageRef}
    >
    </Canvas>
  );
};

render(<App />, document.getElementById('root'));
