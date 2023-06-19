import type { Config } from 'tailwindcss'
import {blue, red} from 'tailwindcss/colors'
import tailwindForms from '@tailwindcss/forms'
import formKitTailwind from '@formkit/themes/tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: blue,
        error: red[600]
      }
    },
  },
  plugins: [
    tailwindForms,
    formKitTailwind
  ],
} satisfies Config

