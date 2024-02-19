const Wrapper=document.querySelector(".wrapper");
const Card=document.querySelector(".container");
const data=document.querySelector("[dataContainer]")
const searchForm=document.querySelector("[data-searchForm]");
const searchForInput=document.querySelector("[data-searchInput]")
const modeButton=document.querySelector("[mode-button]");
const classIcons=document.querySelectorAll(".icon");
const devStats=document.querySelector('[devStats]');
const links=document.querySelectorAll('[devLinks]');
const url = "https://api.github.com/users/";
const NotFound=document.querySelector('.notFound');
modeButton.addEventListener('click',()=>{
    modeSwitch();
})
let currentTab="lightMode";
function modeSwitch(){
    if(currentTab=="lightMode"){
        Wrapper.classList.add("dark");
        Card.classList.add("dark");
        data.classList.add("dark");
        searchForm.classList.add("dark");
        devStats.classList.add("dark");
        searchForInput.classList.add("dark");
        for(i of links){
            i.classList.add("dark");
        }
        for(i of classIcons){
           i.classList.add("dark");
        }
        modeButton.innerHTML=`<button mode-button>
        <p>Light</p>
        <img src="brightness.png" alt="">
    </button>` ;
        currentTab="darkMode";
    }
    else{
        Wrapper.classList.remove("dark");
        Card.classList.remove("dark");
        data.classList.remove("dark");
        searchForm.classList.remove("dark");
        devStats.classList.remove("dark");
        searchForInput.classList.remove("dark");
        for(i of links){
            i.classList.remove("dark");
        }
        for(i of classIcons){
            i.classList.remove("dark");
         }
        modeButton.innerHTML=` <button mode-button>
        <p>Dark</p>
        <i class="fa-regular fa-moon"></i>
        </button>` ;
        currentTab="lightMode";

    }
    
}


const devName=document.querySelector('[data-searchInput]');
const searchBtn=document.querySelector("[data-searchForm]");
searchBtn.addEventListener('submit',function(event){
    event.preventDefault();
    var devSearch=devName.value;

    console.log(devSearch);
    if(devSearch==''){
        return;
    }
    else{
        fetchingDev(devSearch);
    }
})
async function fetchingDev(devSearch){

    try{
        let link=url+devSearch;
        console.log(link);
        const response = await fetch(`${link}`);
        const dataJson = await response.json();
        console.log(dataJson);
        if(dataJson?.message=="Not Found"){
            NotFound.classList.add('active');
            return;
        }
        NotFound.classList.remove('active');
        renderDevData(dataJson);
    }
    catch(e){
        console.log('Error',e);
    }
   
}


const DevName=document.querySelector('.name');
const DevJoin=document.querySelector('[join]');
const Username=document.querySelector('[username]');
const Bio=document.querySelector('[devDescription]');
const RepoCount=document.querySelector('[repoCount]');
const FollowerCount=document.querySelector('[followerCount]');
const FollowingCount=document.querySelector('[followingCount]');
const DevImage=document.querySelector('[devImage]');
const DevLocation=document.querySelector('#location');
const DevLocationLink=document.querySelector('#locationLink');
const TwitterLink=document.querySelector('#twitterLink');
const Twitter=document.querySelector('#twitter');
const org=document.querySelector('#org');
const orgLink = document.querySelector('#orgLink');
const blog=document.querySelector('#blog');
const BlogLink=document.querySelector('#blogLink');

function renderDevData(dataJson){
    const a=dataJson?.name;
    const store=dataJson?.created_at.slice(0,10);
    const Joindate=new Date(store);
    const month=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const devjoinmonth=month[Joindate.getMonth()];
    const b=dataJson?.bio;
    const l=dataJson?.location;
    const t=dataJson?.twitter_username;
    const o=dataJson?.company;
    const c=dataJson?.blog;

    DevImage.style.backgroundImage=`url(${dataJson?.avatar_url})`;
    DevImage.style.backgroundSize=`contain`;
    if(a!=null){
        DevName.innerText=a;
    }
    else DevName.innerText="";
    
    DevJoin.innerHTML=`Joined ${Joindate.getDate()} ${devjoinmonth} ${Joindate.getFullYear()} `;
    Username.innerText=`@${dataJson?.login}`;
    Username.href=dataJson?.html_url;
    if(b!=null){
        Bio.innerText=b;
    } 
    else Bio.innerText="";
    RepoCount.innerText=dataJson?.public_repos;
    FollowerCount.innerText=dataJson?.followers;
    FollowingCount.innerText=dataJson?.following;
    if(l!=null){
        DevLocation.innerText=l;
        DevLocationLink.href=`https://www.google.com/maps/place/${l}`;
        DevLocationLink.classList.remove('iconBefore');
        DevLocationLink.classList.add('icon');
    }
    else {
        DevLocation.innerText="Not Available";
        DevLocationLink.href=``;
        DevLocationLink.classList.remove('icon');
        DevLocationLink.classList.add('iconBefore');
    }
    if(t!=null){
        Twitter.innerText=t;
        TwitterLink.href=`https://twitter.com/${t}`;
        TwitterLink.classList.remove('iconBefore');
        TwitterLink.classList.add('icon');
    }
    else {
        Twitter.innerText=" Not Available";
        TwitterLink.href=``;
        TwitterLink.classList.remove('icon');
        TwitterLink.classList.add('iconBefore');
    }
    if(o!=null){
        org.innerText=`${o}`;
        orgLink.href=`https://www.google.com/search?q=${o}`;
        orgLink.classList.remove('iconBefore');
        orgLink.classList.add('icon');
    }
    else {
        org.innerText=" Not Available";
        orgLink.href=``;
        orgLink.classList.remove('icon');
        orgLink.classList.add('iconBefore');
    }
    if(c!=""){
        blog.innerText=c;
        BlogLink.href=`${c}`;
        BlogLink.classList.remove('iconBefore');
        BlogLink.classList.add('icon');
    } 
    else {
        blog.innerText="Not Available";
        BlogLink.href=``;
        BlogLink.classList.remove('icon');
        BlogLink.classList.add('iconBefore');
    }
}







