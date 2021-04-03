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

        <div class="review" v-for="review in currentHike.reviews" :key="review">

        <h2>"{{review}}"</h2>
        <button class = 'btn btn-xs btn-danger' @click = deleteReview(review)>Delete</button>
        </div>

        <h1>Add Your Own Review</h1>
        <form>
            <div class="input">
            <input type = "text" v-model="text" placeholder="Review">
      </div>

      <div class= "username">
        <input type ="text" v-model ="userName" placeholder="Username">
      </div>
            <button type = "submit" @click="upload(currentHike)" >Submit</button>
        </form>
                      <h1>Reviews</h1>

          <div class = "reviews" v-for="r in reviews" :key="r.id" @click="selectReview(r)"> 

            <div  v-if="r.hikeName === currentHike.hikeName">
              <h3 class="overflow">"{{r.text}}"</h3>
             <div class="userReview">
                <em><h4>-{{r.userName}}</h4></em>
             </div>
             <div class = "buttons">
              <button @click="deleteReview(r)">Delete</button>
              <div v-if="editBox">
                <textarea v-model="newText"></textarea>
                <button @click="editReview(r)">Submit</button>
              </div>
              <button v-if="!editBox" @click="editButton">Edit</button>
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
      editBox:false,
      newText:"",
      userName: "",
      text: "",
    }
  },

  computed: {
    currentHike(){
      return this.$root.$data.currentHike;
    }
    
    },
    created() {
      this.getReviews();
    },

  methods: {
    editButton(){
      this.editBox =true;
    },
    async upload(currentHike) {
      try {
        let r1 = await axios.post('/api/reviews', {
          hikeName: currentHike.hikeName,
          userName: this.userName,
          text: this.text,
        });
        this.$root.$data.currentHike = currentHike;
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
        await axios.put("/api/reviews/" + review._id,{
          hikeName:this.currentHike.hikeName,
          userName:review.userName,
          text:this.newText
        });
        this.editBox = false;
        this.newText = null;
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
.overflow{
  width: 800px;
  overflow-wrap: break-word;
}
.userReview{
padding-left: 200px;}

.hikeNameDiv {
  color: white;
  height:0px;
  width:0px;
}

.username{
width: 20%;
border: #000 solid 3px;
margin-top: 20px;

}
.buttons {
  display: flex;
  justify-content: right;
  width: 200px;
  padding-left: 65%;

}
.input {
    border: solid black 3px;
    height: 30px;
}
input[type=checkbox] {
    transform: scale(1.5);
    margin-right: 10px;
}

input[type=text] {
    font-size: 1em;
}

button {
    margin-top: 5px;
    display: flex;
    font-family: 'Arvo';
    font-size: 1em;
    margin-bottom: 5px;
    float: left;
    margin-right: 10px;
}
.reviews {
    display:flex;
    overflow: auto;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding-top: 5px;
    justify-content: center;
    border:black solid 2px;
    padding-left: -100px;
    padding-right: -75px;
    margin-bottom: 4px;
    margin-top: 15px;
    
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
  height: 25px;
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