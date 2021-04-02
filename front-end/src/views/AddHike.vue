<template>
  <div>
    <h1>Selected Hike</h1>
    <AddHike :currentHike = "currentHike"/>
    <div class="info">
        <div class = 'image'>
            <img :src=currentHike.path>
        </div>
      </div>

      <div class = 'name'>
        <h1><u>{{currentHike.hikeName}}</u></h1>
        </div>
        <div class = 'destination'>
        <p>{{currentHike.destination}}</p>
        </div>
        <div class="rating">
        <p>Rating: {{currentHike.rating}}/5</p>
        </div>
        <div class="time">
        <p>Time: {{currentHike.time}}</p>
        </div>
        <div class="time">
          <p>Distance: {{currentHike.length}} Miles</p>
        </div>
      <h1>Reviews</h1>



        <div class = "reviews" v-if ="reviews.length > 0">
          <div class = "reviews" v-for="r in reviews" :key="r.id" @click="selectReview(s)"> {{r.userName}}
            <div class = "reviews" v-if="r.hikeName == currentHike.hikeName">
              <button @click="deleteReview(findReview)">Delete</button>
              <button @click="editReview(findReview)">Edit</button>
            </div>
          </div>
        </div>




      </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ReviewsPage',
  data() {
    return {
      reviews: [],
      hikeName: "",
      addReview: null,
      findHikeName: "",
      findReview: "",
    }
  },

  computed: {
    },
    created() {
      this.getReviews();
    },

  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/reviews', {
          hikeName: this.hikeName,
          userName: this.userName,
          text: this.text,
        });
        this.addReview = r1.data; 
      } catch(error){
        //console.log(error);
      }
    },
    async getReviews() {
      try {
        let response = await axios.get('/api/reviews');
        this.reviews = response.data;
        return true;
      } catch(error) {
        //console.log(error);
      }
    },

    selectReview(review) {
      this.findHikeName = "";
      this.findReview = review;
    },
    async deleteReview(review) {
      try {
        await axios.delete('/api/reviews/' + review._id);
        this.findReview = null;
        this.getReviews();
        return true;
      } catch(error) {
        //console.log(error); 
      }
    },

    async editReview(review) {
      try {
        await axios.put("/api/reviews/" + review._id);
        this.findReview = null;
        this.getReviews();
        return true;
      } catch(error) {
        //console.log(erro);
      }
    }
  }
}
</script>


<style scoped>

.buttons {
  display: flex;
  justify-content: right;
  width: 200px;
  padding-left: 65%;

}
.input {
    border: solid black 3px;
    height: 100px;
}
input[type=checkbox] {
    transform: scale(1.5);
    margin-right: 10px;
}

input[type=text] {
    font-size: 1em;
}

button {
    display: flex;
    font-family: 'Arvo';
    font-size: 1em;
    margin-left: 88.75%;
    margin-bottom: 50px;
    float: left;
    margin-right: 10px;
}
.review {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding-top: 10px;
    
}
.name {
    display: flex;
    font-size: 20px;
    justify-content: center;
}

.destination {
    display: flex;
    font-size: 20px;
    justify-content: center;

}

.rating {
    display: flex;
    font-size: 20px;
    justify-content: center;

}

.time { 
    display: flex;
    font-size: 20px;
    justify-content: center;

}

.wrapper {
  display: flex;
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

.info {
    color: #000;
    padding: 10px 30px;
    display: flex;
}

.info h1 {
  font-size: 30px;
}

.info h2 {
  font-size: 20px;
}

.info p {
  margin: 0px;
  font-size: 20px;
}

.image {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;

}

</style>