<template>
  <div id="myRecipes">
    <h1>My Recipes</h1>
    <b-container>
      <b-row>
        <b-col lg="3" md="6" sm="12" v-for="r in recipes" :key="r.id">
          <RecipePreview :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "MyRecipesPage",
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
      console.log("the data");
      return this.axios.get(
        this.$root.store.server_domain + "/users/myrecepies",
        { withCredentials: true }
      );
    },
  },
  async mounted() {
    try {
      const response = await this.fetchMyRecipes();
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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

#myRecipes {
  font-family: 'Open Sans', sans-serif;
}

h1 {
  /* color: #3f51b5; */
  margin-top: 20px;

  font-weight: 600;
  text-align: center;
  margin-bottom: 2em;
}

b-col {
  padding: 1em;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2em;
}

</style>
