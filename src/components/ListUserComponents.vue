<template>
  <div>
    <b-row>
      <b-col>
        <b-table head-variant="dark" :fields="fields" striped bordered :items="listUsersRegistered">
          <template v-slot:cell(actions)="{ item }">
            <b-button @click="editUserSelected(item)" class="mr-1" size="sm" variant="primary"
              >Editar</b-button
            >
            <b-button @click="removeUserSelected(item.id)" class="ml-1" size="sm" variant="danger"
              >Excluir</b-button
            >
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCol, BRow, BTable, BButton } from 'bootstrap-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BCol,
    BRow,
    BTable,
    BButton,
  },
  props: ['value'],
  computed: {
    ...mapGetters('users', ['listUsersRegistered']),
  },
  methods: {
    ...mapActions('users', ['deleteUser', 'fetchUsers']),
    removeUserSelected(userId) {
      this.deleteUser(userId);
    },
    editUserSelected(user) {
      this.$emit('input', user);
    },
  },
  created() {
    this.fetchUsers();
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Nome usuário',
        },
        {
          key: 'username',
          label: 'Login usuário',
        },
        {
          key: 'actions',
          label: 'Ações',
        },
      ],
    };
  },
};
</script>

<style></style>
