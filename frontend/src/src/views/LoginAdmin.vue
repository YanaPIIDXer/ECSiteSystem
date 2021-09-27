<template>
    <div>
        <label>パスワード</label><input type="password" v-model="password" /><br />
        <button @click="login">ログイン</button>
    </div>
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
            // TODO:API化
            const res = await conn.post("http://localhost:3001/admin/login", params);
            console.log(res);
        }
    }
}
</script>

