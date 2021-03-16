import React from 'react';
import {Layer, Rect} from 'react-konva';

class BackgroundLayer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            backgroundImage: props.backgroundImage,
            fillPatternImage: null
        };
    }

    componentDidUpdate(props)
    {
        if(this.state.backgroundImage !== props.backgroundImage)
        {
            const image = new window.Image();
            image.src = this.state.backgroundImage;
            if(this.state.fillPatternImage === null)
                this.setState({backgroundImage: props.backgroundImage, fillPatternImage: image});
        }
    }


    render()
    {
        return(
        <Layer>
            <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            listening={false}
            fillPatternImage={this.state.fillPatternImage}
            >
            </Rect>
        </Layer>
        );
    }

}

export default BackgroundLayer;