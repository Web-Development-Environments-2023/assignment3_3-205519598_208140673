<template>
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1>{{ recipe.title }}</h1>
          <img :src="recipe.image" class="center" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div>Ready in {{ recipe.time_to_make }} minutes</div>
                <div>Likes: {{ recipe.likes }} likes</div>
              </div>
              Ingredients:
              <ul>
                <li v-for="(ingredient, index) in recipe.how_to_make" :key="index">
                  {{ ingredient.name }}
                </li>
              </ul>
  
  
            </div>
            <div class="wrapped">
              Instructions:
              <ol>
                <li v-for="s in recipe.how_to_make" :key="s.number">
                  {{ s.step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
        <!-- <pre>
        {{ $route.params }}
        {{ recipe }}
      </pre
        > -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipe: null
      };
    },
    async created() {
      try {
        let response;
        // response = this.$route.params.response;
  
        try {
          response = await this.axios.get(
            // "https://test-for-3-2.herokuapp.com/recipes/info",
            // this.$root.store.server_domain + "/recipes/info",
            // {
            //   params: { id: this.$route.params.recipeId }
            // }
            ///////////////////////////////////////////////////////////////////////////////////////
            this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`,
  
            // this.$root.store.server_domain + "/recipes/",
            // {
            //   params: { id: this.$route.params.recipeId }
            // }
            ///////////////////////////////////////////////////////////////////////////////////////
          );
  
          // console.log("response.status", response.status);
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
  
        // let {
        //   analyzedInstructions,
        //   instructions,
        //   extendedIngredients,
        //   aggregateLikes,
        //   readyInMinutes,
        //   image,
        //   title
        // } = response.data.recipe;
  
  //////////////////////////////////////////////////////////////////////
        console.log("response 1:", response);
        console.log("response 2:", response.data);
        console.log("response 3:", response.data[0]);
  
        let {
            user_id,
            username,
            recipe_id,
            title,
            image,
            how_to_make,
            time_to_make,
            likes,
            is_vegan,
            is_gluten_free,
            servings
          } = response.data;
          console.log("how_to_make:", how_to_make);
  
          if (!Array.isArray(how_to_make)) {
          how_to_make = [how_to_make];
        }
  //////////////////////////////////////////////////////////////////////
  
        // let _instructions = analyzedInstructions
        //   .map((fstep) => {
        //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //     return fstep.steps;
        //   })
        //   .reduce((a, b) => [...a, ...b], []);
  
        // let _recipe = {
        //   instructions,
        //   _instructions,
        //   analyzedInstructions,
        //   extendedIngredients,
        //   aggregateLikes,
        //   readyInMinutes,
        //   image,
        //   title
        // };
  
        // this.recipe = _recipe;
  
  //////////////////////////////////////////////////////////////////////
  
        this.recipe = {
          user_id,
          username,
          recipe_id,
          title,
          image,
          how_to_make,
          time_to_make,
          likes,
          is_vegan,
          is_gluten_free,
          servings
        };
  
  //////////////////////////////////////////////////////////////////////
  
      } catch (error) {
        console.log(error);
      }
    }
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  /* .recipe-header{
  
  } */
  </style>
  