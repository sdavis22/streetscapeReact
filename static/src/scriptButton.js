import React from 'react';
import './button.css'

class ScriptButton extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            value: "Click me to flip a python coin!"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/function', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
              },
            })
              .then(res => res.json())
              .then(res => {
                this.setState(
                  {
                      value: res.value
                  }
              );});
    }
    render()
    {
        return(
            <button className="button" type="button" onClick={this.handleSubmit}>{this.state.value}</button>
        )
    }
    
}

export default ScriptButton;