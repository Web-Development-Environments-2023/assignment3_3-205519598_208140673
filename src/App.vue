<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <div class="dropdown" @click="toggleDropdown">
          <button class="dropbtn">More Options</button>
          <div class="dropdown-content" v-if="showDropdown">
            <router-link :to="{ name: 'favoritespage' }">Favorites</router-link>
            <router-link :to="{ name: 'myrecipespage' }">My Recipes</router-link>
            <router-link :to="{ name: 'familypage' }">Family Recipes</router-link>
            <router-link :to="{ name: 'model' }">Create New Recipe</router-link>
          </div>
        </div>
        
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    toggleDropdown() {
      console.log("toggle dropdown")
      console.log(this.showDropdown)

      this.showDropdown = !this.showDropdown;
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

#nav a {
  color: #343a40;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  
  &:hover,
  &.router-link-exact-active {
    background-color: #343a40;
    color: white;
  }
}

button {
  background-color: #343a40;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5a6268;
  }
}


.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}


.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropbtn {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;
  outline: none;
  margin-right: 40px;  // Add this line

  &:hover,
  &:focus {
    background-color: #444;
    transform: scale(1.05);
  }
}



</style>
