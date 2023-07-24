<template>
  <b-container>
    <h3 class="title">
      {{ title }}:
      <slot></slot>
    </h3>


    <b-row class="recipes-container">
      <b-col v-for="r in recipes" :key="r.id" class="recipe-col">
        <RecipePreview :recipe="r" />
      </b-col>
    </b-row>
    <b-button @click="updateRecipes" class="update-button">Get New Recipes</b-button>

  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/randomrecipes",
          { withCredentials: true }
        );

        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        console.log("this is the random recipes:");
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.update-button {
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.recipes-container {
  margin-top: 20px;
  display: flex;  // added to make the recipe previews display in a row
  flex-wrap: wrap;  // added to allow the recipe previews to wrap onto the next line if the viewport width is too narrow
  justify-content: space-around;  // added to evenly distribute the recipe previews
}

.recipe-col {
  margin: 20px;  // adjusted to give both vertical and horizontal margins
}
</style>