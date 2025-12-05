import { render, type RenderOptions } from '@testing-library/react'
import { type ReactElement } from 'react'
import { ThemeProvider } from 'next-themes'

/**
 * Custom render function dengan providers
 *
 * Usage:
 * ```tsx
 * import { render } from '@/tests/setup/test-utils'
 *
 * test('my component', () => {
 *   const { getByText } = render(<MyComponent />)
 *   expect(getByText('Hello')).toBeInTheDocument()
 * })
 * ```
 *
 * With ThemeProvider (automatically included):
 * ```tsx
 * test('themed component', () => {
 *   render(<ThemedComponent />) // ThemeProvider automatically included
 * })
 * ```
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  // Wrapper component dengan common providers
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
        {children}
      </ThemeProvider>
    )
  }

  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  })
}

export * from '@testing-library/react'
export { customRender as render }
