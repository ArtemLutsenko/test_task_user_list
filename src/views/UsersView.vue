<script setup lang=ts>
import {computed, defineComponent, onMounted} from 'vue';
import {mapActions, mapGetters, useStore} from 'vuex';
import UsersCard from "@/components/users/UsersCard.vue";
import {User} from "@/interfaces/User.interface";
import {ElMessage} from "element-plus";

const store = useStore();

const users = computed<User[]>(() => store.getters['users/users']);

const fetchUsers = async () => {
  await store.dispatch('users/fetchUsers');
};

const refetchUsers = async () => {
  await store.dispatch('users/refetchUsers');
};

const deleteUser = (id: number) => {
  store.dispatch('users/deleteUser', id);
  ElMessage.success('User deleted')
};

onMounted(() => {
  fetchUsers();
});

</script>

<template>
  <div class="container">
    <h3>Users</h3>

    <el-divider />

    <users-card
        v-for="user in users"
        :key="user.id"
        :user="user"
        @delete="deleteUser"
    />
    <el-button type="primary" @click="refetchUsers" class="btn">Refetch users</el-button>
  </div>
</template>

<style scoped>

</style>
