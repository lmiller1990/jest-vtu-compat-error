const Vue = require('vue')
const { ref, onMounted, defineComponent, h, configureCompat } = Vue

configureCompat({ MODE: 2, })

const VueTestUtils = require("@vue/test-utils")
const { mount, flushPromises } = VueTestUtils
const { render } = require("@testing-library/vue")

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TestAsync = defineComponent({
  setup() {
    const mountText = ref();
    const asyncText = ref();

    onMounted(() => {
      mountText.value = "mounted";
    });

    sleep(0).then(() => {
      asyncText.value = "async";
    });

    return () => h('div', `${mountText.value} and ${asyncText.value}`)
  },
});

it("should show onMount text", async () => {
  const { findByText, queryByText } = render(TestAsync);
  await queryByText('mounted')
  expect(document.body.outerHTML).toContain('mounted')
});

