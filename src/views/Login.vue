<template>
  <b-row align-h="center" class="vh-100" align-v="center">
    <b-col cols="3">
      <b-card class="text-center" border-variant="dark">
        <b-form>
          <b-img class="mb-3" src="assets/logocontactone.png" fluid></b-img>
          <b-form-group label="Login:">
            <b-form-input v-model="login" type="text" required placeholder="Login do usuário">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Senha:">
            <b-form-input v-model="password" type="password" required placeholder="Senha">
            </b-form-input>
          </b-form-group>
          <b-button @click="authenticateLogin" type="submit" block variant="dark">Entrar</b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { BRow, BCol, BCard, BForm, BFormGroup, BButton, BFormInput, BImg } from 'bootstrap-vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BFormGroup,
    BButton,
    BFormInput,
    BImg,
  },
  computed: {
    ...mapGetters('login', ['getAuthentication', 'isAuthenticated']),
  },
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('login', ['authenticate']),
    authenticateLogin() {
      this.authenticate({
        login: this.login,
        password: this.password,
      }).then((result) => {
        if (result) {
          this.$router.push({
            name: 'home',
          });
        }
      });
    },
  },
};
</script>

<style></style>
