import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Select from './index'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Input Component/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      control: { type: 'text' },
      defaultValue: 'value',
      description: 'value of input'
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Enter input',
      description: 'value of placeholder'
    },
    onChange: { description: 'handle onChangeInput' },
    color: {
      description: 'theme of input',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning'],
      defaultValue: 'primary'
    },
    fullWidth: { description: 'full width of Select', defaultValue: true, control: { type: 'boolean' } },
    options: {
      description: 'list options of select',
      defaultValue: [{ label: '1', value: '1' }]
    },
    variant: {
      description: 'variants of select',
      defaultValue: 'filled',
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'standard']
    },
    sx: {
      control: { type: 'object' },
      defaultValue: {
        'width': '200px'
      },
      description: 'style of select'
    }
  },

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() }
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PlaceholderSelect: Story = {
  args: {
    placeholder: 'select',
    value: 'placeholder select',
    options: [{ label: '1', value: '1' }]
  }
}
