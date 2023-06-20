<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Recipes:
      <div v-if="submittedRecipes.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="(recipe, index) in submittedRecipes" :key="index">
          {{ recipe.title }}
        </li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Image"
          label-for="image-input"
          invalid-feedback="Image URL is required"
          :state="imageState"
        >
          <b-form-input
            id="image-input"
            v-model="image"
            :state="imageState"
            required
          ></b-form-input>
        </b-form-group>

        <h4>Ingredients:</h4>
        <div v-for="(ingredient, index) in ingredients" :key="index">
          <b-form-group
            :label="`Ingredient Name ${index + 1}`"
            :label-for="`ingredient-name-input-${index}`"
            invalid-feedback="Ingredient Name is required"
            :state="ingredients[index].nameState"
          >
            <b-form-input
              :id="`ingredient-name-input-${index}`"
              v-model="ingredients[index].name"
              :state="ingredients[index].nameState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :label="`Ingredient Amount ${index + 1}`"
            :label-for="`ingredient-amount-input-${index}`"
            invalid-feedback="Ingredient Amount is required"
            :state="ingredients[index].amountState"
          >
            <b-form-input
              :id="`ingredient-amount-input-${index}`"
              v-model="ingredients[index].amount"
              :state="ingredients[index].amountState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :label="`Ingredient Unit ${index + 1}`"
            :label-for="`ingredient-unit-input-${index}`"
            invalid-feedback="Ingredient Unit is required"
            :state="ingredients[index].unitState"
          >
            <b-form-input
              :id="`ingredient-unit-input-${index}`"
              v-model="ingredients[index].unit"
              :state="ingredients[index].unitState"
              required
            ></b-form-input>
          </b-form-group>

          <b-button variant="danger" @click="removeIngredient(index)">
            Cancel Ingredient
          </b-button>
          <hr>
        </div>

        <b-button @click="addIngredient">Add Ingredient</b-button>

        <b-form-group
          label="Time to Make"
          label-for="time-to-make-input"
          invalid-feedback="Time to make is required"
          :state="timeToMakeState"
        >
          <b-form-input
            id="time-to-make-input"
            v-model="timeToMake"
            :state="timeToMakeState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="If this recipe is Vegan click on the checkbox"
          label-for="is-vegan-input"
          :state="isVeganState"
        >
          <b-form-checkbox
            id="is-vegan-input"
            :checked="isVegan === 'yes'"
            @change="updateIsVegan"
            :state="isVeganState"
          ></b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="If this recipe is Gluten Free click on the checkbox"
          label-for="is-gluten-free-input"
          :state="isGlutenFreeState"
        >
          <b-form-checkbox
            id="is-gluten-free-input"
            :checked="isGlutenFree === 'yes'"
            @change="updateIsGlutenFree"
            :state="isGlutenFreeState"
          ></b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="Serving Size"
          label-for="serving-input"
          invalid-feedback="Serving size is required"
          :state="servingSizeState"
        >
          <b-form-input
            id="serving-input"
            v-model="servingSize"
            :state="servingSizeState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Instructions"
          label-for="instructions-input"
        >
          <b-form-textarea
            id="instructions-input"
            v-model="instructions"
            placeholder="Add your instructions to the recipe separated by commas"
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      titleState: null,
      image: "",
      imageState: null,
      ingredients: [], // Array to hold the ingredients
      timeToMake: "",
      timeToMakeState: null,
      isVegan: "no", 
      isVeganState: null,
      isGlutenFree: "no",
      isGlutenFreeState: null,
      servingSize: "",
      servingSizeState: null,
      instructions: "",
      submittedRecipes: [],
      form: {
        submitError: null,
      },
    };
  },
  methods: {
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.titleState = this.title ? true : false;
        this.imageState = this.image ? true : false;
        this.timeToMakeState = this.timeToMake ? true : false;
        // this.isVeganState = true; // Assuming it's always valid
        // this.isGlutenFreeState = true; // Assuming it's always valid
        this.servingSizeState = /^\d+$/.test(this.servingSize); // Use regex to validate if it's a valid number

        // Check each ingredient's validity
        for (const ingredient of this.ingredients) {
          ingredient.nameState = ingredient.name ? true : false;
          ingredient.amountState = ingredient.amount ? true : false;
          ingredient.unitState = ingredient.unit ? true : false;
        }

        return valid && this.servingSizeState;
      },
    updateIsVegan() {
        this.isVegan = this.isVegan === 'yes' ? 'no' : 'yes';
      },

    updateIsGlutenFree() {
        this.isGlutenFree = this.isGlutenFree === 'yes' ? 'no' : 'yes';
      },

    resetModal() {
      this.title = "";
      this.titleState = null;
      this.image = "";
      this.imageState = null;
      this.ingredients = []; // Reset the ingredients array
      this.timeToMake = "";
      this.timeToMakeState = null;
      this.isVegan = "no"; 
      this.isVeganState = null;
      this.isGlutenFree = "no"; 
      this.isGlutenFreeState = null;
      this.servingSize = "";
      this.servingSizeState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    addIngredient() {
      this.ingredients.push({
        name: "",
        nameState: null,
        amount: "",
        amountState: null,
        unit: "",
        unitState: null,
      });
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },

    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      try {
        console.log(this.$root.store.server_domain + "/users/myrecepies");
        console.log(this.$root.store.username);
        console.log(this.title);
        console.log(this.image);
        console.log(this.ingredients);
        console.log(this.timeToMake);
        console.log(this.isVegan);
        console.log(this.isGlutenFree);
        console.log(this.servingSize);


        const instructionsArray = this.instructions.split(",").map((instr) => instr.trim());
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/myrecepies",
          {
            username: this.$root.store.username,
            title: this.title,
            image: this.image,
            ingredients: this.ingredients,
            timeToMake: this.timeToMake,
            likes: "0",
            isVegan: this.isVegan, 
            isGlutenFree: this.isGlutenFree, 
            servingSize: this.servingSize,
            instructions: this.instructions,
            analyzedInstructions: instructionsArray,
          },
          {
            withCredentials: true,
          }
        );
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    }
  },
};
</script>

