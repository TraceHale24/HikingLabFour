<template>
<div class = "general">
  <h2>What we have done is we have taken hikes, and removed their details, that way you can only choose the hike based on one picture and basic location.
      <br/> This is meant to encourage people to choose hikes based off of what they find beautiful, not based off of how *Hard* it may be.  Once you select
       a hike we encourage you to follow through and do it no matter the length.
  </h2>
<div class="wrapper">

  <div class="hikes">
    <div class="hike" v-for="hike in hikes" :key="hike.id">
      <div class="image">
        <img :src="'/images/hikePics/'+hike.image">
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
</div>
</template>

<script>
export default {
  name: 'HikeList',
  props: {
    hikes: Array
  },
  methods: {
    setHike(Hike) {
      this.$root.$data.currentHike = Hike
    }
  }
}


</script>



<style scoped>
.general {
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