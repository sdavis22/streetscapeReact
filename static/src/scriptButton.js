import React from 'react';
import './button.css';
import { Button } from "react-bootstrap";


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
            <Button
                variant="danger"
                onClick={this.state.handleSubmit}
            >
                {this.state.value}
            </Button>
        )
    }
    
}

export default ScriptButton;