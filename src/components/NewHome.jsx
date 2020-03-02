import React from "react"
import TextArea from "./TextArea"
import ExplanationText from "./ExplanationText"

class NewHome extends React.Component {
    constructor(){
        super()
       
        this.state = {
            redaction: "",
            keyword: "",
            count: "",
            match: ""
        };
        
       
    }
    keywordTestRedaction(){
        //ici code pour checker si les keywords sont présent dans le texte , on peut spliter les mots lé par un line break \n ou par virgule
        this.state.keyword.split(',').map((word,i) =>{
            // find = l'emplacement du mot cle dans redaction grace la recherche
            let find = this.state.redaction.search(word.trim())
           
            //si il trouve dans redaction le mot de keyword et que le mot ne se trouve pas dans match il ajoute
            if(find > -1 && this.state.match.search(word) === -1 ){
               

                //on met le om clé dans match
                 this.setState({match : this.state.match + word.trim()+ ", "})

            } 
            //si il ne trouve plus le mot dans redaction et qu'il trouve le mot dans match il supprime
            else if (find === -1 && this.state.match.search(word) !== -1){
                this.setState({match : this.state.match.replace(word, '')})
            }
            
            return true
            
        })
    }
    handleChangeRedaction = evt => {
        let words = evt.target.value
        let wordCount = words.split(' ').length
        this.setState({
            redaction: evt.target.value,
            count: wordCount
        })
        
        this.keywordTestRedaction()
        
        
      }
    handleChangeKeyword = evt =>{
        
        let keyword = evt.target.value;
        this.setState({
            keyword: keyword
            
        });
       
        
    }
    textareaChange = evt =>{
        console.log(evt.target.value);
        
    }
    //le this.setState du didmount fait appeler le handle change  de redaction plusieurs fois 
    componentDidMount(){       
        this.setState({
            redaction: "Commencer à édiger",
            keyword: "test,",
            count : 3,
            
        })
    }

    render(){
        return (
            <div className="allRedac">
                <h1>Aide à la rédaction web</h1>
                <ExplanationText/>
                <div className={"container"}>
                    
                    <div>
                    <p>Rédiger votre texte</p>
                    <TextArea
                        onChange={this.handleChangeRedaction} // handle innerHTML change
                        id="edit"
                        row={50}
                        val={this.state.redaction}
                    />
                    </div>
                    <div className={"wordCount"}>
                        <h2>Nombre de mots pour votre texte</h2>
                        <p>{this.state.count}</p>
                        <p>Entrez vos mot clé séparé par une virgule</p>
                        <TextArea
                        row={20}
                        onChange={this.handleChangeKeyword} // handle innerHTML change
                        val={this.state.keyword}
                        id="keyword"

                    />
                    <h2>Mots figurant dans votre texte</h2>
                    <p className='match'> {this.state.match} </p>
                    </div>
                    
                </div>
            
            </div>
        )
    }
}

export default NewHome