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
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            <template v-if="$route.params.recipeId < 9999990">
              <!-- Render the list of ingredients if the condition is true -->
              Ingredients:
              <ul>
                <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                  {{ r.original }}
                </li>
              </ul>
            </template>
            <template v-else>
              Ingredients:
              <!-- Loop through the list and display each item with an index -->
              <ul>
                <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                   {{ r.name }} {{ r.amount }} {{ r.unit }}
                </li>
              </ul>
            </template>
          </div>

          <div class="wrapped">
            <template v-if="$route.params.recipeId < 9999990">
              Instructions:
              <ol>
                <li v-for="s in recipe._instructions" :key="s.number">
                  {{ s.step }}
                </li>
              </ol>
            </template>
            <template v-else>
              <!-- Loop through the list and display each item with an index -->
              <div v-for="(step, index) in recipe._instructions" :key="index">
                {{ index + 1 }}. {{ step }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->

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
          this.$root.store.server_domain + "/recipes/info",
          {
            params: { id: this.$route.params.recipeId }
          }
        );
        console.log("this is the response")
        console.log(response);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log(response.data)
      console.log("response.data.recipe")
      console.log(response.data.recipe);

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data;

      response.data.recipe
      console.log("response.data.recipe")
      console.log(response.data.recipe);

      //for id that is less then 9999990
      // let _instructions = analyzedInstructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      //for id that is begger or equle to 999999
      // let _instructions = analyzedInstructions.map((step) => step.toLowerCase());
      console.log("this.$route.params.recipeId")
      console.log(this.$route.params.recipeId)
      let _instructions;
      // _instructions = analyzedInstructions.map((step) => step.toLowerCase());

      if (this.$route.params.recipeId < 9999990) {
        _instructions = analyzedInstructions
          .map((fstep) => {
            fstep.steps[0].step = fstep.name + fstep.steps[0].step;
            return fstep.steps;
          })
          .reduce((a, b) => [...a, ...b], []);
      } else {
        _instructions = analyzedInstructions.map((step) => step.toLowerCase());
        console.log("this is the _instructions")
        console.log(_instructions)
      }
      console.log("this is the _instructions")
      console.log(_instructions)

      console.log("this is the extendedIngredients")
      console.log(extendedIngredients)


      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };

      this.recipe = _recipe;
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