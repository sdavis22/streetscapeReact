import React from 'react';
import {Layer, Rect} from 'react-konva';

class BackgroundLayer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            backgroundImage: props.backgroundImage,
            fillPatternImage: null,
            width: 1000,
            height: 1000
        };
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.backgroundImage !== prevProps.backgroundImage) {
            const image = new window.Image();
            image.src = this.props.backgroundImage;
            image.height = image.naturalHeight;
            image.width = image.naturalWidth;
            image.space = "fill"; 
            
            console.log(image)
            image.onload = () => {
                    this.setState({
                        backgroundImage: this.props.backgroundImage, 
                        fillPatternImage: image,
                        width: this.props.width,
                        height: this.props.height
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
                width={this.state.width}
                height={this.state.height}
                listening={false}
                fillPatternImage={this.state.fillPatternImage}
                >
                </Rect>
            </Layer>
            );
        
    }

}

export default BackgroundLayer;