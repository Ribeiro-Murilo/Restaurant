export default{
    methods: {
        isDesktop() {
            const width = window.innerWidth;
            return width > 1145;
          },
          isSmallScreens() {
            const width = window.innerWidth;
            return width < 770;
          },
    },
}