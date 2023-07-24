<template>
  <div class="container">
    <form @submit.prevent="onSubmit" class="search-form">
      <input v-model="searchQuery" placeholder="Search recipes" class="form-control search-input">
      <select v-model="number" class="custom-select select-option">
        <option disabled value="">Number of results</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <select v-model="cuisine" class="custom-select select-option">
        <option disabled value="">Cuisine</option>
        <option>Italian</option>
        <option>Asian</option>
        <option>Indian</option>
      </select>
      <select v-model="diet" class="custom-select select-option">
        <option disabled value="">Diet</option>
        <option>Vegetarian</option>
        <option>Vegan</option>
      </select>
      <select v-model="intolerances" class="custom-select select-option">
        <option disabled value="">Intolerances</option>
        <option>Gluten</option>
        <option>Dairy</option>
        <option>Seafood</option>
      </select>
      <button type="submit" class="btn search-btn">Search</button>
    </form>
    <div v-if="recipes.length" class="my-4 results">
      <h2>Search results</h2>
      <RecipePreview 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        :recipe="recipe"
      ></RecipePreview>
    </div>
    <p v-else class="no-results">No results found</p>
  </div>
</template>


<script>
import RecipePreview from "../components/RecipePreview";

export default {
  components: {
    RecipePreview,
  },
  data() {
    return {
      searchQuery: '',
      number: '',
      cuisine: '',
      diet: '',
      intolerances: '',
      recipes: [],
    };
  },
  created() {
    this.searchQuery = sessionStorage.getItem('searchQuery') || '';
    this.number = sessionStorage.getItem('number') || '';
    this.cuisine = sessionStorage.getItem('cuisine') || '';
    this.diet = sessionStorage.getItem('diet') || '';
    this.intolerances = sessionStorage.getItem('intolerances') || '';
    const storedRecipes = sessionStorage.getItem('recipes');
    this.recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
  },
  beforeDestroy() {
    sessionStorage.setItem('searchQuery', this.searchQuery);
    sessionStorage.setItem('number', this.number);
    sessionStorage.setItem('cuisine', this.cuisine);
    sessionStorage.setItem('diet', this.diet);
    sessionStorage.setItem('intolerances', this.intolerances);
    sessionStorage.setItem('recipes', JSON.stringify(this.recipes));
  },
  methods: {
    async onSubmit() {
      const response = await this.axios.get(
        this.$root.store.server_domain + '/recipes/search',
        {
          params: {
            query: this.searchQuery,
            number: this.number,
            cuisine: this.cuisine,
            diet: this.diet,
            intolerances: this.intolerances,
          },
        },
      );
      this.recipes = response.data;
    },
  },
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

.container {
  font-family: 'Open Sans', sans-serif;
  padding: 2em;
  max-width: 900px;
  margin: 0 auto;
  color: #333;
  line-height: 1.6;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2em;
}

.search-input,
.select-option,
.search-btn {
  flex: 1 0 100%;
  margin-bottom: 1em;
  max-width: 100%;
}

.search-input {
  flex: 2 0 200px;
}

.search-btn {
  background-color: #3f51b5;
  color: white;
  border: none;
}

.results {
  margin-top: 2em;
}

.no-results {
  color: #999;
  text-align: center;
  margin-top: 2em;
}
</style>
