import React from 'react';
import './button.css';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";


class ScriptButton extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            handleSubmit: props.handleSubmit,
            image: props.background,
            value: "Click me to flip a python coin!"
        }
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.background !== prevProps.background) {
            const image = new window.Image();
            image.src = this.props.background;
            image.onload = () => {
                    this.setState({
                        image: image, 
                    })
                }
        }
    }

    render()
    {
        return(
            // <button className="button" type="button" onClick={this.state.handleSubmit}>{this.state.value}</button>
            <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
                <Tooltip>
                <strong>Items on Canvas will be given to SESAME algorithm</strong>
                </Tooltip>
            }
        >

            <Button
                variant="danger"
                onClick={this.state.handleSubmit}
            >
                TRANSFORM
            </Button>

            </OverlayTrigger>
        )
    }
    
}

export default ScriptButton;