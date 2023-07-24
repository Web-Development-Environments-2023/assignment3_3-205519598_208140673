<template>
  <div class="container">
    <h1 class="title">Welcome to Noa Ron - Food</h1>

    <div class="content-wrapper">
      <RecipePreviewList title="Explore These Recipes!" class="RandomRecipes" />
      
      <div class="right-side">
        <LoginPage v-if="!$root.store.username" class="login-page" />

        <LastRecipesWatched v-else
          title="Your Recently Watched Recipes"
          class="lastrecipes"
        ></LastRecipesWatched>
      </div>
    </div>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LastRecipesWatched from "../components/LastRecipesWatched";
import LoginPage from "../pages/LoginPage"; 
export default {
  components: {
    RecipePreviewList,
    LastRecipesWatched,
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
.container {
  padding: 20px;
  width: 100%;

}

.title {
  text-align: center;
  color: #4a4a4a;
  font-weight: 600;
  font-size: 2.5em;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.content-wrapper {
  display: flex;
  justify-content: center; // Horizontally center the content  align-items: flex-start;  // align items to the top
  gap: 20px;  // Creates some space between the elements
}

.RandomRecipes, .right-side {
  flex: 1 1 45%; // This makes each box to occupy 45% of the total width and grow and shrink equally
  padding: 10px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  border-radius: 5px;
  background: #fff;
  min-width: 800px;  // Set a minimum height
  min-height: 500px;  // Set a minimum height

}

.right-side {
  margin-left: 2.5%;
}

.login-button {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>