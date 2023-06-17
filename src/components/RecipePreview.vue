<template>
  <div class="card" style="width: 18rem;">
    <img :src="recipe.image" class="card-img-top" alt="Recipe image">
    <div class="card-body">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">{{ recipe.how_to_make }}</p>
      <router-link :to="{ name: 'recipe', params: { recipeId: recipe.recipe_id } }" class="btn btn-primary">
        View Recipe
      </router-link>


    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Add any styles you want here */
</style>
