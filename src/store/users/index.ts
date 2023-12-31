import type { Module } from 'vuex';
import axios from 'axios';
import type { User } from '@/interfaces/User.interface';

interface State {
    users: User[];
}

const usersModule: Module<State, any> = {
    namespaced: true,
    state: () => ({
        users: [],
    }),
    mutations: {
        setUsers(state: State, users: User[]) {
            state.users = users;
        },
        updateUser(state: State, updatedUser: User) {
            const index = state.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                state.users.splice(index, 1, updatedUser);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        deleteUser(state: State, userId: number) {
            const index = state.users.findIndex(user => user.id === userId);
            if (index !== -1) {
                state.users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            const cachedUsers = localStorage.getItem('users');
            if (cachedUsers) {
                commit('setUsers', JSON.parse(cachedUsers));
            } else {
                try {
                    const response = await axios.get('https://reqres.in/api/users');
                    localStorage.setItem('users', JSON.stringify(response.data.data));
                    commit('setUsers', response.data.data);
                } catch (error) {
                    console.error('There was an error fetching the users!', error);
                }
            }
        },
        async refetchUsers({ commit }) {
            try {
                const response = await axios.get('https://reqres.in/api/users');
                localStorage.setItem('users', JSON.stringify(response.data.data));
                commit('setUsers', response.data.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            }
        },
        updateUser({ commit }, updatedUser: User) {
            commit('updateUser', updatedUser);
        },
        deleteUser({ commit }, userId: number) {
            commit('deleteUser', userId);
        },
    },
    getters: {
        users: (state: State) => state.users,
        getUserById: (state: State) => (id: number) => {
            return state.users.find(user => user.id === id);
        },
    },
};

export default usersModule;
