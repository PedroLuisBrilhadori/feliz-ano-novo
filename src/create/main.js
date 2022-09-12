document.getElementById('done').addEventListener('click', (e) => {
    if(!document.getElementById('form').checkValidity()){
        window.alert('Preencha os dados, por favor!');
        return; 
    } 

    document.getElementById('form').submit();
})

if(location.search){
    if(location.search.indexOf('true') > -1){
        if(window.confirm('Menssagem enviada!!'))
            location.search = '';
        else 
            location.search = '';
        } 
        else {
            if(window.confirm('Ocorreu um erro, menssagem não enviada!'))
                location.search = '';
            else 
                location.search = '';
    } 
}


document.getElementById('cancel').addEventListener('click', () => {
    document.location.href = document.location.href.replace('/create/', '')
})