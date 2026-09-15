import type { Metadata } from 'next'
import Script from 'next/script'
import TopProgressBar from '@/components/TopProgressBar'
import AnimatedBlobs from '@/components/AnimatedBlobs'
import FeedbackProvider from '@/components/FeedbackProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jay Rodriguez — ML Engineer | LLM systems for regulated domains',
  description: 'Jay Rodriguez — ML Engineer | LLM systems for regulated domains',
  keywords: ['Jay Rodriguez', 'Machine Learning', 'LLM', 'NLP', 'ML Engineer', 'Northeastern'],
  authors: [{ name: 'Jay Rodriguez' }],
  openGraph: {
    title: 'Jay Rodriguez — ML Engineer | LLM systems for regulated domains',
    description: 'Jay Rodriguez — ML Engineer | LLM systems for regulated domains',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TopProgressBar />
        <AnimatedBlobs />
        <FeedbackProvider>
          {children}
        </FeedbackProvider>
        <Script id="chatbase-widget" strategy="afterInteractive">
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="UADP32jQvjyVxyoDQFU4X";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
        </Script>
      </body>
    </html>
  )
}

