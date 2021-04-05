<template>
  <div>
    <div>
      <b-navbar variant="dark" type="dark">
        <b-navbar-brand>Contact One</b-navbar-brand>
        <b-nav-item active @click="isOn = false" class="ml-auto">Deslogar</b-nav-item>
      </b-navbar>
    </div>
    <b-container>
      <add-user-components> </add-user-components>
      <b-card border-variant="dark" bg-variant="light">
        <b-row>
          <b-col>
            <list-user-components v-model="currentUser"></list-user-components>
          </b-col>
          <b-col>
            <edit-user-components v-model="currentUser"></edit-user-components>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { BCol, BRow, BCard, BContainer, BNavbar, BNavbarBrand, BNavItem } from 'bootstrap-vue';
import AddUserComponents from '../components/AddUserComponents.vue';
import ListUserComponents from '../components/ListUserComponents.vue';
import EditUserComponents from '../components/EditUserComponents.vue';

export default {
  components: {
    AddUserComponents,
    ListUserComponents,
    BCol,
    BRow,
    BCard,
    EditUserComponents,
    BContainer,
    BNavbar,
    BNavbarBrand,
    BNavItem,
  },
  data() {
    return {
      currentUser: {},
      isOn: false,
    };
  },
  computed: {
    ...mapGetters('login', ['getAuthentication', 'isAuthenticated']),
  },
  watch: {
    isOn() {
      if (this.isOn === false) {
        this.$router.push({
          name: 'login',
        });
      }
    },
  },
  methods: {},
  mounted() {
    if (this.isAuthenticated === false && this.isOn === false) {
      this.$router.push({
        name: 'login',
      });
    } else {
      this.isOn = true;
    }
    this.$swal.fire({
      title: 'Bem-vindo 🎉',
      text: `Olá ${this.getAuthentication.name}.`,
    });
  },
};
</script>

<style></style>
