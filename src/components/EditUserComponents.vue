<template>
  <div v-if="hasData">
    <b-card
      header="Editar usuário"
      border-variant="dark"
      header-bg-variant="dark"
      header-text-variant="white"
    >
      <b-row>
        <b-col
          ><b-form>
            <b-form-group label="ID" content-cols="10">
              <b-form-input required type="text" v-model="editData.id" disabled> </b-form-input>
            </b-form-group>
            <b-form-group label="Nome" content-cols="10">
              <b-form-input required type="text" v-model="editData.name" :disabled="!hasData">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Login" content-cols="10">
              <b-form-input required type="text" v-model="editData.username" :disabled="!hasData">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Senha"
              content-cols="10"
              invalid-feedback="A senha deve ter ao menos um número, uma letra minúscula, letra maiúscula"
            >
              <b-form-input
                required
                type="password"
                v-model="editData.password"
                :disabled="!hasData"
                :state="testPassword"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="Telefone" content-cols="10">
              <b-form-input
                required
                v-model="editData.phone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                type="tel"
                :disabled="!hasData"
              >
              </b-form-input>
            </b-form-group>
            <b-button :disabled="!hasData" @click="editUser()" block variant="success"
              >Enviar</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCol, BRow, BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue';
import { mapActions } from 'vuex';
// import { cloneDeep } from 'lodash';
import { mask } from 'vue-the-mask';

export default {
  components: {
    BCard,
    BCol,
    BRow,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
  },
  props: ['value'],
  data() {
    return {
      hasData: false,
      emptyData: { id: '', name: '', username: '', password: '', phone: '' },
      editData: { id: '', name: '', username: '', password: '', phone: '' },
    };
  },
  watch: {
    value: {
      deep: true,
      handler(data) {
        this.editData = data;
        if (this.editData.id !== '') {
          this.hasData = true;
        }
      },
    },
  },
  directives: {
    mask,
  },
  computed: {
    testPassword() {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
      if (pattern.test(this.editData.password)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    editUser() {
      if (
        this.editData.name !== '' &&
        this.editData.username !== '' &&
        this.editData.phone !== '' &&
        this.testPassword === true
      ) {
        this.updateUser(this.editData).then(() => {
          this.editData = this.emptyData;
          this.hasData = false;
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
