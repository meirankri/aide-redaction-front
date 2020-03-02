import React from "react"
import ContentEditable from 'react-contenteditable'
import TextArea from "./TextArea"

class Home extends React.Component {
    constructor(){
        super()
        this.contentEditable = React.createRef()
        this.keywordEditable = React.createRef()

        this.state = {
            redaction: "",
            keyword: "",
            count: "",
            match: ""
        };
        this.matche = ""
       
    }

    handleChangeRedaction = evt => {
        let words = evt.target.value
        let wordCount = words.split(' ').length
        this.setState({
            redaction: evt.target.value,
            count: wordCount
        })
        
        
        //ici code pour checker si les keywords sont présent dans le texte
        this.state.keyword.split(',').map((word,i) =>{
                // find = l'emplacement du mot cle dans redaction grace la recherche
                let find = this.state.redaction.search(word.trim())
               
                //si il trouve dans redaction le mot de keyword et que le mot ne se trouve pas dans match il ajoute
                if(find > -1 && this.state.match.search(word) === -1 ){
                   

                    //on met le om clé dans match
                     this.setState({match : this.state.match + word.trim()+ " "})

                } 
                //si il ne trouve plus le mot dans redaction et qu'il trouve le mot dans match il supprime
                else if (find === -1 && this.state.match.search(word) !== -1){
                    this.setState({match : this.state.match.replace(word, '')})
                }
                
                return true
                
            })
        
      }
    handleChangeKeyword = evt =>{
        
        let keyword = evt.target.value;
        this.setState({
            keyword: keyword.replace(/(<([^>]+)>)/ig, " ")
            
        });
       
        
    }
    textareaChange = evt =>{
        console.log(evt.target.value);
        
    }
    //le this.setState du didmount fait appeler le handle change  de redaction plusieurs fois 
    componentDidMount(){       
        // this.setState({
            // redaction: "Commencer à édiger",
            // keyword: "test,",
            // count : 3,
            
        // })
    }

    render(){
        return (
            <div>
                <h1>Aide à la rédaction web</h1>
               
                <div className={"container"}>
                    <div className="formText">
                        <TextArea row={50} onChange={this.textareaChange} />
                    </div>
                    <div>
                    <p>Rédiger votre texte</p>
                    <ContentEditable
                        innerRef={this.contentEditable}
                        html={this.state.redaction} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={this.handleChangeRedaction} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                        id="edit"
                    />
                    </div>
                    <div className={"wordCount"}>
                        <h2>Nombre de mots pour votre texte</h2>
                        <p>{this.state.count}</p>
                        <p>Entrez vos mot clé séparé par une virgule</p>
                        <ContentEditable
                        innerRef={this.keywordEditable}
                        html={this.state.keyword} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={this.handleChangeKeyword} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                        id="keyword"

                    />
                    <p> {this.state.match} </p>
                    </div>
                    
                </div>
            
            </div>
        )
    }
}

export default Home