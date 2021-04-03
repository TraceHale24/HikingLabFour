<template>
<div class="admin">
      <h1>Add/Edit a New Hike!</h1>
    <div class="heading">
      <h2><u>Add a Hike</u></h2>
    </div>
      <div class = 'form'>
      <table>
        <tr class= "tr">
          <td><textarea v-model="hikeName" placeholder="Name of Hike"></textarea></td>
          <td><textarea v-model="rating" placeholder="Hike Rating - Out of 5"></textarea></td>
          <td><textarea v-model="length" placeholder="Hike Description"></textarea></td>
        </tr>
        <tr>
          <td><textarea v-model="time" placeholder="Time - x Hours y Minutes"></textarea></td>
          <td><textarea v-model="destination" placeholder="Destination"></textarea></td>
          <td><input type="file" name="path" @change="fileChanged"></td>
        </tr>
      </table>

        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addHike">
        <h2>{{addHike.hikeName}}</h2>
        <h2>{{addHike.rating}}</h2>
        <h2>{{addHike.length}}</h2>
        <h2>{{addHike.time}}</h2>
        <h2>{{addHike.destination}}</h2>
  
        <img :src="addHike.path" />
      </div>
 <div class="heading">
    <h2><u>Edit a Hike</u></h2>
  </div>
      <div class="add">
        <div class="form">
          <input v-model="findHikeName" placeholder="Search">
          <div class = "suggestions" v-if="suggestions.length > 0">
            <div class = "suggestions" v-for="h in suggestions" :key="h.id" @click="selectHike(h)"> {{h.hikeName}}
            </div>
          </div>
        </div>
        <div class = "upload" v-if="findHike">
          <input v-model="findHike.hikeName">
          <p></p>
          <textarea v-model="findHike.rating"></textarea>
          <p></p>
            <textarea v-model="findHike.length"></textarea>
        <p></p>
            <textarea v-model="findHike.time"></textarea>
        <p></p>
            <textarea v-model="findHike.destination"></textarea>
        <p></p>
      </div>
        <div class="actions" v-if="findHike">
          <button @click="deleteHike(findHike)">Delete</button>
          <button @click="editHike(findHike)">Edit</button>
      </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'admin',
    data() {
    return {
      hikes:[],
      hikeName: "",
      rating: "",
      length: "",
      time: "",
      destination: "",
      file: null,
      addHike: null,
      findHikeName: "",
      findHike: null,
    }
  },
  computed: {
    suggestions() {
      let hikes = this.hikes.filter(hike => hike.hikeName.toLowerCase().startsWith(this.findHikeName.toLowerCase()));
      return hikes.sort((a, b) => a.hikeName > b.hikeName);
    }
  },created() {
    this.getHikes();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/hikes', {
            
          hikeName: this.hikeName,
          path: r1.data.path,
          rating: this.rating,
          length: this.length,
          time: this.time,
          destination: this.destination,
          reviews: [],
        });
        this.addHike = r2.data;
      } catch (error) {
        //console.log(error);
      }
    },
    async getHikes() {
      try {
        let response = await axios.get("/api/hikes");
        this.hikes = response.data;
        return true;
      } catch (error) {
        //onsole.log(error);
      }
    },
    selectHike(hike) {
      this.findHikeName = "";
      this.findHike = hike;
    },
        async deleteHike(hike) {
      try {
        await axios.delete("/api/hikes/" + hike._id);
        this.findHike = null;
        this.getHikes();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async editHike(hike) {
      try {
        await axios.put("/api/hikes/" + hike._id, {
          hikeName: this.findHike.hikeName,
          rating: this.findHike.rating,
          length: this.findHike.length,
          time: this.findHike.time,
          destination: this.findHike.destination,
          path: this.findHike.path,
        });
        this.findHike = null;
        this.getHikes();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  }

}
</script>

<style scoped>
table, tr{
  width: 100%;
}

textarea {
  width: 100%;
  border: 3px solid black;
  border-radius: 3px;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.add,
.edit {
  display: flex;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}


.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 50px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
