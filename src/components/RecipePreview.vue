<template>
  <div class="recipe-preview" :class="{ watched: isWatched }">
    <router-link 
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }" 
      @click.native="sendLastWatch"
    >
      <div class="recipe-body">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" alt="Recipe Image" />
        <div v-else class="loader">Loading Image...</div>
      </div>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
        <ul class="recipe-overview">
          <li><strong>Time:</strong> {{ recipe.readyInMinutes }} minutes</li>
          <li><strong>Likes:</strong> {{ recipe.aggregateLikes }}</li>
        </ul>
      </div>
    </router-link>
    <div class="recipe-actions">
      <button class="favorite-button" @click.stop="addFavorite" :disabled="isFavorite">Add to Favorite</button>
    </div>
  </div>
</template>


<script>

export default {
  async created() {
    console.log("Recipe data: ", this.recipe);
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });

    try {
      const response = await this.axios.get(this.$root.store.server_domain + '/users/favorites', { withCredentials: true });
      this.isFavorite = response.data.find(recipe => recipe.id === this.recipe.id) ? true : false;
    } catch (error) {
      console.error("Failed to get favorite recipes", error);
    }
  },
  data() {
    return {
      image_load: false,
      isFavorite: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    readyInMinutes: {
      type: Number,
      required: true
    },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },
  methods: {
    async sendLastWatch() {
      try {
        // console.log("from the recipe preview::::::::::: ", this.recipe.id)
        console.log("from the recipe preview::::::::::: ", this.recipe)

        const response = await this.axios.post(
          this.$root.store.server_domain + '/users/lastwatch',
          { recipeId: this.recipe.id },
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log("The Recipe successfully saved as LastWatch");
          const watchedRecipes = JSON.parse(sessionStorage.getItem('watchedRecipes') || '[]');
          console.log("watchedRecipes: ", watchedRecipes)
          if (!watchedRecipes.includes(this.recipe.id)) {
              watchedRecipes.push(this.recipe.id);
              sessionStorage.setItem('watchedRecipes', JSON.stringify(watchedRecipes));
            }
        } else {
          console.log("Failed to save the recipe as LastWatch");
        }
      } catch (error) {
        console.error("Failed to save the recipe as LastWatch", error);
      }
    },
    async addFavorite() {
      console.log("addFavorite was called");
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + '/users/favorites',
          { recipeId: this.recipe.id },
          { withCredentials: true }
        );
        if (response.status === 200) {
          alert("The Recipe successfully saved as favorite");
        } else {
          alert("Failed to save the recipe as favorite");
        }
      } catch (error) {
        console.error("Failed to save the recipe as favorite", error);
      }
    },
  },
  computed: {
  isWatched() {
    const watchedRecipes = JSON.parse(sessionStorage.getItem('watchedRecipes') || '[]');
    return watchedRecipes.includes(this.recipe.id);
  }
}
  
};
</script>

<style scoped>
.watched {
  opacity: 0.5;
}
.recipe-preview {
  display: inline-flex;
  width: 200px; /* Adjust width if necessary */
  height: auto;
  position: relative;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  flex-direction: column;  
}

.recipe-preview:hover {
  box-shadow: 0 0 20px rgba(0,0,0,0.2); /* Enhance shadow on hover */
}

.recipe-preview > .recipe-body {
  width: 100%;
  /* height: 250px; */
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the aspect ratio of images */
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-weight: bold;
}

.recipe-preview .recipe-footer {
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9; /* Slightly gray background */
}

.recipe-preview .recipe-footer .recipe-title {
  font-size: 15px; /* Increase font size for the title */
  font-weight: bold;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px; /* Add some space between the title and other information */
  font-family: Calibri, Arial, sans-serif; /* Set the font-family to Calibri, with fallbacks */
}
.recipe-preview .recipe-footer ul.recipe-overview {
  list-style-type: none; /* Remove bullets */
  padding: 0;
  display: flex;
  justify-content: space-between; /* Distribute items evenly */
  font-size: 10pt;
  font-family: Calibri, Arial, sans-serif; /* Set the font-family to Calibri, with fallbacks */

}

.recipe-actions {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.favorite-button {
  padding: 5px 10px;
  background-color: #ff47ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.favorite-button:hover {
  background-color: #ff7f50;
}
.favorite-button:disabled {
    background-color: #b3b3b3; /* Grayed out background */
    color: #ffffff; /* White text */
    cursor: not-allowed; /* Display a "not allowed" cursor on hover */
  }
</style>
