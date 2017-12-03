var divInProgress;
var divGallery;
var divHead;
var divFoot;
var divSkills;
var colors;
var json;

function preload(){
  let path = './main/skills.json';
  json = loadJSON(path);
}

function setup(){
  noLoop();
  divInProgress = select("#inProgress");
  divGallery = select("#gallery");
  divHead = document.querySelector('#divHead');
  divFoot = document.querySelector('#divFoot');
  divSkills = document.querySelector('#divSkills');

  let skills = json.skills;
  
  for(let i = 0, len = skills.length; i<len; i++){
    renderSkillBar(skills[i]);
  }
  
  createCanvas(windowWidth*0.8, 300);
  colors = new Colors();
  
  makeBG(width,0,colors.back,divHead);
  makeBG(0,height,colors.trim,divFoot);
  
  
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg/pubhtml',
                   callback: function(data, tabletop) {
                     let projects = data.projects.elements;
                     console.log();
                     divGallery.html("");
                     var archivedProjects = [];
                     var inProgProjects = [];
                     var todoProjects = [];
                       for(let i=0,len=projects.length;i<len;i++){
                         if(projects[i].Archived=="TRUE"){
                           archivedProjects.push(projects[i]);
                         }else{
                           if(projects[i].hasOutline=="TRUE"){
                             inProgProjects.push(projects[i]);
                           } else {
                             todoProjects.push(projects[i]);
                           }
                         }
                       }
                       renderInProgress(inProgProjects);
                       renderThumbnails(archivedProjects);

                   }
    
  });
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
      card.attribute('href','http://www.joncraven.com/portfolio/'+name);
    }else{
      card.attribute('href','https://github.com/kravenoff42/'+name);
    }

    card.addClass('col-sm-6');
    card.addClass('col-xs-12');
    card.addClass('thumbnail');
    card.style('background-color',colors.rand());

    // set image if present
    card.style('background-image','url("main/img/' + name + '\.PNG")');

    let divContent = createElement('div');
    divContent.addClass('col-md-12');
    divContent.addClass('contentCard');
    //content
    let pName = createElement('p', name);
    pName.parent(divContent);
    let pDesc = createElement('p', desc);
    pDesc.parent(divContent);

    divContent.parent(card);
    //adding to page
    card.parent(divGallery);


  }
}

function randomColor(){
  return random(["#e6194b","#3cb44b","#ffe119","#0082c8","#f58231",
    "#911eb4","#d2f53c","#008080","#e6beff","#800000","#000080"]);
}

function renderSkillBar(skill,total){
  let name = skill.name;
  let level = skill.level;
  let totalWidth = 90;
  let levelWidth = (level*100)/10;
  
  let lblName = createElement('span');
  lblName.html(name);
  let divTotal = createElement('div');
  divTotal.style('width',totalWidth+'%');
  divTotal.class('total');
  let divLevel = createElement('div');
  divLevel.style('width',levelWidth+'%');
  divLevel.class('level');
  divLevel.parent(divTotal);
  
  lblName.parent(divSkills);
  divTotal.parent(divSkills);
  
}