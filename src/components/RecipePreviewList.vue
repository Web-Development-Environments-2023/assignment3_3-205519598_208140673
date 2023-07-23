<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <b-button @click="updateRecipes">Get New Recipes</b-button>

        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
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
          // this.$root.store.server_domain + "/recipes/randomrecipes",
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
.container {
  min-height: 500px;
}
.button-container {
  position: fixed;
  bottom: 0; /* Adjust the distance from the bottom of the screen */
  right: 90px; /* Adjust the distance from the right side of the screen */
  z-index: 2; /* Make sure the button is above other content */
}
</style>