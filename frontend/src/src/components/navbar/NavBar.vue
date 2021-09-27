<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link to="/"><span class="navbar-brand">通販システム</span></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <span v-if="!$store.getters.isLogin">
                    <nav-bar-not-login />
                </span>
                <span v-else>
                    <span v-if="$store.getters.isUser">
                        <nav-bar-user />
                    </span>
                    <span v-else>
                        <nav-bar-admin />
                    </span>
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
import NavBarAdmin from './NavBarAdmin.vue';
import NavBarNotLogin from './NavBarNotLogIn';
import NavBarUser from './NavBarUser.vue';

export default {
    name: "NavBar",
    components: {
        NavBarNotLogin,
        NavBarAdmin,
        NavBarUser
    }
}
</script>

<style scoped>
</style>
