class Adsense {
  attach() {
    let as = document.createElement('script');
    as.async = true;    
    as.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    document.head.appendChild(as);

    (window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-9556333271333976",
      enable_page_level_ads: true
    });
  }
}

export default new Adsense();
