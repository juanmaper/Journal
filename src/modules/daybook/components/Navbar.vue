<template>
  <nav class="navbar bg-primary">
    <a class="navbar-brand text-white" @click="$router.push({ name: 'no-entry'})">
      <img src="@/assets/logo.png" 
           alt="Vue logo"
           height="24"
           class="d-inline-block align-text-top mx-2"
      >
      Daybook
    </a>

    <div class="d-flex">
      <button class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a{
  cursor: pointer;
}
</style>