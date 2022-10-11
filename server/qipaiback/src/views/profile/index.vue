<template>
    <div class="app-container">
        <!-- <UserCard :user="user" /> -->
        欢迎进入管理后台
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserCard from './components/UserCard.vue';

export default {
    name: 'Profile',
    components: { UserCard },
    data() {
        return {
            user: {},
            activeTab: 'activity'
        };
    },
    computed: {
        // ...mapGetters([
        //   'name',
        //   'avatar',
        //   'roles'
        // ])
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.user = {
                name: '5555',
                role: 'asdasd',
                email: 'admin@test.com',
                avatar: 'this.avatar'
            };
        }
    }
}
</script>
<style scoped>
.app-container {
    height: 60vh;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>