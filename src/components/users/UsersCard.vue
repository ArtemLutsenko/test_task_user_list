<script setup lang=ts>
import {defineProps} from "vue";
import {User} from '@/interfaces/User.interface';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";

const props = defineProps<{
  user: User;
}>();

const router = useRouter();

const editUser = () => {
  router.push({name: 'user', params: {id: props.user.id.toString()}, query: {edit: 'true'}});
}

</script>

<template>
  <router-link :to="`/users/${user.id}`" class="users-card">
    <div class="users-card__content">
      <img class="users-card__img" :src="user.avatar" alt="">

      <div class="users-card__info">
        <div class="users-card__name">
          <span>Name: </span>{{ user.first_name }} {{ user.last_name }}
        </div>

        <div class="users-card__email">
          <span>Email: </span>{{ user.email }}
        </div>
      </div>
    </div>

    <div class="users-card__actions">
      <el-button type="primary" :icon="Edit" circle @click.prevent="editUser"/>

      <el-button type="danger" :icon="Delete" circle @click.prevent="$emit('delete', user.id)"/>
    </div>

  </router-link>
</template>

<style scoped lang="scss">
.users-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: white;
  flex-wrap: wrap;
  transition: all .3s ease;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }

  &__content {
    display: flex;
    gap: 15px;
  }

  &__img {
    width: 60px;
    border-radius: 50%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    font-style: italic;

    span {
      font-weight: bold;
    }
  }

  &__actions {
    button {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
