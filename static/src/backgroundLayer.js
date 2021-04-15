import React from 'react';
import { Layer, Rect } from 'react-konva';

class BackgroundLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: props.backgroundImage,
            fillPatternImage: null,
            width: 1000,
            height: 1000,
            scaleX: 1,
            scaleY: 1,
            scale: 1
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.backgroundImage !== prevProps.backgroundImage) {
            const image = new window.Image();
            image.src = this.props.backgroundImage;

            image.onload = () => {
                this.setState({
                    backgroundImage: this.props.backgroundImage,
                    fillPatternImage: image,
                    width: this.props.width,
                    height: this.props.height
                })

                const imageWidth = this.state.fillPatternImage?.width || this.state.width;
                const imageHeight = this.state.fillPatternImage?.height || this.state.height;

                const scaleX = this.state.width / imageWidth;
                const scaleY = this.state.height / imageHeight;
                const _scale = Math.max(scaleX, scaleY)
                this.setState({
                    scaleX: scaleX,
                    scaleY: scaleY
                })
                // this.setState({
                //     scale: _scale
                // })
            }


        }
    }

    render() {

        return (
            this.state.fillPatternImage && <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={this.state.width}
                    height={this.state.height}
                    listening={false}
                    fillPatternImage={this.state.fillPatternImage}
                    // fillPatternScaleX={this.state.scale}
                    // fillPatternScaleY={this.state.scale}
                    fillPatternScaleX={this.state.scaleX}
                    fillPatternScaleY={this.state.scaleY}
                    cornerRadius={10}
                >
                </Rect>
            </Layer>
        );

    }

}

export default BackgroundLayer;