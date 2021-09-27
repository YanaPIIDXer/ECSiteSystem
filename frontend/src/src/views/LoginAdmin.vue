<template>
    <form @submit="login">
        <label>パスワード</label><input type="password" v-model="password" /><br />
        <input type="submit" value="ログイン" />
    </form>
</template>

<script>
import conn from '../modules/BasicConnection';

export default {
    name: "LoginAdmin",
    data: function () {
        return {
            password: ""
        };
    },
    methods: {
        login: async function () {
            var params = new URLSearchParams();
            params.append("name", "admin");
            params.append("password", this.password);
            const res = conn.post("/admin/login", params);
            console.log(res);
        }
    }
}
</script>

