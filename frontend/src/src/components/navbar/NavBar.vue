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
                    <ul class="navbar-nav d-flex">
                        <li class="nav-item nav-link">会員ログイン</li>
                        <li class="nav-item nav-link">新規登録</li>
                        <li class="nav-item"><router-link to="/login_admin"><span class="nav-link">管理者ログイン</span></router-link></li>
                    </ul>
                </span>
                <span v-else>
                    <div class="navbar-nav">
                        <span class="nav-item nav-link" @click="logout">ログアウト</span>
                    </div>
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
import { get } from '../../modules/APIConnection';

export default {
    name: "NavBar",
    methods: {
        logout: async function () {
            if (!confirm("ログアウトしますか？")) { return; }
            const api = this.$store.getters.isUser ? "/user/logout" : "/admin/logout";
            const res = await get(api);
            if (res.status != 200) {
                alert("ログアウトに失敗しました");
                return;
            }
            this.$store.commit("logout");
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
span .nav-link {
    cursor: pointer;
}
</style>
