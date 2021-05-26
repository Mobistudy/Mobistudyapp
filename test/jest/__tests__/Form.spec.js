import { mount, createLocalVue } from '@vue/test-utils'
import FORM from './demo/FormDemo.vue'
import * as All from 'quasar'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Profile Editor', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components })

  const form = mount(FORM, {
    localVue,
    propsData: {
      value: {
        name: 'Dario'
      }
    }
  })

  it('sets the correct default data', () => {
    expect(form.props('value').name).toBe('Dario')

    let qinputs = form.findAllComponents(components.QInput)
    expect(qinputs.length).toBe(1)
    expect(qinputs.at(0).isVisible()).toBe(true)
    expect(qinputs.at(0).vm.value).toBe('Dario')
  })
})
