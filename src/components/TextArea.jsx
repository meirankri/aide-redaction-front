import React from "react"

class TextArea extends React.Component {
    
    

    render(){

        return <textarea value={this.props.val} id={this.props.id} onChange={this.props.onChange}  cols="30" rows={this.props.row}></textarea>
    }
}

export default TextArea