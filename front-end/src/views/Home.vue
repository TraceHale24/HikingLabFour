
<template>
  <div class="home">
      <div class="hikes">
    <div class="hike" v-for="hike in hikes" :key="hike.id">
      <div class="image">
        <img :src="hike.path">
      </div>
      <div class="info">
        <h1>{{hike.name}}</h1>
        <p>{{hike.destination}}</p>
      </div>

      <router-link to="/addHike">
            <button class = 'button' @click = "setHike(hike)">View Hike</button>
      </router-link>
    </div>
  </div>


  </div>
</template>




<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      hikes: [],
    }
  },
  created() {
    this.getHikes();
  },
  methods: {
    async getHikes() {
      try {
        let response = await axios.get('/api/hikes');
        this.hikes = response.data;
        return true; 
      } catch(error) {
        //console.log(error);
      }
    },
    selectHike(hike) {
      this.findHikeName = "";
      this.findHike = hike;
    },
    setHike(Hike) {
      this.$root.$data.currentHike = Hike
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
general {
  justify-content: center;
  text-align: center;
}
.button {
  font-size: 20px;
  width: 250px;
  background-color: forestgreen;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.wrapper {
  align-items: center;
  justify-content: center;
}

.hikes {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  }

.hike {
  margin: 10px;
  margin-top: 50px;
  width: 250px;
}

.hike img {
  border: 2px solid #333;
  height: 250px;
  width: 250px;
  object-fit:cover;
}

.hike .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  border: solid 3px black;
  background:forestgreen;
  color: #000;
  padding: 10px 10px;
  height: 70px;
}

.info h1 {
  font-size: 12px;
}

.info h2 {
  font-size: 10px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.auto {
  margin-left: auto;
}
</style>
