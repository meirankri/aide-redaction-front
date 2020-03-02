let editable = document.getElementById('edit')
let wordCount = document.getElementById('wordCount')
let keyword = document.getElementById('keyword')
let textArticle = ""
editable.addEventListener('input', function () {
    textArticle = this.textContent,
        count = textArticle.trim().replace(/\s+/g, ' ').split(' ').length;
    
    document.querySelector('#wordCount').textContent = count;
    keywordCheck()
    
});

let keywordCheck = () =>{
    let text = keyword.textContent.trim().replace(/\s+/g, ' ').split(',');
    console.log(text);
    text.map((keyword,i) =>{
        console.log(textArticle + i);
        
    })
}