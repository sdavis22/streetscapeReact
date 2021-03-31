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
            spacingMainDiv: {
                marginTop: 55,
                marginBottom: 50,
                marginLeft:15,
                marginRight: 15
            },
            uploadButton: {
                marginTop: 18,
                display: "grid",
                alignItems: "center"
            }

        }
        return(
            < >
                <div style={styles.spacingMainDiv}>
                <form 
                    id="uploadform" 
                    method="POST" 
                    encType="multipart/form-data" 
                    onSubmit={this.handleSubmit} 
                    style={styles.spacing} >
                <input type="file" ref={this.fileInput} id="background" name="background" accept="image/*" required ></input>
                <div style={styles.uploadButton}>
                <Button type="submit" variant="dark">UPLOAD BACKGROUND IMAGE</Button>
                </div>
                </form>
                </div>
            </>
        );
    }
    
}

export default UploadButton;