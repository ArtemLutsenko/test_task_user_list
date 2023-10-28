<script setup lang=ts>
import {computed, defineComponent, onMounted} from 'vue';
import {mapActions, mapGetters, useStore} from 'vuex';
import UsersCard from "@/components/users/UsersCard.vue";
import type { User } from '@/interfaces/User.interface';
import {ElMessage} from "element-plus";

const store = useStore();

const users = computed<User[]>(() => store.getters['users/users']);

const fetchUsers = async () => {
  try {
    await store.dispatch('users/fetchUsers');
  } catch (error) {
    ElMessage.error('Failed to fetch users');
    console.error(error);
  }
};

const refetchUsers = async () => {
  try {
    await store.dispatch('users/refetchUsers');
  } catch (error) {
    ElMessage.error('Failed to refetch users');
    console.error(error);
  }
};

const handleDelete = async  (id: number) => {
  try {
    await store.dispatch('users/deleteUser', id);
    ElMessage.success('User deleted');
  } catch (error) {
    ElMessage.error('Failed to delete user');
    console.error(error);
  }
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
        @delete ="handleDelete"
    />
    <el-button type="primary" @click="refetchUsers" class="btn">Refetch users</el-button>
  </div>
</template>

<style scoped>

</style>
