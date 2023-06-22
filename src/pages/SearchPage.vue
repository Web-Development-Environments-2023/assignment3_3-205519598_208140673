<!-- <template>
  <div>
    <form @submit.prevent="onSubmit" class="form-inline my-4">
      <input v-model="searchQuery" placeholder="Search recipes" class="form-control mr-sm-2">
      <select v-model="number" class="custom-select my-1 mr-sm-2">
        <option disabled value="">Number of results</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <select v-model="cuisine" class="custom-select my-1 mr-sm-2">
        <option disabled value="">Cuisine</option>
        <option>Italian</option>
        <option>Asian</option>
        <option>Indian</option>
      </select>
      <select v-model="diet" class="custom-select my-1 mr-sm-2">
        <option disabled value="">Diet</option>
        <option>Vegetarian</option>
        <option>Vegan</option>
      </select>
      <select v-model="intolerances" class="custom-select my-1 mr-sm-2">
        <option disabled value="">Intolerances</option>
        <option>Gluten</option>
        <option>Dairy</option>
        <option>Seafood</option>
      </select>
      <button type="submit" class="btn btn-primary my-1">Search</button>
    </form>
    <div v-if="recipes.length" class="my-4">
      <h2>Search results</h2>
      <RecipePreview 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        :recipe="recipe"
      ></RecipePreview>
    </div>
    <p v-else class="my-4">No results found</p>
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

</script> -->
