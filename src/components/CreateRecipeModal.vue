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
  
          <b-form-group
            label="How to Make"
            label-for="how-to-make-input"
            invalid-feedback="Instructions are required"
            :state="howToMakeState"
          >
            <b-form-textarea
              id="how-to-make-input"
              v-model="howToMake"
              :state="howToMakeState"
              required
            ></b-form-textarea>
          </b-form-group>
  
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
            label="if this recipe is Vegan click on the checkbox"
            label-for="is-vegan-input"
            :state="isVeganState"
          >
            <b-form-checkbox
              id="is-vegan-input"
              v-model="isVegan"
              :state="isVeganState"
            ></b-form-checkbox>
          </b-form-group>
  
          <b-form-group
            label="if this recipe is Gluten Free click on the checkbox"
            label-for="is-gluten-free-input"
            :state="isGlutenFreeState"
          >
            <b-form-checkbox
              id="is-gluten-free-input"
              v-model="isGlutenFree"
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
        howToMake: "",
        howToMakeState: null,
        timeToMake: "",
        timeToMakeState: null,
        isVegan: false,
        isVeganState: null,
        isGlutenFree: false,
        isGlutenFreeState: null,
        servingSize: "",
        servingSizeState: null,
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
        this.howToMakeState = this.howToMake ? true : false;
        this.timeToMakeState = this.timeToMake ? true : false;
        this.isVeganState = true; // Assuming it's always valid
        this.isGlutenFreeState = true; // Assuming it's always valid
        this.servingSizeState = this.servingSize ? true : false;
        return valid;
      },
      resetModal() {
        this.title = "";
        this.titleState = null;
        this.image = "";
        this.imageState = null;
        this.howToMake = "";
        this.howToMakeState = null;
        this.timeToMake = "";
        this.timeToMakeState = null;
        this.isVegan = false;
        this.isVeganState = null;
        this.isGlutenFree = false;
        this.isGlutenFreeState = null;
        this.servingSize = "";
        this.servingSizeState = null;
      },
      handleOk(bvModalEvent) {
        bvModalEvent.preventDefault();
        this.handleSubmit();
      },

      
      async handleSubmit() {
        if (!this.checkFormValidity()) {
          return;
        }
        try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/users/myrecepies",
          {
            title: this.title,
            image: this.image,
            howToMake: this.howToMake,
            timeToMake: this.timeToMake,
            isVegan: this.isVegan,
            isGlutenFree: this.isGlutenFree,
            servingSize: this.servingSize,
          },
          {
           withCredentials: true 
          }
        );
        this.$nextTick(() => {
              this.$bvModal.hide('modal-prevent-closing');
            });
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }

      },
    },
  };
  </script>




<!-- // Create the recipe object to send to the server
// const recipe = {
//   title: this.title,
//   image: this.image,
//   howToMake: this.howToMake,
//   timeToMake: this.timeToMake,
//   isVegan: this.isVegan,
//   isGlutenFree: this.isGlutenFree,
//   servingSize: this.servingSize,
// };


// // Send the recipe to the server using POST request
// axios.post(this.$root.store.server_domain + '/user/myrecipes', { recipe },{ withCredentials: true })
//   .then(response => {
//     // Handle the server response if needed
//     this.submittedRecipes.push(recipe);
//     this.$nextTick(() => {
//       this.$bvModal.hide('modal-prevent-closing');
//     });
//   })
//   .catch(error => {
//     // Handle the error if the server request fails
//     console.error('Error sending recipe to server:', error);
//   }); -->
  