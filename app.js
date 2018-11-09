
const rehberList=document.querySelector('#rehber-list')

const form=document.querySelector('#rehber-form')

function renderRehber(doc){

    let li =document.createElement('li');
    let isim =document.createElement('span');
    let numara =document.createElement('span');

    let sil=document.createElement('div');
    let guncelle=document.createElement('div');

    li.setAttribute('data-id',doc.id);
    isim.textContent=doc.data().ad;
    numara.textContent=doc.data().numara;
    sil.textContent='X';
    guncelle.textContent='G';

    li.appendChild(isim);
    li.appendChild(numara);
    li.appendChild(sil);
    li.appendChild(guncelle);

    rehberList.appendChild(li);

    sil.addEventListener('click',(e)=>{
        e.stopPropagation();

        let id=e.target.parentElement.getAttribute('data-id');

        db.collection('rehber').doc(id).delete();
    })

}

// //Verileri Getirme
// db.collection('rehber').get().then((snapshot)=>{
//     //console.log(snapshot.docs);

//     snapshot.docs.forEach(doc=>{
//        renderRehber(doc);
        
//     })
    
// })

db.collection('rehber').orderBy('ad').onSnapshot(snapshot=>{

    let changes=snapshot.docChanges();
    //console.log(changes);

    changes.forEach(change=>{
        //console.log(change.doc.data());

        if(change.type=='added'){
            renderRehber(change.doc)
        }else if(change.type=='removed'){
            let li=rehberList.querySelector('[data-id='+change.doc.id+']');

            rehberList.removeChild(li);

        }
        
    })
    
})

//Veri ekleme
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('rehber').add({
        ad:form.isim.value,
        numara:form.no.value
    });

    form.isim.value='';
    form.no.value='';
})

