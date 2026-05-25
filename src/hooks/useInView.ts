import { useEffect, useRef, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
}

export function useInView<T extends HTMLElement = HTMLElement>(opts: Options = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true)
            obs.unobserve(el)
          }
        })
      },
      {
        threshold: opts.threshold ?? 0.15,
        rootMargin: opts.rootMargin ?? '0px 0px -50px 0px',
      },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [opts.threshold, opts.rootMargin])

  return [ref, seen]
}
