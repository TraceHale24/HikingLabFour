<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="gear in equipment" :key="gear.id">
      <div class="info">
        <h1><a v-bind:href = gear.link>{{gear.category}}</a></h1>
        <p>{{gear.equipmentName}}</p>
        <p>{{gear.price}}</p>
        <p>{{gear.details}}</p>

      </div>
      <div class="image">
        <img :src="'/images/equipmentPics/'+gear.image">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'EquipmentList',
  props: {
    equipment: Array
  }
}
</script>



<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 220px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 220px;

}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: forestgreen;
  color: #000;
  padding: 10px 30px;
  height: 110px;
}

.info h1 {
  font-size: 14px;
}

.info h2 {
  font-size: 12px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>