<template>
  <div class="mt-3 ml-3 mr-3">
    <b-button variant="dark" squared v-b-toggle.collapse-1>Adicionar usuários</b-button>
    <b-collapse id="collapse-1" class="mb-3">
      <b-card no-body class="px-3 pb-3">
        <b-form>
          <b-form-group label="name">
            <b-form-input v-model="newUser.name" required type="text"> </b-form-input>
          </b-form-group>
          <b-form-group label="username">
            <b-form-input v-model="newUser.username" required type="text"> </b-form-input>
          </b-form-group>
          <b-form-group
            label="Senha"
            invalid-feedback="A senha deve ter ao menos um número, uma letra minúscula, letra maiúscula"
          >
            <b-form-input v-model="newUser.password" :state="testPassword" required type="password">
            </b-form-input>
          </b-form-group>
          <b-form-group label="phone">
            <b-form-input
              v-model="newUser.phone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              type="tel"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-row align-h="end">
            <b-col cols="3">
              <b-button @click="addUserToList()" variant="success">Adicionar novo usuário</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { cloneDeep } from 'lodash';
import { mask } from 'vue-the-mask';
import {
  BCollapse,
  BCard,
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  VBToggle,
  BRow,
  BCol,
} from 'bootstrap-vue';

export default {
  components: {
    BRow,
    BCol,
    BCollapse,
    BCard,
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
  },
  data() {
    return {
      newUser: {
        name: '',
        username: '',
        password: '',
        phone: '',
      },
      emptyUser: {
        name: '',
        username: '',
        password: '',
        phone: '',
      },
    };
  },
  directives: {
    'b-toggle': VBToggle,
    mask,
  },
  computed: {
    testPassword() {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
      if (pattern.test(this.newUser.password)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions('users', ['addUser']),

    addUserToList() {
      if (
        this.newUser.name !== '' &&
        this.newUser.username !== '' &&
        this.newUser.phone !== '' &&
        this.testPassword === true
      ) {
        this.newUser.phone = this.newUser.phone.replace(/[^\w\s]/gi, '').replace(' ', '');
        this.addUser(this.newUser).then(() => {
          this.$swal
            .fire({
              title: 'Sucesso',
              icon: 'success',
              text: `Usuário adicionado com exito a lista de cadastro.`,
            })
            .finally(() => {
              this.newUser = cloneDeep(this.emptyUser);
            });
        });
      } else {
        this.$swal.fire({
          title: 'Oops!!',
          icon: 'error',
          text: `Algum campo está invalido ou falta informação, por favor verifique.`,
        });
      }
    },
  },
};
</script>

<style></style>
