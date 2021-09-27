<template>
    <ul class="navbar-nav d-flex">
        <li class="nav-item"><router-link to="/login"><span class="nav-link">会員ログイン</span></router-link></li>
        <li class="nav-item"><router-link to="/register"><span class="nav-link">新規登録</span></router-link></li>
        <li class="nav-item"><router-link to="/login_admin"><span class="nav-link">管理者ログイン</span></router-link></li>
    </ul>
</template>

<script>
export default {
    name: "NavBarNotLogin"
}
</script>
