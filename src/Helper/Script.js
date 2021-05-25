import { useEffect } from 'react'

const useScript = (url, async) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.setAttribute('type', 'text/javascript');
    script.async = (typeof async === 'undefined' ? true : async )

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}

export default function Script({ src, async=true}) {

  useScript(src, async)

  return null  // Return null is necessary for the moment.
}