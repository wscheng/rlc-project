<template>
  <div>
    <AlertMessage />
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/back/Sidebar";
import Navbar from "@/components/back/Navbar";
import AlertMessage from "@/components/back/AlertMessage";

export default {
  components: {
    Navbar,
    Sidebar,
    AlertMessage
  }
};
</script>
