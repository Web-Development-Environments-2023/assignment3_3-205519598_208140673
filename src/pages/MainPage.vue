<template>
  <div class="container">
    <h1 class="title">Main Page</h1>

    <div class="content-wrapper">
      <!-- RecipePreviewList always on the left -->
      <RecipePreviewList title="Random Recipes" class="RandomRecipes" />

      <!-- Conditionally render the right side component based on user status -->
      <div class="right-side">
        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to view this</router-link>

        <LastRecipesWatched v-else
          title="Last Viewed Recipes"
          class="lastrecipes"
          disabled
        ></LastRecipesWatched>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LastRecipesWatched from "../components/LastRecipesWatched";

export default {
  components: {
    RecipePreviewList,
    LastRecipesWatched
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex; // this creates the two-column layout
}

.RandomRecipes {
  margin: 10px 0 10px;
  flex: 1; // takes up half the space
}

.right-side {
  flex: 1; // takes up half the space
}
</style>
