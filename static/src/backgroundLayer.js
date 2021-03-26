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

    componentDidUpdate(prevProps)
    {
        if (this.props.backgroundImage !== prevProps.backgroundImage) {
            const image = new window.Image();
            image.src = this.props.backgroundImage;
    
            image.onload = () => {
                    this.setState({
                        backgroundImage: this.props.backgroundImage, 
                        fillPatternImage: image
                    })
                }
        }
    }
    
    render()
    {
        
            return(
                this.state.fillPatternImage && <Layer>
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