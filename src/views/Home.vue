<template>
  <div>
    <v-container
      fluid
      class="grey lighten-5 mb-6"
    >
    <v-form
      ref="form"
    >
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-autocomplete
              :items="films"
              color="white"
              item-text="title"
              label="Name of film"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="people"
              color="white"
              item-text="name"
              label="Name of person"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="locations"
              color="white"
              item-text="name"
              v-model="searchLocation"
              label="Name of location"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="vehicles"
              color="white"
              item-text="name"
              label="Name of vehicle"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="species"
              color="white"
              item-text="name"
              label="Name of specie"
            ></v-autocomplete>
          </v-col>
          <v-btn
            color="success"
            class="mr-4"
            @click="searchFilm"
          >
            Search
          </v-btn>
          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    
    <v-row>
      <v-col 
        cols="4"
        v-for="film in films" :key="film.id" class="post"
      >
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              v-bind:src="film.img"
            >
              <v-card-title>
                <v-row>

                  <v-col 
                    cols="9"
                    class="text-center pt-10"
                  >
                  {{ film.title }}
                  </v-col>
                  <v-col
                    cols="3"
                  >
                    <v-progress-circular
                    :size="75"
                    :width="10"
                    :value="film.rt_score"
                    v-bind="film"
                    color="green"
                  >
                    {{ film.rt_score }}
                  </v-progress-circular>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ film.director }} - {{ film.release_date }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    v-on="on"
                  >{{ film.description | str_limit(80) }}</span>
                </template>
                <span>{{ film.description }}</span>
              </v-tooltip>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col
                  cols="3"
                >
                  <v-icon
                    medium
                  >
                    people
                  </v-icon>
                  {{ film.people | get_participants() }}
                </v-col>
                <v-col
                  cols="3"
                >
                  <v-icon
                    medium
                  >
                    directions_car
                  </v-icon>
                  {{ film.vehicles | get_participants() }}
                </v-col>
                <v-col
                  cols="3"
                >
                  <v-icon
                    medium
                  >
                    house
                  </v-icon>
                  {{ film.locations | get_participants() }}
                </v-col>
                <v-col
                  cols="3"
                >
                  <v-icon
                    medium
                  >
                    pets
                  </v-icon>
                  {{ film.species | get_participants() }}
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>

    </v-container>
  </div>
</template>

<script>
  import axios from "axios";
  import { createClient } from 'pexels';

  export default {
    data(){
      return {
        films: [],
        species: [],
        vehicles: [],
        locations: [],
        people: [],
        photos: [],
        searchLocation: {}
      }
    },
    methods: {
      getOptions(){
        this.getVehicles()
        this.getPeople()
        this.getFilms()
        this.getLocations()
        this.getSpecies()
      },
      async getVehicles(){
        await axios.get('https://ghibliapi.herokuapp.com/vehicles')
          .then(response => {
                  this.vehicles = response.data
              })
              .catch(e => {
                  this.errors.push(e)
              });
      },
      async getPeople(){
          await axios.get('https://ghibliapi.herokuapp.com/people')
            .then(response => {
                    this.people = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                });
      },
      async getSpecies(){
        await axios.get('https://ghibliapi.herokuapp.com/species')
          .then(response => {
                  this.species = response.data
              })
              .catch(e => {
                  this.errors.push(e)
              });
      },
      async getLocations(){
        await axios.get('https://ghibliapi.herokuapp.com/locations')
          .then(response => {
                  this.locations = response.data
              })
              .catch(e => {
                  this.errors.push(e)
              });
      },
      async getFilms(){
        await axios.get('https://ghibliapi.herokuapp.com/films')
          .then(response => {
                  this.films = response.data
              })
              .catch(e => {
                  this.errors.push(e)
              });
      },
      searchFilm() {
        console.log(this.$refs.form)
        console.log(this.searchLocation)
      },
      reset () {
        this.$refs.form.reset()
      },
      // Funcion para consulta de foto, como peticion de tarea en el archivo
      async getPhotos () {
        const client = createClient(process.env.VUE_APP_API_KEY);
        const query = ['Nature', 'Mountains', 'Cartoons', 'Dark', 'Night']
        const index = Math.floor((Math.random() * 5)+1)

        await client.photos.search({ query: query[index], orientation: 'landscape', per_page: 20 })
          .then(photos => { this.photos = photos})
          .catch(e => {
                  this.errors.push(e)
            });
        
        if(this.films) {
          for (let index = 0; index < this.films.length; index++) {
            let temp = this.films[index]
            temp.img = this.photos.photos[index].src.medium 
            this.films.splice(index, 1, temp)
          }

        }
      }
    },
    created(){
      this.getOptions()
      this.getPhotos()
    }
  }
</script>