<script setup lang=ts>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import type { User } from '@/interfaces/User.interface';
import {
  Delete,
  Edit,
  Check,
  Back
} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

const route = useRoute();
const store = useStore();
const router = useRouter();

const userId = computed(() => Number(route.params.id));
const isLoading = ref(false);
const error = ref<Error | null>(null);

const user = computed((): User | undefined => {
  return store.getters['users/getUserById'](userId.value);
});
const editMode = ref(route.query.edit === 'true');
const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const editedUser = ref<User | null>(null);

watch(user, (newUser) => {
  if (newUser) {
    editedUser.value = {...newUser};
  }
}, {immediate: true});

onMounted(async () => {
  try {
    isLoading.value = true;
    if (store.getters['users/users'].length === 0) {
      await store.dispatch('users/fetchUsers');
    }
    if (userId.value && user.value === undefined) {
      router.replace({ name: 'NotFound' });
    }
  } catch (err) {
    error.value = err as Error;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

const saveUser = async () => {
  try {
    await store.dispatch('users/updateUser', editedUser.value);
    ElMessage.success('User updated');
    toggleEditMode();
  } catch (err) {
    ElMessage.error('Failed to update user');
    console.error(err);
  }
};

const cancelChanges = () => {
  editMode.value = false;
  if (user.value) {
    editedUser.value = Object.assign(user.value);
  } else {
    editedUser.value = null;
  }
};

const deleteUser = async () => {
  try {
    await store.dispatch('users/deleteUser', userId.value);
    ElMessage.success('User deleted');
    router.replace({ name: 'users' });
  } catch (err) {
    ElMessage.error('Failed to delete user');
    console.error(err);
  }
};

</script>

<template>
  <div class="container">
    <router-link to="/users" class="user-link"> Back to users</router-link>
    <div v-if="isLoading">Loading...</div>

    <div v-if="error">An error occurred: {{ error }}</div>

    <el-card class="user-card" v-if="user">
      <template #header>
        <div class="user-card__header">
          <h3>User id: {{ userId }}</h3>

          <div class="user-card__actions">
            <el-button type="success" :icon="Check" circle @click.prevent="saveUser"
                       v-if="editMode"/>

            <el-button type="primary" :icon="Edit" circle @click.prevent="toggleEditMode"
                       v-if="!editMode"/>

            <el-button type="danger" :icon="Delete" circle
                       @click="deleteUser"/>
          </div>
        </div>
      </template>

      <div class="user-card__main">
        <img class="user-card__img" :src="user.avatar" alt="">

        <div class="user-card__info">
          <p>
            <span class="text-bold">Firs name: </span>

            <el-input v-if="editMode && editedUser" v-model="editedUser.first_name" placeholder="Please input"/>

            <span v-else>{{ user.first_name }}</span>
          </p>

          <p>
            <span class="text-bold">Last name: </span>

            <el-input v-if="editMode && editedUser" v-model="editedUser.last_name" placeholder="Please input"/>

            <span v-else>{{ user.last_name }}</span>
          </p>

          <p>
            <span class="text-bold">Email: </span>

            <el-input v-if="editMode && editedUser" v-model="editedUser.email" placeholder="Please input"/>

            <span v-else>{{ user.email }}</span>
          </p>

          <div class="user-card__footer" v-if="editMode">
            <el-button class="btn" type="success" @click="saveUser">Save</el-button>

            <el-button class="btn" type="warning" @click="cancelChanges">Cansel</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user-link {
  display: flex;
  font-size: 20px;
  margin-bottom: 16px;
}

.user-card {

  &__header {
    display: flex;
    justify-content: space-between;

    @media (max-width: 576px) {
      flex-direction: column;
    }

  }

  &__actions {
    button {
      width: 50px;
      height: 50px;
    }

    .el-icon {
      width: 30px;
      height: 30px;
    }
  }

  &__main {
    display: flex;
    gap: 30px;

    @media (max-width: 756px) {
      flex-direction: column;
    }
  }

  &__img {
    width: 280px;
    height: 280px;
    border-radius: 50%;

    @media (max-width: 756px) {
      display: flex;
      align-self: center;
    }
  }

  &__info{
    display: flex;
    flex-direction: column;

    p{
      font-size: 20px;
      margin-bottom: 15px;
    }
  }

  .el-icon{
    height: 2em;
    width: 2em;
  }
}
</style>
