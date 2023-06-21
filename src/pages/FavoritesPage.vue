<template>
    <div>
      <h1>Favorites Recipes</h1>
      <b-container>
        <b-row>
          <b-col v-for="r in recipes" :key="r.id">
            <RecipePreview :recipe="r" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import RecipePreview from "../components/RecipePreview.vue";
  
  export default {
    name: "favoritespage",
    components: {
      RecipePreview,
    },
    data() {
      return {
        recipes: [],
      };
    },
    methods: {
      fetchMyRecipes() {
        console.log("the data")
        console.log(this.axios.get(this.$root.store.server_domain + "/users/favorites", { withCredentials: true }))
        return this.axios.get(this.$root.store.server_domain + "/users/favorites", { withCredentials: true });
      },
    },
    async mounted() {
      try {
        const response = await this.fetchMyRecipes();
        // this.recipes = response.data;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any styles you want here */
  </style>
  