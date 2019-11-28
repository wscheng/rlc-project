<template>
  <div>
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="handlePageClick(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: page === pagination.current_page }"
          v-for="page in pagination.total_pages"
          :key="page"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePageClick(page)"
            >{{ page }}</a
          >
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="handlePageClick(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["pagination"],
  methods: {
    handlePageClick(page) {
      this.$emit("change-page", page);
    }
  }
};
</script>
