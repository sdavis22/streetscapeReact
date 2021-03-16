import React from 'react';
import './button.css'

class UploadButton extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            value: "Upload",
            image: props.bgRef,
        };
        this.handleSubmit = this.props.handleSubmit;
    }

    render()
    {
        return(
            <form id="uploadform" method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input type="file" ref={this.fileInput} id="background" name="background" accept="image/*"></input>
            <input value="Upload background image" type="submit"></input>
            </form>
        );
    }
    
}

export default UploadButton;