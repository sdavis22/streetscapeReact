import React from 'react';
import './button.css'
import {Button} from 'react-bootstrap'; 

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
        var styles = {
            spacing: {
                marginTop: 15,
                marginBottom: 15
            }
        }
        return(
            <div >
                <form id="uploadform" method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit} style={styles.spacing}>
                <input type="file" ref={this.fileInput} id="background" name="background" accept="image/*"></input>
                <div style={styles.spacing}>
                <Button type="submit">Upload background image</Button>
                </div>
                </form>
            </div>
        );
    }
    
}

export default UploadButton;