var divInProgress;
var divGallery;
var divHead;
var divFoot;
var colors;

function setup(){
  noLoop();
  divInProgress = select("#inProgress");
  divGallery = select("#gallery");
  divHead = document.querySelector('#divHead');
  divFoot = document.querySelector('#divFoot');
  //maxCanvasWidth = document.getElementById("widthRef").clientWidth - 20;
  
  createCanvas(windowWidth, 300);
  colors = new Colors();
  
  makeBG(width,0,colors.back,divHead);
  makeBG(0,height,colors.trim,divFoot);
  
  
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg/pubhtml',
                   callback: function(data, tabletop) {
                     divGallery.html("");
                     console.log(data);
                     var archivedProjects = [];
                     var inProgProjects = [];
                     var todoProjects = [];
                       for(let i=0,len=data.length;i<len;i++){
                         if(data[i].Archived=="TRUE"){
                           archivedProjects.push(data[i]);
                         }else{
                           if(data[i].hasOutline=="TRUE"){
                             inProgProjects.push(data[i]);
                           } else {
                             todoProjects.push(data[i]);
                           }
                         }
                       }
                       renderInProgress(inProgProjects);
                       renderThumbnails(archivedProjects);

                   },
                   simpleSheet: true } );
}

function makeBG(x,y,back,div){
  background(back);
  push();
  translate(x,y);
  noFill();
  strokeWeight(2);
  let r = floor(random(4,10));
  let layers = [];
  for(let j = 0;j<r;j++){
    layers.push(new Layer());
  }
  for(let i = 0, len = layers.length;i<len;i++){
    layers[i].show();
  }
  let embeddedCanvas =  document.querySelector('#defaultCanvas0');
  let dataUrl = embeddedCanvas.toDataURL();
  div.style.background = 'url('+dataUrl+')';
  pop();
}

function renderInProgress(projList){
  for ( let i = 0, len=projList.length ; i < len ; i ++){
    let name = projList[i]['Project Name'];
    let coll = projList[i]['inCollection'];

    //item card
    let li = createElement('li');
    li.addClass('proj');

    //link
    let a = createElement('a',name);
    if(coll=='TRUE'){
      a.attribute('href',name);
    }else{
      a.attribute('href','https://github.com/kravenoff42/'+name);
    }
    //adding to list
    a.parent(li);

    // adding card to div
    li.parent(divInProgress);

  }
}

function renderThumbnails(projList){
  for ( let i = 0, len=projList.length ; i < len ; i ++){
    let name = projList[i]['Project Name'];
    let desc = projList[i]['Project Description'];
    let coll = projList[i]['inCollection'];
    //card
    let randomBG = randomColor();
    let card = createElement('a');
    if(coll=='TRUE'){
      card.attribute('href','https://www.joncraven.com/kravenoffs_kollection/'+name);
    }else{
      card.attribute('href','https://github.com/kravenoff42/'+name);
    }

    // card.attribute('href','https://kravenoff42.github.io/kravenoffs_kollection/'+name);
    // card.attribute('href','/'+name);
    card.addClass('thumbnail');
    card.style('background-color',colors.rand());

    // set image if present
    card.style('background-image','url("main/img/'+name+'.png")');

    //content
    let pName = createElement('p', name);
    pName.style('font-weight', 'bold');
    pName.parent(card);
    let pDesc = createElement('p', desc);
    pDesc.parent(card);

    //adding to page
    card.parent(divGallery);


  }
}

function randomColor(){
  return random(["#e6194b","#3cb44b","#ffe119","#0082c8","#f58231",
    "#911eb4","#d2f53c","#008080","#e6beff","#800000","#000080"]);
}
