import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { DRAFT, profile } from "@/data/portfolio";
import Reveal from "@/components/effects/Reveal";
import ScrollUI from "@/components/effects/ScrollUI";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyen Thi Men — .NET Developer Portfolio",
  description: ".NET developer building reliable back-end systems for multi-tenant SaaS.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Some browser extensions stamp attributes such as `bis_skin_checked` onto every element
 * before React hydrates, which triggers hydration-mismatch errors. This runs before hydration
 * and strips those attributes, then stops watching once the page has settled.
 */
const stripExtensionAttrs = `(function(){
  var A=['bis_skin_checked','bis_register','data-new-gr-c-s-check-loaded','data-gr-ext-installed','cz-shortcut-listen'];
  function clean(el){for(var i=0;i<A.length;i++){if(el.hasAttribute&&el.hasAttribute(A[i]))el.removeAttribute(A[i]);}}
  var o=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];
    if(m.type==='attributes'){m.target.removeAttribute(m.attributeName);}
    else{for(var j=0;j<m.addedNodes.length;j++){var n=m.addedNodes[j];if(n.nodeType===1){clean(n);var d=n.querySelectorAll?n.querySelectorAll('*'):[];for(var k=0;k<d.length;k++)clean(d[k]);}}}
  }});
  o.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:A});
  window.addEventListener('load',function(){setTimeout(function(){o.disconnect();},3000);});
})();
/* Enable scroll-reveal animations (hidden-until-visible) only with JS and when motion is OK. */
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-rv','');}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: extensions also touch <html>/<body>; this only ignores
    // attribute diffs on these two tags, not their children.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }} />
      </head>
      <body className={DRAFT ? "draft" : undefined} suppressHydrationWarning>
        <ScrollUI pdfFileName={`${profile.name.replace(/\s+/g, "-")}-Portfolio`} />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
