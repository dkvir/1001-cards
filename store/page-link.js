export const usePageLink = defineStore("page-link", {
  state: () => ({
    currentPage: "/",
    loading: false,
  }),
  actions: {
    changeCurrentPage(to) {
      this.currentPage = to;
    },
    changePageLoading(status) {
      this.loading = status;
    },
  },
});
