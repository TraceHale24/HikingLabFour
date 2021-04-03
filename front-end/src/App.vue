<template>
<div id="app">
  <div class = "title">
  <h1>Hike Utah with Trace and Conner</h1>
  </div>
  <div id="menu">
    <div id = "leftside">
    <router-link to="/addNewHike">
      <div class="menu-item browse">
        <img src="/images/botos.png">
        <p>Add/Edit A Hike</p>
      </div>
    </router-link>
    </div>
    <div id="brand">
      <router-link to="/">
        <img src="/images/logo2.png">
      </router-link>
    </div>
    <div id="rightside">

      <router-link to="/about">
        <div class="menu-item browse">
          <img src="/images/about.png" width="25px">
          <p>About</p>
        </div>
      </router-link>
    </div>  
  </div>
  <router-view />

<div class ='footer'>
  <div class= 'footer-item'>
    <h3> Trace Hale and Conner Hammond</h3>
    <h3><a href = 'https://github.com/TraceHale24/HikingLabFour'>Github</a></h3>
  </div>
</div>
</div>

</template>



<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;
}
h1 {
  display: flex;
  justify-content: center;
}
#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
}

#menu a {
  color: forestgreen;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#rightside {
  grid-area: side;
  display: flex;
  justify-content: center;
}

#rightside img {
  width: 50px;
}

#leftside {
  grid-area:auto;
  display: flex;
  justify-content: center;
  padding-left: auto;
}

#leftside img {
  width: 50px;
}


.menu-item {
  display: flex;
  flex-direction: column;
  width: 50px;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
  width: 50px;
}


.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 75px;
}

.footer-item {
  border: 3px solid black;
  border-radius: 10px;
  background-color: forestgreen;
  color: white;
  height: 150px;
  width: fit-content;
  flex: 1;
  padding-left: 70px;
  padding-top: 5px;
  position:sticky;
  width: 100%;
  bottom:0;
}

  a:visited {
    color:white;
}

a:link {
    color: white;
}
</style>
