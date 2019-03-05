class Tracking {
  attach() {
    let ga = document.createElement('script');
    ga.async = true;    
    ga.src = "https://www.googletagmanager.com/gtag/js?id=UA-89944251-4";
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);}
    window.gtag('js', new Date());
    window.gtag('config', 'UA-89944251-4');
  }
  update(path) {
    window.gtag('config', 'UA-89944251-4', {page_path: path});
  }
}

export default new Tracking();
